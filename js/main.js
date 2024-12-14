// Interactive code preview functionality
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Back to top functionality
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        // Show button when scrolling down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const codeInput = document.querySelector('.code-input');
    const previewBox = document.querySelector('.preview-box');
    const runButton = document.querySelector('.run-button');
    const hintButton = document.querySelector('.hint-button');

    // Live preview functionality
    runButton.addEventListener('click', () => {
        try {
            previewBox.innerHTML = codeInput.value;
            // Add success animation
            runButton.classList.add('success');
            setTimeout(() => runButton.classList.remove('success'), 1000);
            
            // Check for achievements
            checkAchievements(codeInput.value);
        } catch (error) {
            previewBox.innerHTML = `<span class="error">Oops! Something went wrong. Try again!</span>`;
        }
    });

    // Hint system
    const hints = {
        'default': 'Try typing &lt;h1&gt;Hello World!&lt;/h1&gt;',
        'h1': 'Great! Now try adding a paragraph with &lt;p&gt;',
        'p': 'You can make text bold with &lt;strong&gt;',
    };
    let currentHint = 'default';

    hintButton.addEventListener('click', () => {
        const helperBox = document.querySelector('.helper-box');
        // Hide the helper box
        if (helperBox) {
            helperBox.style.display = 'none';
        }

        const hintBox = document.createElement('div');
        hintBox.className = 'hint-popup';
        hintBox.innerHTML = hints[currentHint];
        document.body.appendChild(hintBox);
        
        // Remove hint and show helper box after 3 seconds
        setTimeout(() => {
            hintBox.remove();
            if (helperBox) {
                helperBox.style.display = 'flex';
            }
        }, 3000);
    });

    // Achievement system
    function checkAchievements(code) {
        const achievements = document.querySelectorAll('.badge');
        
        // First Tag Achievement
        if (code.includes('<h1>')) {
            achievements[0].classList.remove('locked');
        }
        
        // Style Master Achievement
        if (code.includes('style=')) {
            achievements[1].classList.remove('locked');
        }
        
        // Web Builder Achievement
        if (code.includes('<h1>') && code.includes('<p>') && code.includes('<img')) {
            achievements[2].classList.remove('locked');
        }
    }

    // Path progression
    const pathItems = document.querySelectorAll('.path-item');
    pathItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            pathItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
        });
    });

    // Fun confetti effect for achievements
    function celebrateAchievement() {
        const colors = ['#FAEAE9', '#9DE7C3', '#D98640'];
        const confetti = [];
        
        for (let i = 0; i < 50; i++) {
            const confettiElement = document.createElement('div');
            confettiElement.className = 'confetti';
            confettiElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiElement.style.left = Math.random() * 100 + 'vw';
            confetti.push(confettiElement);
            document.body.appendChild(confettiElement);
        }

        setTimeout(() => {
            confetti.forEach(c => c.remove());
        }, 2000);
    }
});

// Add some fun animations
const addSplashEffect = (element) => {
    element.addEventListener('click', (e) => {
        const splash = document.createElement('div');
        splash.className = 'splash';
        splash.style.left = e.offsetX + 'px';
        splash.style.top = e.offsetY + 'px';
        element.appendChild(splash);
        setTimeout(() => splash.remove(), 500);
    });
};

// Apply splash effect to buttons
document.querySelectorAll('button').forEach(addSplashEffect);
