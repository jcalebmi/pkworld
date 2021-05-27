import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from '@react-firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import config from '../../firebaseConfig.js';
firebase.initializeApp(config);
const auth = firebase.auth();

const Auth = () => {
  const [user] = useAuthState(auth);
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div id='auth'>
        {user === null ?
          <div>
            <button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
              }}
            >
              Sign in with Google
            </button><br/>
            <button
            onClick={() => {
              const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
              firebase.auth().signInWithPopup(facebookAuthProvider);
              }}
            >
              Sign in with Facebook
            </button>
          </div>
          :
          <button
            onClick={() => {
             firebase.auth().signOut();
           }}
           >
           Sign Out
           </button>}
        {/* <button
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously();
          }}
        >
          Sign In Anonymously
        </button> */}
        <FirebaseAuthConsumer>
          {/* {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }} */}
        </FirebaseAuthConsumer>
        <div>
          <IfFirebaseAuthed>
            {/* {() => {
              return <div>You are authenticated</div>;
            }} */}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {/* {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }} */}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
  );
};
export default Auth;