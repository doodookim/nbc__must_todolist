import { addDays, endOfDay } from 'date-fns';
import {
  CollectionReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { db } from '../firebase';
// 새로운 컨텐츠 형식 정의하는 인터페이스
interface NewContent {
  contents: string;
  createdAt: any;
  isCompleted: boolean;
}

function DataPush() {
  const [hour, setHour] = useState(23 - new Date().getHours()); // 남은 시간 단위
  const [minute, setMinute] = useState(59 - new Date().getMinutes()); // 남은 분 단위
  const [second, setSecond] = useState(59 - new Date().getSeconds()); // 남은 초 단위
  const [contents, setContents] = useState(''); // 내용 입력 상태
  const [isCompleted, setIsCompleted] = useState(false); // 완료 상태
  const [data, setData] = useState<any[]>([]); // firebase 데이터 상태
  const [editItemId, setEditItemId] = useState<string | null>(null); // 현재 편집 중인 항목 상태
  const [editContents, setEditContents] = useState(''); // 내용 수정 상태
  const queryClient = useQueryClient(); // 쿼리 클라이언트 인스턴스

  // 남은 시간 초 단위로 렌더링 되도록 하는 useEffect
  useEffect(() => {
    const id = setInterval(() => {
      setHour(23 - new Date().getHours());
      setMinute(59 - new Date().getMinutes());
      setSecond(59 - new Date().getSeconds());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // 진행률 나타내는 함수
  const completionBar = () => {
    const totalCompletedCount = data.filter((item) => item.isCompleted).length;
    const totalItemCount = data.length;
    return totalItemCount ? (totalCompletedCount / totalItemCount) * 100 : null;
  };
  // 진행률에 따라 색깔 구분
  // const getBackgroundColor = (progress: string | null) => {
  //   if (progress === null) {
  //     return '#ccc'; // 기본 배경색
  //   }
  //   const numericProgress = parseFloat(progress);
  //   if (isNaN(numericProgress)) {
  //     return '#ccc';
  //   } else if (numericProgress < 40) {
  //     return 'red'; // 40 미만일 때 빨간색
  //   } else if (numericProgress < 70) {
  //     return 'yellow'; // 40 초과 70 미만일 때 노란색
  //   } else {
  //     return '#4CAF50'; // 71 이상일 때 초록색
  //   }
  // };
  // 등록 하기
  const addNewContent = async (newContent: NewContent) => {
    try {
      // firestore에서 'contents' 컬렉션 참조
      const contentsRef: CollectionReference = collection(db, 'contents');

      // firestore에 새로운 데이터 추가
      const docRef = await addDoc(contentsRef, newContent);
      // console.log(docRef);
      return docRef;
    } catch (error: any) {
      // 에러를 any 또는 적절한 타입으로 처리
      throw new Error('Firebase에 데이터 추가 중 에러 발생: ' + error.message);
    }
  };
  // mutation 변수명은 임의로 지정 가능함.
  const mutation = useMutation(addNewContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
    onError: (error: Error) => {
      console.error('데이터 전송 에러:', error.message);
    }
  });
  // console.log(mutation.data);
  const onChangeContentsHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const createdAt = serverTimestamp();
      await mutation.mutateAsync({ contents, createdAt, isCompleted });
      setContents('');
    } catch (error) {
      console.error('데이터 전송 에러:', error);
    }
  };

  const {
    isLoading,
    isError,
    data: fetchedData
  } = useQuery('contents', async () => {
    const contentsRef = collection(db, 'contents');
    const queryContents = query(contentsRef, orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(queryContents);
    const newData: any[] = [];
    querySnapshot.forEach((doc: any) => {
      newData.push({ id: doc.id, ...doc.data() });
    });
    return newData;
  });

  // 수정 하기
  const editItemHandler = async (id: string) => {
    setEditItemId(id); // 현재 편집 중이 항목 ID 설정
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditContents(itemToEdit.contents); // 수정 하고 싶은 항목을 수정 상태로 변경
    }
  };

  const updateItemHandler = async (event: React.FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    try {
      const docRef = doc(db, 'contents', id);
      const dataToUpdate = {
        contents: editContents
      };
      await updateDoc(docRef, dataToUpdate);
      setEditItemId(null);
      setEditContents('');
      queryClient.invalidateQueries('contents');
    } catch (error) {
      console.error('문서 업데이트 중 오류가 발생했습니다.', error);
    }
  };

  // 삭제하기
  const deleteItem = async (id: string) => {
    try {
      const docRef = doc(db, 'contents', id);
      await deleteDoc(docRef);
      queryClient.invalidateQueries('contents');
    } catch (error) {
      console.error('문서 삭제 중 오류가 발생했습니다', error);
    }
  };
  // 할 일 완료하기
  const toggleCompletionHandler = async (id: string) => {
    try {
      const docRef = doc(db, 'contents', id);
      const itemToToggle = data.find((item) => item.id === id);

      if (itemToToggle) {
        const updatedIsCompleted = !itemToToggle.isCompleted;
        const dataToUpdate = {
          isCompleted: updatedIsCompleted
        };
        await updateDoc(docRef, dataToUpdate);
        // queryClient.invalidateQueries('contents');
        const contentsRef = collection(db, 'contents');
        const queryContents = query(contentsRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(queryContents);
        const newData: any[] = [];
        querySnapshot.forEach((doc: any) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
      }
    } catch (error) {
      console.error('할 일 완료 처리 중 오류가 발생했습니다.', error);
    }
  };

  // 데드라인 계산 함수
  const calculateDeadline = (createdAt: any) => {
    const validHours = 24; // 유효 시간
    const deadline = addDays(endOfDay(createdAt.toDate()), 1); // 다음 날 자정
    const remainingTime = deadline.getTime() - Date.now();
    const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));

    // if (remainingHours <= validHours) {
    //   return `${remainingHours}시간 남음`;
    // } else {
    //   return '유효 기간 종료';
    // }
  };

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  const renderDate = (timestamp: any) => {
    const date = new Date(timestamp?.toDate()); // Firestore Timestamp를 JavaScript Date로 변환합니다.
    return date.toLocaleString(); // 원하는 형식으로 시간을 표시할 수 있습니다.
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmitHandler}>
          <textarea onChange={onChangeContentsHandler} value={contents} placeholder="할 일을 작성해 주세요." />
          여기에 내용을 넣고 버튼을 클릭시 firebase 데이터 전송
          <div>
            <button type="submit">작성 완료</button>
          </div>
        </form>
        <div>
          <label>여기에 데이터 가져오기</label>
          <br />

          <div>
            오늘 하루 남은 시간 : {hour < 10 ? '0' + hour : hour}: {minute < 10 ? '0' + minute : minute}:{' '}
            {second < 10 ? '0' + second : second}
            {data.map((item, index) => (
              <div key={item.id}>
                {editItemId === item.id ? (
                  <form
                    onSubmit={(event) => {
                      updateItemHandler(event, item.id);
                    }}
                  >
                    <textarea value={editContents} onChange={(event) => setEditContents(event.target.value)} />
                    <button type="submit">수정완료</button>
                  </form>
                ) : (
                  <>
                    {item.contents}
                    <button
                      onClick={() => {
                        editItemHandler(item.id);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        toggleCompletionHandler(item.id);
                      }}
                    >
                      {item.isCompleted ? '완료 취소' : '완료'}
                    </button>
                    <button
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    >
                      삭제
                    </button>

                    <p>작성 시간: {renderDate(item.createdAt)}</p>
                    {/* <p>남은 시간: {calculateDeadline(item.createdAt)}</p> */}
                  </>
                )}
              </div>
            ))}
            {data.length > 0 && (
              <div>
                <div
                  style={{
                    width: '200px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                  }}
                >
                  <div
                    style={{
                      width: `${completionBar()}%`,
                      height: '20px',
                      backgroundColor: '#4CAF50',
                      borderRadius: '5px'
                    }}
                  />
                </div>

                <span>진행률 : {completionBar()}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DataPush;
