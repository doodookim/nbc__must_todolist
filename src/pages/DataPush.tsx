import { CollectionReference, addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { db } from '../firebase';

// 새로운 컨텐츠 형식 정의하는 인터페이스
interface NewContent {
  contents: string;
}

function DataPush() {
  const [contents, setContents] = useState(''); // 내용 입력 상태
  const [data, setData] = useState<any[]>([]); // firebase 데이터 상태
  const queryClient = useQueryClient(); // 쿼리 클라이언트 인스턴스

  // firebase에 데이터 추가하는 뮤테이션
  const addNewContent = async (newContent: NewContent) => {
    try {
      // fire store에서 'contents' 컬렉션 참조
      const contentsRef: CollectionReference = collection(db, 'contents');

      // fire store에 새로운 데이터 추가
      const docRef = await addDoc(contentsRef, newContent);
      console.log(docRef);
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
  console.log(mutation.data);
  const onChangeContentsHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ contents });
    setContents('');
  };

  const {
    isLoading,
    isError,
    data: fetchedData
  } = useQuery('contents', async () => {
    const contetnsRef = collection(db, 'contents');
    const querySnapshot = await getDocs(contetnsRef);
    const newData: any[] = [];
    querySnapshot.forEach((doc) => {
      newData.push({ id: doc.id, ...doc.data() });
      console.log(data);
    });
    return newData;
  });

  // 수정 하기
  // const updateCompleteHandler = async (id: string) => {
  //   try {
  //     const docRef = doc(db, 'contents', id);
  //     const dataToupdate = {
  //       contents: contents
  //     };
  //     await updateDoc(docRef, dataToupdate);
  //   } catch (error) {
  //     console.error('문서 업데이트 중 오류가 발생했습니다.', error);
  //   }
  // };

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
            {data.map((item) => (
              <>
                <div key={item.id}>
                  {item.contents}
                  <button>수정</button>
                  <button
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button>공유 하기</button>
      </div>
    </>
  );
}

export default DataPush;
