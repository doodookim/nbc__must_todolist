import styled from 'styled-components';

interface ProgressBarProps {
  completionBar: number | null;
}
const ProgressBar = ({ completionBar }: ProgressBarProps) => {
  return (
    <StProgressContainer>
      {completionBar !== null && completionBar > 0 && (
        <StProgressBar>
          <div
            style={{
              width: `${completionBar}%`,
              height: '20px',
              backgroundColor: '#dd94b3',
              borderRadius: '5px'
            }}
          />
        </StProgressBar>
      )}

      <StPercentage> {completionBar !== null && <span>진행률 : {completionBar}%</span>}</StPercentage>
    </StProgressContainer>
  );
};

export default ProgressBar;

const StProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StProgressBar = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  justify-content: space-between;
  margin-left: 30px;
`;
const StPercentage = styled.div`
  margin-top: 5px;
  margin-right: 42px;
`;
