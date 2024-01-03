import { webPushAlarm } from '../components/Alarm';
// Item
// 등록된 개별 리스트의 상태 관리 컴포넌트

// DataPush에서 받은 props 타입 지정
interface ItemProps {
  item: {
    id: string;
    contents: string;
    isCompleted: boolean;
    createdAt: any;
  };
  editItemId: string | null;
  onEditItem: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (event: React.FormEvent<HTMLFormElement>, id: string) => void;
  renderDate: (timestamp: any) => string;
  editContents: string;
  onEditContentsChange: (value: string) => void;
}

const ItemComponent = ({
  item,
  editItemId,
  onEditItem,
  onToggleCompletion,
  onDeleteItem,
  onUpdateItem,
  renderDate,
  editContents,
  onEditContentsChange
}: ItemProps) => (
  <div key={item.id}>
    {editItemId === item.id ? (
      <form
        onSubmit={(event) => {
          onUpdateItem(event, item.id);
        }}
      >
        <textarea value={editContents} onChange={(event) => onEditContentsChange(event.target.value)} />
        <button type="submit">수정완료</button>
      </form>
    ) : (
      <>
        {item.contents}
        <button
          onClick={() => {
            onEditItem(item.id);
            webPushAlarm(item.id, 'UPDATE', item.contents);
          }}
        >
          수정
        </button>
        <button
          onClick={() => {
            onToggleCompletion(item.id);
            webPushAlarm(item.id, 'COMPLETE', item.contents);
          }}
        >
          {item.isCompleted ? '완료 취소' : '완료'}
        </button>
        <button
          onClick={() => {
            onDeleteItem(item.id);
            webPushAlarm(item.id, 'DELETE', item.contents);
          }}
        >
          삭제
        </button>

        <p>작성 시간: {renderDate(item.createdAt)}</p>
      </>
    )}
  </div>
);

export default ItemComponent;
