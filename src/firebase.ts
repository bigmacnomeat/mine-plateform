import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Never expose API keys directly in code
const firebaseConfig = {
  databaseURL: 'https://mine-time-game-default-rtdb.firebaseio.com/',
  // Add other config from your Firebase console
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
