// Progress tracking functionality
const saveProgress = () => {
    const progress = {
        currentModule: window.location.pathname,
        completedSections: Array.from(document.querySelectorAll('.completed')).map(el => el.dataset.section),
        achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
        lastVisit: new Date().toISOString()
    };
    localStorage.setItem('learningProgress', JSON.stringify(progress));
};

const loadProgress = () => {
    const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    if (progress.completedSections) {
        progress.completedSections.forEach(section => {
            const el = document.querySelector(`[data-section="${section}"]`);
            if (el) el.classList.add('completed');
        });
    }
};

// Code Editor and Exercise Validation
document.addEventListener('DOMContentLoaded', function() {
    const codeEditor = document.querySelector('.code-editor');
    const runButton = document.querySelector('.run-button');
    const previewWindow = document.querySelector('.preview-window');
    const errorMessage = document.querySelector('.error-message');
    const congratsMessage = document.querySelector('.congratulations');
    const nextButton = document.querySelector('.next-lesson-button');

    // Hide next button by default
    if (nextButton) {
        nextButton.style.display = 'none';
    }

    if (runButton) {
        runButton.addEventListener('click', validateAndPreviewCode);
    }

    if (codeEditor) {
        const preElement = codeEditor.querySelector('pre');
        if (preElement) {
            preElement.setAttribute('contenteditable', 'true');
        }
    }

    function validateAndPreviewCode() {
        const code = codeEditor.querySelector('pre').innerText;
        
        // Clear previous messages
        clearMessages();

        try {
            // Display the code in the preview window
            previewWindow.innerHTML = code;

            // Validate the code
            const parser = new DOMParser();
            const doc = parser.parseFromString(code, 'text/html');

            // Comprehensive validation of the code
            const validationResult = validateExercise(doc);

            if (validationResult.isValid) {
                showSuccess();
            } else {
                showDetailedError(validationResult.errors);
            }

        } catch (error) {
            showError('There was an error in your HTML. Please check your code syntax.');
        }
    }

    function validateExercise(doc) {
        const errors = [];
        const requirements = {
            'h1': {
                selector: 'h1',
                message: 'Missing main heading (h1). Add a heading that introduces Mount Eloumdem.',
                validate: (el) => el && el.textContent.trim().length > 0
            },
            'p': {
                selector: 'p',
                message: 'Missing paragraph (p). Add a description of Mount Eloumdem.',
                validate: (el) => el && el.textContent.trim().length > 20 // Ensure meaningful content
            },
            'img': {
                selector: 'img',
                message: 'Image is missing or incomplete. Make sure it has both src and alt attributes.',
                validate: (el) => el && el.hasAttribute('src') && el.hasAttribute('alt') && 
                                el.getAttribute('alt').trim().length > 0
            },
            'list': {
                selector: 'ul, ol',
                message: 'Missing list of activities. Add a list of things visitors can do at Mount Eloumdem.',
                validate: (el) => {
                    if (!el) return false;
                    const items = el.querySelectorAll('li');
                    return items.length >= 2; // Ensure at least 2 activities
                }
            }
        };

        // Check each requirement
        for (const [key, req] of Object.entries(requirements)) {
            const element = doc.querySelector(req.selector);
            if (!req.validate(element)) {
                errors.push(req.message);
            }
        }

        // Additional content quality checks
        const content = doc.body.textContent;
        if (content.length < 100) {
            errors.push('Your content seems too short. Add more details about Mount Eloumdem.');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    function clearMessages() {
        if (errorMessage) {
            errorMessage.classList.remove('show');
            errorMessage.innerHTML = '';
        }
        if (congratsMessage) {
            congratsMessage.classList.remove('show');
        }
        if (nextButton) {
            nextButton.style.display = 'none';
        }
    }

    function showSuccess() {
        if (congratsMessage) {
            congratsMessage.innerHTML = `
                <h3>🎉 Congratulations!</h3>
                <p>You've successfully created your first HTML webpage about Mount Eloumdem!</p>
                <p>Your code includes all the required elements and good content. You're ready to move on to the next lesson.</p>
            `;
            congratsMessage.classList.add('show');
        }
        if (nextButton) {
            // Smooth fade-in for next button
            nextButton.style.opacity = '0';
            nextButton.style.display = 'inline-block';
            setTimeout(() => {
                nextButton.style.opacity = '1';
            }, 50);
        }
    }

    function showDetailedError(errors) {
        if (errorMessage) {
            let errorHTML = '<h3>🔍 Your code needs some improvements:</h3><ul>';
            errors.forEach(error => {
                errorHTML += `<li>${error}</li>`;
            });
            errorHTML += '</ul><p>Try fixing these issues and run your code again!</p>';
            
            errorMessage.innerHTML = errorHTML;
            errorMessage.classList.add('show');
        }
        if (nextButton) {
            nextButton.style.display = 'none';
        }
    }

    function showError(message) {
        if (errorMessage) {
            errorMessage.innerHTML = `<h3>⚠️ Error</h3><p>${message}</p>`;
            errorMessage.classList.add('show');
        }
        if (nextButton) {
            nextButton.style.display = 'none';
        }
    }
});

// Hint System
document.addEventListener('DOMContentLoaded', function() {
    const hintButtons = document.querySelectorAll('.hint-button');
    
    hintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hintContent = this.nextElementSibling;
            if (hintContent.classList.contains('show')) {
                hintContent.classList.remove('show');
                this.textContent = 'Show Hint';
            } else {
                hintContent.classList.add('show');
                this.textContent = 'Hide Hint';
            }
        });
    });
});

