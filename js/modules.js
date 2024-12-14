document.addEventListener('DOMContentLoaded', () => {
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
    let correctAnswers = 0;
    let totalCorrect = document.querySelectorAll('.quiz-option.correct').length;

    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (option.classList.contains('selected')) return;

            option.classList.add('selected');
            
            if (option.classList.contains('correct')) {
                correctAnswers++;
                option.style.background = 'var(--green)';
                option.style.color = 'white';
                
                if (correctAnswers === totalCorrect) {
                    showMessage('Amazing! You got them all right! 🌟', 'success');
                    createConfetti();
                }
            } else {
                option.style.background = 'var(--red)';
                option.style.color = 'white';
                showMessage('Not quite! Try another answer! 😊', 'error');
            }
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
