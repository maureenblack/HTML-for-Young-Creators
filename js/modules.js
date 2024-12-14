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

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    // Internet game functionality
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
