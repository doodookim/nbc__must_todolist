// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const analytics = getAnalytics(app);
const firebaseConfig: Record<string, string> = {
  apiKey: process.env.REACT_APP_FB_API_KEY || '',
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_APP_ID || ''
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// React에서 정상적으로 동작하는 지 확인하기 위해서 임시로 export 시켜줍니다. app이 정상적으로 출력되는 것을 확인하고 나면, 지워줍니다.
export default app;

export const auth = getAuth(app);
