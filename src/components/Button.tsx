import styled from 'styled-components';

interface ButtonType {
  text: string;
  onClick: () => void;
}

function Button({ text, onClick }: ButtonType) {
  return <StButton onClick={onClick}>{text}</StButton>;
}

export default Button;

const StButton = styled.button`
  background-color: #dd94b3;
  color: white;
  font-size: 21px;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
