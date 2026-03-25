import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const defaultFirebaseConfig = {
	apiKey: 'AIzaSyB2D2SB2QV0bKVfQLkc6ANn-LEixZE2u9c',
	authDomain: 'task-flow-6c09a.firebaseapp.com',
	projectId: 'task-flow-6c09a',
	storageBucket: 'task-flow-6c09a.firebasestorage.app',
	messagingSenderId: '404891187335',
	appId: '1:404891187335:web:c52b97c92817ee17b46022',
	measurementId: 'G-M6H8Q298QB',
}

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
	authDomain:
		import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
	projectId:
		import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
	storageBucket:
		import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
		defaultFirebaseConfig.storageBucket,
	messagingSenderId:
		import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
		defaultFirebaseConfig.messagingSenderId,
	appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
	measurementId:
		import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
		defaultFirebaseConfig.measurementId,
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)

export { analytics, app, auth, db }
