import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: '',
  authDomain: 'se-survey.firebaseapp.com',
  databaseURL: 'https://se-survey.firebaseio.com',
  projectId: 'se-survey',
  storageBucket: 'se-survey.appspot.com',
  messagingSenderId: '',
  appId: '',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
  database() {
    return app.database();
  }
}

export default Firebase;
