document.addEventListener('DOMContentLoaded', () => {
    // Constants for examples and hints
    const htmlExamples = {
        h1: '<h1>Mount Eloumdem, Yaoundé</h1>',
        p: '<p>Discover the breathtaking Mount Eloumdem in Yaoundé, Cameroon. This majestic mountain offers stunning views of the capital city and its surroundings.</p>',
        img: '<img src="../images/Mt._Eloumdem,_Yaoundé_Cameroon.jpg" alt="Beautiful view of Mount Eloumdem">',
        list: `<ul>
    <li>Hiking trails</li>
    <li>Photography spots</li>
    <li>Bird watching areas</li>
</ul>`
    };

    const hints = {
        h1: "Use <h1> tags for the main heading",
        p: "Wrap your paragraph text in <p> tags",
        img: 'Use <img src="../images/Mt._Eloumdem,_Yaoundé_Cameroon.jpg" alt="description"> for the mountain image',
        list: "Use <ul> for unordered list and <li> for list items",
        general: "Make sure to close all your HTML tags and use proper indentation!"
    };

    // Initialize all interactive features
    initCodeEditor();
    initTryItButtons();
    initHintSystem();
    initBookingSystem();
    initErrorHandling();
});

function initCodeEditor() {
    const codeEditors = document.querySelectorAll('.code-editor');
    const runButtons = document.querySelectorAll('.run-button');
    const previewWindows = document.querySelectorAll('.preview-window');

    runButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const code = codeEditors[index].textContent;
            updatePreview(code);
        });
    });
}

function initTryItButtons() {
    const tryItButtons = document.querySelectorAll('.try-it-button');
    
    tryItButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.dataset.tag;
            const example = htmlExamples[tag];
            if (example) {
                const editor = button.closest('.content-box').querySelector('.code-editor');
                if (editor) {
                    editor.textContent = example;
                    showMessage('Example loaded! Try modifying it! 🚀', 'success');
                }
            }
        });
    });
}

function initHintSystem() {
    const hintButton = document.querySelector('.hint-button');
    const hintContent = document.querySelector('.hint-content');
    
    if (hintButton && hintContent) {
        hintButton.addEventListener('click', () => {
            const currentDisplay = hintContent.style.display;
            hintContent.style.display = currentDisplay === 'none' || currentDisplay === '' ? 'block' : 'none';
            
            if (hintContent.style.display === 'block') {
                const activeSection = document.querySelector('.tag-section.active');
                const tag = activeSection ? activeSection.dataset.tag : 'general';
                hintContent.textContent = hints[tag] || hints.general;
            }
        });
    }
}

function initBookingSystem() {
    const modal = document.querySelector('.modal');
    const bookingButton = document.querySelector('.booking-button');
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');

    if (bookingButton && modal) {
        bookingButton.addEventListener('click', () => {
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 10);
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeBookingModal);
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const bookingDetails = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Booking details:', bookingDetails);
            
            showMessage('Booking request sent! We\'ll contact you soon! 📧', 'success');
            closeBookingModal();
            bookingForm.reset();
        });
    }
}

function closeBookingModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

function validateHTML(code) {
    // Check if user has made any changes
    const defaultCode = code.includes('<!-- Add your content below: -->') && 
                       !code.includes('<h1>') && 
                       !code.includes('<p>') && 
                       !code.includes('<ul>');
    
    if (defaultCode) {
        throw new Error('You need to add your content! Try adding a heading with <h1>, a paragraph with <p>, and a list with <ul> and <li> tags.');
    }

    // Check for required elements
    if (!code.includes('<h1>')) {
        throw new Error('Don\'t forget to add a heading! Use <h1> tags to create a main heading for your webpage.');
    }

    if (!code.includes('</h1>')) {
        throw new Error('Your heading is missing a closing tag! Add </h1> to close your heading.');
    }

    if (!code.includes('<p>')) {
        throw new Error('Add a paragraph about Mount Eloumdem! Use <p> tags to create a paragraph.');
    }

    if (!code.includes('</p>')) {
        throw new Error('Your paragraph is missing a closing tag! Add </p> to close your paragraph.');
    }

    if (!code.includes('<ul>')) {
        throw new Error('Create a list of activities! Use <ul> tags to start your list.');
    }

    if (!code.includes('</ul>')) {
        throw new Error('Your list is missing a closing tag! Add </ul> to close your list.');
    }

    if (!code.includes('<li>')) {
        throw new Error('Add some items to your list! Use <li> tags inside your <ul> to list activities.');
    }

    if (!code.includes('</li>')) {
        throw new Error('Your list items are missing closing tags! Add </li> to close each list item.');
    }

    // Check for proper nesting
    const listItemsOutsideList = code.includes('<li>') && !code.includes('<ul>');
    if (listItemsOutsideList) {
        throw new Error('List items (<li>) must be inside a list! Put them between <ul> and </ul> tags.');
    }

    // Check for missing quotes in attributes
    if (/<\w+\s+\w+=[^"'][^>]*>/i.test(code)) {
        throw new Error('Attributes need quotes! For example: src="image.jpg" instead of src=image.jpg');
    }

    // Check for incorrect nesting
    const tagStack = [];
    const tagPattern = /<\/?(\w+)[^>]*>/g;
    let match;

    while ((match = tagPattern.exec(code)) !== null) {
        if (match[0].includes('/>')) continue; // Skip self-closing tags
        const isClosing = match[0].startsWith('</');
        const tagName = match[1];

        if (!isClosing) {
            if (!match[0].endsWith('/>')) { // Not a self-closing tag
                tagStack.push(tagName);
            }
        } else {
            const lastTag = tagStack.pop();
            if (lastTag !== tagName) {
                throw new Error(`Tags are not properly nested! You closed </${tagName}> but the last opened tag was <${lastTag}>`);
            }
        }
    }

    if (tagStack.length > 0) {
        const nonSelfClosingTags = tagStack.filter(tag => tag !== 'img');
        if (nonSelfClosingTags.length > 0) {
            throw new Error(`Don't forget to close your tags! Missing closing tags for: ${nonSelfClosingTags.join(', ')}`);
        }
    }
}

function showMessage(message, type = 'error') {
    const errorContainer = document.querySelector('.error-container');
    const errorMessage = document.querySelector('.error-message');
    const errorSolution = document.querySelector('.error-solution');
    
    if (errorContainer && errorMessage) {
        errorContainer.style.display = 'block';
        errorMessage.textContent = message;
        
        errorContainer.className = 'error-container ' + type;
        
        if (errorSolution) {
            if (type === 'error') {
                errorSolution.style.display = 'block';
                errorSolution.innerHTML = `
                    <h4>💡 Need help?</h4>
                    <p>Here's what you need to include:</p>
                    <ul>
                        <li>A heading using <code>&lt;h1&gt;</code> tags</li>
                        <li>A paragraph using <code>&lt;p&gt;</code> tags</li>
                        <li>A list using <code>&lt;ul&gt;</code> and <code>&lt;li&gt;</code> tags</li>
                        <li>Make sure to close all your tags</li>
                    </ul>`;
            } else {
                errorSolution.style.display = 'none';
            }
        }
    }
}

function updatePreview(code) {
    try {
        validateHTML(code);
        const previewWindow = document.querySelector('.preview-window');
        if (previewWindow) {
            previewWindow.innerHTML = code;
            showMessage('Great job! 🎉 Your webpage looks amazing! Ready for the next lesson?', 'success');
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function showError(message) {
    showMessage(message, 'error');
}

function initErrorHandling() {
    window.addEventListener('error', (event) => {
        showError('An error occurred: ' + event.error.message);
    });
}
