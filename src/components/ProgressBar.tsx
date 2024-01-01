interface ProgressBarProps {
  completionBar: number | null;
}
const ProgressBar = ({ completionBar }: ProgressBarProps) => {
  return (
    <div>
      {completionBar !== null && completionBar > 0 && (
        <div style={{ width: '200px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div
            style={{ width: `${completionBar}%`, height: '20px', backgroundColor: '#4CAF50', borderRadius: '5px' }}
          />
        </div>
      )}

      {completionBar !== null && <span>진행률 : {completionBar}%</span>}
    </div>
  );
};

export default ProgressBar;
