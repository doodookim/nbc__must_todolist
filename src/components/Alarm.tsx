import * as getMessage from 'firebase/messaging';
import app from '../firebase';

console.log('asdf', app);
const message = getMessage.getMessaging();
let temp = '';

getMessage
  .getToken(message, {
    vapidKey: process.env.REACT_APP_VAPID_KEY
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      temp = currentToken;
      localStorage.setItem('message', currentToken);
      // 토큰을 서버에 전달...
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });

// id = pk값, work = 작성(INSERT),수정(UPDATE),삭제(DELETE),완료(COMPLETE), content = contents(게시글 내용), status(선택사항) = isCompleted
export const webPushAlarm = async (id: string, work: string, content: string, status = true) => {
  /**
   * 아직 contents 에 작성한 사람의 고유ID 값이 없어서 로컬에서만 알람이 뜨게 설정.
   * 추후 contents 테이블에 컬럼값이 추가되면 재 작업할 예정
   */
  let sendUrl = 'https://fcm.googleapis.com/fcm/send'; // 웹 푸시 URL 주소
  let currToken = localStorage.getItem('message'); // 로컬스토리지 저장값
  let title = '알림!'; // 임시 제목

  // 작성
  if (work === 'INSERT') title = '할 일이 작성되었습니다';
  // 수정
  else if (work === 'UPDATE') title = '할 일이 수정되었습니다';
  // 삭제
  else if (work === 'DELETE') title = '할 일이 삭제되었습니다';
  // 완료
  else if (work === 'COMPLETE') {
    if (status) title = '할 일이 완료 취소 되었습니다';
    else title = '할 일이 완료되었습니다';
  }

  // 메세지 BODY 본체
  const message = {
    to: currToken, // 웹 푸시 토큰
    notification: {
      title: title,
      body: content
    }
  };

  const header = {
    'Content-Type': 'application/json',
    Authorization:
      'key=AAAAL8xiJkk:APA91bE21kKVOLcQdnkEktuMekZK6XfrN_dOT9Vg_wuFk2d2VsFi6Sbb4PqmfuQ4YAit2CG5yVhiWii_FPhPF94QHL9FkgYi4UTNeptn4_-YBL_dpfPgxD2EtaCCl9Sy6tF6ux3rW4aW'
  };

  // POST 전송
  fetch(sendUrl, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(message)
  }).then((res) => {
    if (res.ok) {
      console.log('알림이 전송되었습니다.');
    }
  });
};

const Alarm = () => {
  return <div>{temp}</div>;
};

export default Alarm;
