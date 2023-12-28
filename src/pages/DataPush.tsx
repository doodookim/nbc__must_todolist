import { CollectionReference, addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { db } from '../firebase';

interface NewContent {
  contents: string;
}

function DataPush() {
  const [contents, setContents] = useState('');
  const [data, setData] = useState<any[]>([]);
  const queryClient = useQueryClient();

  const addNewContent = async (newContent: NewContent) => {
    try {
      // Firestore에서 'contents' 컬렉션 참조
      const contentsRef: CollectionReference = collection(db, 'contents');

      // Firestore에 새로운 데이터 추가
      const docRef = await addDoc(contentsRef, newContent);
      console.log(docRef);
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
            <button type="submit">데이터 전송하기</button>
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
                  <button>수정하기</button>
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
