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
        <br />
        내가 해야 되는 것 <br />
        1. Firebase 데이터 관리 <br />
        2. 데이터 넣기, 가져오기, 수정하기, 삭제하기 이거 하다가 건우님, 가을님한테 넘겨주고 <br />
        3. 공유하기 버튼 누르면 카카오톡 공유하기 설정 같이 하기 <br />
        4. 전부 끝나면 웹 푸시 해보기
      </div>
    </>
  );
}

export default DataPush;
