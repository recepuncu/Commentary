import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { E_MAIL, PASSWORD } from '../config/config.js';

/**
 * Service for handling authentication.
 */
export const AuthService = (() => {
    let auth;

    /**
     * Initialize the service.
     * @param {any} app
     */
    const initialize = (app) => {
        auth = getAuth(app);
    };

    /**
     * Randomly generate a user ID.
     * @returns
     */
    const getOrCreateUserId = () => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = `user${Math.floor(Math.random() * 100000)}`;
            localStorage.setItem('userId', userId);
        }
        return userId;
    };

    /**
     * Authenticate the user.
     * @returns
     */
    const authenticate = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, E_MAIL, PASSWORD);
            return userCredential;
        } catch (error) {
            console.error('Authentication error:', error.message);
            throw new Error('Failed to authenticate');
        }
    };

    /**
     * Check if the user is authenticated.
     * @returns
     */
    const isAuthenticated = () => !!auth.currentUser;

    return {
        initialize,
        authenticate,
        isAuthenticated,
        getOrCreateUserId
    };

})();