import {
  CollectionReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { useState } from 'react';
import { MdAdd, MdDelete, MdDone } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import closebutton from '../assets/closebutton.png';
import edit from '../assets/edit.png';
import ok from '../assets/ok.png';
import { db } from '../firebase';
import { Modal } from '../types/global';
import ProgressBar from './ProgressBar';

interface Props {
  filteredData: string[];
}

interface NewContent {
  contents: string;
  createdAt: any;
  isCompleted: boolean;
}
function RegisterModal({ onClose }: Modal, { filteredData }: Props) {
  const queryClient = useQueryClient();
  const newDate = new Date();
  const today = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = weekdays[newDate.getDay()];
  const [open, setOpen] = useState(false);
  const [contents, setContents] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [done, setDone] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null); // 현재 편집 중인 항목 상태
  const [editContents, setEditContents] = useState(''); // 내용 수정 상태
  const onToggleCreate = () => setOpen(!open);
  const { data: fetchedData } = useQuery(['contents', { date: today }], async () => {
    const contentsRef = collection(db, 'contents');
    const midnight = new Date(today);
    const queryContents = query(contentsRef, where('createdAt', '>=', midnight), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(queryContents);
    const newData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      contents: doc.data().contents,
      isCompleted: doc.data().isCompleted,
      createdAt: doc.data().createdAt.toDate()
    }));
    return newData;
  });
  const onToggleFinish = async (id: string) => {
    try {
      const docRef = doc(db, 'contents', id);
      const documentSnapshot = await getDoc(docRef);
      if (documentSnapshot.exists()) {
        const { isCompleted } = documentSnapshot.data();
        await updateDoc(docRef, { isCompleted: !isCompleted });
        queryClient.invalidateQueries('contents');
      }
    } catch (error) {
      console.error('완료 상태 변경 중 오류가 발생했습니다', error);
    }
  };
  const mutation = useMutation(
    async (newContent: NewContent) => {
      const contentsRef: CollectionReference = collection(db, 'contents');
      const createdAt = serverTimestamp();
      const docRef = await addDoc(contentsRef, { ...newContent, createdAt });
      return docRef;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contents');
      },
      onError: (error: Error) => {
        console.error('데이터 전송 에러:', error.message);
      }
    }
  );
  const onChangeContentsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const createdAt = serverTimestamp();
      await mutation.mutateAsync({ contents, createdAt, isCompleted });
      setContents('');
      // setOpen(false); // 모달 닫기 - 이 부분을 주석 처리하여 모달이 열린 상태를 유지합니다.
    } catch (error) {
      console.error('데이터 전송 에러:', error);
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
  // 수정 하기
  const editItemHandler = async (id: string) => {
    setEditItemId(id); // 현재 편집 중이 항목 ID 설정
    if (fetchedData) {
      const itemToEdit = fetchedData.find((item: any) => item.id === id);
      if (itemToEdit) {
        setEditContents(itemToEdit.contents); // 수정 하고 싶은 항목을 수정 상태로 변경
      }
    }
  };
  const updateItemHandler = async (event: React.FormEvent<HTMLImageElement>, id: string) => {
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
  // 진행률 나타내는 함수
  const completionBar = () => {
    const totalCompletedCount = fetchedData?.filter((item) => item.isCompleted).length ?? 0;
    const totalItemCount = fetchedData?.length ?? 0;
    const completionPercentage = totalItemCount ? (totalCompletedCount / totalItemCount) * 100 : null;
    return completionPercentage !== null ? +completionPercentage.toFixed(2) : null;
  };
  const remainingTasksCount = fetchedData?.filter((task) => !task.isCompleted).length || 0;
  return (
    <StAddListModal>
      <StAddModal>
        <StModalHead>
          <div className="top-list">
            <span>오늘의 할 일</span>
            <img className="close" src={closebutton} alt="closebutton" onClick={onClose} />
          </div>
          <div className="middle-list">
            <h1>
              {new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              }).format(new Date(today))}
            </h1>
            <div className="day">{dayOfWeek}요일</div>
            <div className="remain-task">
              {remainingTasksCount ? `남은 할 일 : ${remainingTasksCount}개` : '오늘의 할 일이 완료되었습니다!'}
            </div>
          </div>
        </StModalHead>
        {fetchedData?.map((item) => (
          <div key={item.id}>
            <StModalContent>
              <StTodoItem>
                <StFinishTodo onClick={() => onToggleFinish(item.id)} done={item.isCompleted}>
                  <MdDone />
                </StFinishTodo>
                {editItemId === item.id ? (
                  <StEditForm>
                    <textarea value={editContents} onChange={(event) => setEditContents(event.target.value)} />
                    <img
                      className="ok"
                      src={ok}
                      alt="ok"
                      onClick={(event) => {
                        event.preventDefault();
                        updateItemHandler(event, item.id);
                      }}
                    />
                  </StEditForm>
                ) : (
                  <>
                    <StTodoText>{item.contents}</StTodoText>
                    <img
                      className="edit"
                      src={edit}
                      alt="edit"
                      onClick={() => {
                        editItemHandler(item.id);
                      }}
                    />
                  </>
                )}
                <StRemoveTodo done={done}>
                  <MdDelete onClick={() => deleteItem(item.id)} />
                </StRemoveTodo>
              </StTodoItem>
            </StModalContent>
          </div>
        ))}
        {completionBar() !== null && <ProgressBar completionBar={completionBar()} />}
        {open && (
          <StForm onSubmit={onSubmitHandler}>
            <StInput
              autoFocus
              placeholder="할 일 입력 후 Enter 버튼을 누르세요."
              value={contents}
              onChange={onChangeContentsHandler}
            />
          </StForm>
        )}
        <StCreateButton onClick={onToggleCreate} open={open}>
          <MdAdd />
        </StCreateButton>
      </StAddModal>
    </StAddListModal>
  );
}
{
}
export default RegisterModal;

const StAddListModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.521);
  z-index: 10000;

  .space-between {
    display: flex;
    justify-content: space-between;
  }
  .close {
    width: 30px;
    cursor: pointer;
  }

  .plus {
    display: flex;
    /* height: 220px; */
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }
  img {
    width: 60px;
  }

  textarea {
    width: calc(100% - 20px);
    height: 150px;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    resize: none;
    font-size: 1em;
  }

  .underline-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .underline {
    width: 20%;
    height: 1px;
    background-color: #ccc;
  }
`;

const StAddModal = styled.div`
  width: 650px;
  height: 700px;
  max-height: 1000px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  overflow-y: scroll;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const StModalHead = styled.div`
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid #adb0b2;
  .top-list {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  span {
    font-size: 1.4rem;
    color: #040404;
  }
  .middle-list {
    margin-top: 40px;
    text-align: center;
  }
  h1 {
    margin: 0;
    font-size: 30px;
    color: #262d34;
  }
  .day {
    margin-top: 20px;
    margin-left: 15px;
    color: #868e96;
    font-size: 21px;
  }
  .remain-task {
    color: #dd94b3;
    font-size: 18px;
    margin-top: 40px;
    margin-left: 15px;
    font-weight: bold;
  }
`;
const StModalContent = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const StRemoveTodo = styled.div<{ done: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  :hover {
    color: #ff6b6b;
  }
  display: none;
`;
const StTodoItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${StRemoveTodo} {
      display: initial;
    }
  }

  textarea {
    outline: none;
    height: 30px;
    font-size: 21px;
    font-family: inherit;
    color: #495057;
  }
  img {
    width: 40px;
    cursor: pointer;
  }
`;

const StFinishTodo = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  ${(props) =>
    props.done &&
    `
      border: 2px solid #DD94B3;
      color: #DD94B3;
    `}
`;
const StEditForm = styled.form`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  textarea {
    width: calc(100% - 20px);
    height: 30px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    resize: none;
    right: 20px;
    bottom: 10px;
    font-size: 21px;
    font-family: inherit;
    color: #495057;
  }
`;
const StTodoText = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
`;
const StCreateButton = styled.button<{ open: boolean }>`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 100px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    `
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const StFormContainer = styled.div`
  width: 100%;
  display: flex;
  /* position: absolute; */
`;

const StForm = styled.form`
  background: #fae7ef;
  width: 100%;
  margin: 80px auto;
  padding: 16px;
  border-radius: 16px;
  border-top: 1px solid #e9ecef;
`;
const StInput = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #2a2929;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;
