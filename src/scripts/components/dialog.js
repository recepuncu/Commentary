export default class DialogManager {
    constructor() {
        // Create dialog element
        this.dialog = document.createElement('dialog');
        this.dialog.open = false;

        // Create article
        this.article = document.createElement('article');
        this.dialog.appendChild(this.article);

        // Create header
        this.header = document.createElement('header');
        this.article.appendChild(this.header);        

        // Title container
        this.titleElement = document.createElement('p');
        this.titleElement.innerHTML = '<strong></strong>';
        this.header.appendChild(this.titleElement);

        // Close button
        this.closeButton = document.createElement('button');
        this.closeButton.innerHTML = '&times;';
        this.closeButton.setAttribute('aria-label', 'Close');
        this.closeButton.setAttribute('rel', 'prev');
        this.closeButton.addEventListener('click', () => this.hide());
        this.header.appendChild(this.closeButton);

        // Content container
        this.contentElement = document.createElement('p');
        this.article.appendChild(this.contentElement);

        // Append dialog to body
        document.body.appendChild(this.dialog);
    }

    /**
     * Set the title of the dialog
     * @param {string} title - The title to set
     */
    setTitle(title) {
        this.titleElement.querySelector('strong').textContent = title;
    }

    /**
     * Set the content of the dialog
     * @param {string} content - The content to set
     */
    setContent(content) {
        this.contentElement.textContent = content;
    }

    /**
     * Show the dialog
     * @param {number} autoHideDuration - Time in milliseconds before auto-hide (optional)
     */
    show(autoHideDuration = null) {
        this.dialog.open = true;
        if (autoHideDuration) {
            setTimeout(() => {
                this.hide();
            }, autoHideDuration);
        }
    }

    /**
     * Hide the dialog
     */
    hide() {
        this.dialog.open = false;
    }
}