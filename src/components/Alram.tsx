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
      alert('토큰: ' + currentToken);
      // 토큰을 서버에 전달...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

const Alram = () => {
  return <div>{temp}</div>;
};

export default Alram;
