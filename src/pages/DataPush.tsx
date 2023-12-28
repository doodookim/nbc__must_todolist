import { CollectionReference, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
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
  const [editItemId, setEditItemId] = useState<string | null>(null); // 현재 편집 중인 항목 상태
  const [editContents, setEditContents] = useState(''); // 내용 수정 상태
  const queryClient = useQueryClient(); // 쿼리 클라이언트 인스턴스

  // 등록 하기
  const addNewContent = async (newContent: NewContent) => {
    try {
      // fire store에서 'contents' 컬렉션 참조
      const contentsRef: CollectionReference = collection(db, 'contents');

      // fire store에 새로운 데이터 추가
      const docRef = await addDoc(contentsRef, newContent);
      return docRef;
    } catch (error: any) {
      // 에러를 any 또는 적절한 타입으로 처리
      throw new Error('Firebase에 데이터 추가 중 에러 발생: ' + error.message);
    }
  };

  const mutation = useMutation(addNewContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
    onError: (error: Error) => {
      console.error('데이터 전송 에러:', error.message);
    }
  });

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
                        deleteItem(item.id);
                      }}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button>공유 하기</button>
        <br />
        내가 해야 되는 것 <br />
        1. Firebase 데이터 관리 <br />
        2. 수정하기, 삭제하기
        <br />
      </div>
    </>
  );
}

export default DataPush;
