import app from 'firebase/app';
import 'firebase/auth';

class Api {

  getConfig() {
    return {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    }
  }

  init() {

    // initialize the app
    app.initializeApp(this.getConfig());

    // initialize auth
    this.auth = app.auth();
    this.authPersistence = app.auth.Auth.Persistence.LOCAL;

    // set api on window for easy debug
    if (process.env.NODE_ENV !== 'production') {
      window.api = this;
    }
  }
}

export default new Api();