// Booking System
document.addEventListener('DOMContentLoaded', function() {
    const bookingButtons = document.querySelectorAll('.booking-button');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.querySelector('.booking-form');

    bookingButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (modal) modal.style.display = 'block';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically handle the form submission
            // For now, just hide the modal
            modal.style.display = 'none';
            alert('Thank you for booking a session! We will contact you soon.');
        });
    }
});

// Internet game functionality
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.send-button');
    const packets = document.querySelectorAll('.data-packet');
    let isAnimating = false;

    if (sendButton) {
        sendButton.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            // Animate packets one after another
            packets.forEach((packet, index) => {
                setTimeout(() => {
                    packet.classList.add('moving');
                    
                    // Remove animation class after completion
                    setTimeout(() => {
                        packet.classList.remove('moving');
                        if (index === packets.length - 1) {
                            isAnimating = false;
                            showMessage('Message delivered! 🎉', 'success');
                        }
                    }, 2000);
                }, index * 500);
            });
        });
    }

    // Quiz functionality
    const quizOptions = document.querySelectorAll('.quiz-option');
    const hintButtons = document.querySelectorAll('.hint-button');

    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            const feedback = option.parentElement.querySelector('.feedback-bubble');
            const isCorrect = option.classList.contains('correct');
            
            // Show feedback
            feedback.classList.remove('hidden');
            feedback.classList.add('show');
            
            // Animate option
            option.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
            
            // Update progress if correct
            if (isCorrect) {
                const section = option.closest('[data-section]');
                if (section) {
                    section.classList.add('completed');
                    saveProgress();
                    createConfetti();
                }
            }

            // Hide feedback after delay
            setTimeout(() => {
                feedback.classList.remove('show');
                feedback.classList.add('hidden');
            }, 3000);
        });
    });

    // Hint functionality
    hintButtons.forEach(button => {
        button.addEventListener('click', () => {
            const hintText = button.nextElementSibling;
            hintText.classList.toggle('hidden');
            hintText.classList.toggle('show');
            button.textContent = hintText.classList.contains('show') ? 'Hide Hint 🙈' : 'Need a Hint? 💡';
        });
    });

    // Interactive steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateX(10px)';
        });
        
        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateX(0)';
        });
    });

    // Message display function
    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        document.body.appendChild(message);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Confetti celebration
    function createConfetti() {
        const colors = ['#D98640', '#00BF63', '#A62425'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }
    }

    // Fact list hover effects
    const factItems = document.querySelectorAll('.fact-list li');
    factItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
});
