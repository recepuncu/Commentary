import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/config.js';
import { AuthService } from './auth/auth.js';
import { CommentsService } from './services/commentsService.js';
import DialogManager from './components/dialog.js';

/**
 * Comment Manager
 */
const CommentManager = (() => {
    const app = initializeApp(firebaseConfig);

    /**
     * Initialize the application
     */
    const init = () => {
        // Initialize services
        AuthService.initialize(app);
        CommentsService.initialize(app, AuthService);

        const placeholders = [
            'Contribute to the conversation...',
            'Add your voice to the discussion...',
            'Make your opinion count...',
            'Join the dialogue with your insights...',
            'Start a meaningful discussion...'
        ];

        // Set a random placeholder
        const randomIndex = Math.floor(Math.random() * placeholders.length);
        const commentBox = document.getElementById('commentBox');
        commentBox.placeholder = placeholders[randomIndex];

        // Event Listener
        const submitButton = document.getElementById('submitComment');
        if (submitButton) {
            submitButton.addEventListener('click', async () => {
                console.log('Submitting comment...');
                const dialog = new DialogManager();
                try {
                    setLoading(true);

                    await CommentsService.submitComment(commentBox.value);
                    commentBox.value = ''; // Clear input

                    setLoading(false);

                    dialog.setTitle('Thank you for commenting!');
                    dialog.setContent('Comment submitted successfully!');
                    dialog.show(3000);
                } catch (error) {
                    console.error('Failed to submit comment:', error.message);
                    dialog.setTitle('Failed to submit the comment. Please try again.');
                    dialog.setContent(error.message || 'Failed to submit the comment. Please try again.');
                    dialog.show(5000);
                }
            });

            // Initial load of comments
            CommentsService.loadComments();
        }
    };

    const setLoading = (isLoading) => {
        const submitButton = document.getElementById('submitComment');
        if (submitButton) {
            if (isLoading) {
                submitButton.setAttribute('aria-busy', 'true');
                submitButton.setAttribute('aria-label', 'Please wait...');
                submitButton.setAttribute('disabled', 'disabled');
            } else {
                submitButton.removeAttribute('aria-busy');
                submitButton.removeAttribute('Please wait...');
                submitButton.removeAttribute('disabled');
            }
        }
    };

    return { init };
})();

// Initialize the application
document.addEventListener('DOMContentLoaded', CommentManager.init);