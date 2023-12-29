import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 로그인 체크
    navigate('/login');
  }, []);
  return <div>Main</div>;
};

export default Main;
