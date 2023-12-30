import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Kakao = window.Kakao;
const Share = () => {
  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('e58f0398cda8e3595e39dfe5889efad2');
  }, []);

  const SHARE_URL: string = 'http://localhost:3000/share';
  const handleShareKakaoButton = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `제목`,
        description: `내용`,
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1681487870238-4a2dfddc6bcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8JUVEJTk1JUEwJUVDJTlEJUJDfGVufDB8fDB8fHww',
        link: {
          webUrl: SHARE_URL
        }
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            webUrl: SHARE_URL
          }
        }
      ]
    });
  };

  return (
    <button
      onClick={() => {
        handleShareKakaoButton();
      }}
    >
      Share
    </button>
  );
};

export default Share;
