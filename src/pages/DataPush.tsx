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
import Item from '../components/Item';
// import AddList from '../components/AddList';
import ProgressBar from '../components/ProgressBar';
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
    const completionPercentage = totalItemCount ? (totalCompletedCount / totalItemCount) * 100 : null;
    return completionPercentage !== null ? +completionPercentage.toFixed(2) : null;
  };

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
  // 데이터 가져오기
  const {
    isLoading,
    isError,
    data: fetchedData
  } = useQuery('contents', async () => {
    const contentsRef = collection(db, 'contents');
    const queryContents = query(contentsRef, orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(queryContents);
    const newData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      contents: doc.data().contents,
      isCompleted: doc.data().isCompleted,
      createdAt: doc.data().createdAt
    }));
    // ((doc: any) => {
    //   newData.push({ id: doc.id, ...doc.data() });
    // });
    return newData || [];
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
            {fetchedData?.map((item, index) => (
              <div key={item.id}>
                <Item
                  item={item}
                  editItemId={editItemId}
                  onEditItem={editItemHandler}
                  onToggleCompletion={toggleCompletionHandler}
                  onDeleteItem={deleteItem}
                  onUpdateItem={updateItemHandler}
                  renderDate={renderDate}
                  editContents={editContents}
                  onEditContentsChange={setEditContents}
                />
              </div>
            ))}
            {completionBar() !== null && <ProgressBar completionBar={completionBar()} />}
          </div>
        </div>
      </div>
    </>
  );
}
export default DataPush;
