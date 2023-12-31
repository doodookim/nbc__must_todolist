// LoadingModal.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store'; // 경로에 주의하세요
import './LoadingModal.css';

const LoadingModal: React.FC = () => {
  // Redux 스토어의 로딩 상태를 가져옵니다.
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  // 로딩 상태가 false이면, 아무것도 렌더링하지 않습니다.
  if (!isLoading) return null;

  // 로딩 상태가 true이면, 로딩 모달을 렌더링합니다.
  return (
    <div className="loading-modal">
      <div className="spinner">로딩 중...</div>
    </div>
  );
};

export default LoadingModal;
