document.addEventListener('DOMContentLoaded', () => {
    // Constants for examples and hints
    const htmlExamples = {
        h1: '<h1>Mount Eloumdem</h1>\n<h2>A Natural Wonder</h2>\n<h3>Flora and Fauna</h3>',
        p: '<p>Mount Eloumdem is a beautiful mountain located in Yaoundé, Cameroon. Its scenic trails offer breathtaking views of the surrounding landscape.</p>\n\n<p>Visitors can enjoy <strong>hiking</strong> and <em>bird watching</em> on the mountain.</p>',
        img: '<img src="../images/Mt._Eloumdem,_Yaoundé_Cameroon.jpg" alt="Scenic view of Mount Eloumdem" style="width: 100%; max-width: 300px;">',
        ul: '<ul>\n    <li>Beautiful hiking trails</li>\n    <li>Diverse wildlife</li>\n    <li>Amazing viewpoints</li>\n</ul>'
    };

    const hints = {
        h1: "Use h1 for the main title, h2 for sections, and h3 for subsections. Don't forget closing tags!",
        p: "Wrap your text in <p> tags. You can use <strong> for bold and <em> for italic text.",
        img: "Images need both src (the image file) and alt (description) attributes.",
        ul: "List items (li) must be wrapped in a ul tag for bullet points.",
        general: "Remember to close all your HTML tags and use proper indentation!"
    };

    // Initialize all features
    initCodeEditor();
    initTryItButtons();
    initHintSystem();
    initBookingSystem();
    initErrorHandling();
    
    // Make the first tag section active by default
    const firstSection = document.querySelector('.tag-section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
});

function initCodeEditor() {
    const codeEditors = document.querySelectorAll('.code-editor');
    const runButtons = document.querySelectorAll('.run-button');
    const previewWindows = document.querySelectorAll('.preview-window');

    codeEditors.forEach((editor, index) => {
        if (!editor.textContent.trim()) {
            editor.textContent = '<!-- Write your HTML code here -->';
        }
    });

    runButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const code = codeEditors[index].textContent;
            try {
                validateHTML(code);
                previewWindows[index].innerHTML = code;
                showMessage('Success! Your code is working perfectly! 🎉', 'success');
            } catch (error) {
                showError(error.message);
            }
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
                // Find the closest code editor and preview window
                const section = button.closest('.content-box');
                const editor = section.querySelector('.code-editor');
                const preview = section.querySelector('.preview-window');
                
                if (editor) {
                    editor.textContent = example;
                    if (preview) {
                        preview.innerHTML = example;
                    }
                    showMessage('Example loaded! Try modifying it! 🚀', 'success');
                    
                    // Update active section
                    document.querySelectorAll('.tag-section').forEach(s => s.classList.remove('active'));
                    button.closest('.tag-section').classList.add('active');
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
    // Check for missing closing tags
    const openTags = code.match(/<\w+>/g) || [];
    const closeTags = code.match(/<\/\w+>/g) || [];
    
    if (openTags.length > closeTags.length) {
        throw new Error('Missing closing tag! Remember to close all your HTML tags.');
    }

    // Check for missing quotes in attributes
    if (/<\w+\s+\w+=[^"'][^>]*>/i.test(code)) {
        throw new Error('Attributes need quotes! Use attribute="value" format.');
    }

    // Check for incorrect nesting
    const tagStack = [];
    const tagPattern = /<\/?(\w+)[^>]*>/g;
    let match;

    while ((match = tagPattern.exec(code)) !== null) {
        const isClosing = match[0].startsWith('</');
        const tagName = match[1];

        if (!isClosing) {
            tagStack.push(tagName);
        } else {
            if (tagStack.pop() !== tagName) {
                throw new Error('Tags are not properly nested! Close inner tags before outer ones.');
            }
        }
    }

    if (tagStack.length > 0) {
        throw new Error(`Unclosed tags: ${tagStack.join(', ')}`);
    }
}

function showMessage(message, type = 'error') {
    const container = document.querySelector('.error-container');
    const messageEl = document.querySelector('.error-message');
    const solutionEl = document.querySelector('.error-solution');

    if (container && messageEl) {
        container.style.display = 'block';
        container.style.background = type === 'success' ? '#e8f5e9' : '#ffebee';
        messageEl.textContent = message;
        
        if (solutionEl) {
            solutionEl.style.display = type === 'success' ? 'none' : 'block';
            if (type === 'error') {
                solutionEl.textContent = 'Try checking your HTML syntax and make sure all tags are properly closed.';
            }
        }

        if (type === 'success') {
            setTimeout(() => {
                container.style.display = 'none';
            }, 3000);
        }
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
