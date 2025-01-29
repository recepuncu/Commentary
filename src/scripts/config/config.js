const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_DATABASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const E_MAIL = import.meta.env.VITE_E_MAIL;
export const PASSWORD = import.meta.env.VITE_PASSWORD;

/**
 * E-mail for the Firebase account.
 */
if (!E_MAIL) {
    throw new Error("E_MAIL environment variable is missing.");
}

/**
 * Password for the Firebase account.
 */
if (!PASSWORD) {
    throw new Error("PASSWORD environment variable is missing.");
}

/**
 * Firebase configuration object.
 */
export const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: 'fir-demo-9200f',
};

if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) {
    throw new Error("Firebase configuration variables are missing.");
}
