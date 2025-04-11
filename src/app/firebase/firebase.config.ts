// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBfSNYrEkanPcNGUAYEjEiE7Tvm0Fy6tvg',
  authDomain: 'video-chat-app-983f7.firebaseapp.com',
  projectId: 'video-chat-app-983f7',
  storageBucket: 'video-chat-app-983f7.appspot.com',
  messagingSenderId: '648542197673',
  appId: '1:648542197673:web:63a72bc7e10c87dbbe96b8',
  measurementId: 'G-LV09617C0G',
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const firestore = getFirestore(app);
export const auth = getAuth(app);
