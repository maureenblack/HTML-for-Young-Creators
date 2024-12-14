// Progress and XP System
class ProgressSystem {
    constructor() {
        this.totalXP = 0;
        this.level = 1;
        this.achievements = 0;
        this.xpToNextLevel = 100;
        
        this.updateUI();
    }

    addXP(amount) {
        this.totalXP += amount;
        while (this.totalXP >= this.xpToNextLevel) {
            this.levelUp();
        }
        this.updateUI();
    }

    levelUp() {
        this.level++;
        this.totalXP -= this.xpToNextLevel;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
        this.showLevelUpMessage();
    }

    showLevelUpMessage() {
        const message = document.createElement('div');
        message.className = 'level-up-message';
        message.innerHTML = `
            <div class="level-up-content">
                <h3>🎉 Level Up!</h3>
                <p>Congratulations! You've reached level ${this.level}</p>
            </div>
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }

    updateUI() {
        document.getElementById('totalXP').textContent = this.totalXP;
        document.getElementById('currentLevel').textContent = this.level;
        document.getElementById('achievementCount').textContent = `${this.achievements}/12`;
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const progress = (this.totalXP / this.xpToNextLevel) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${this.totalXP}/${this.xpToNextLevel} XP to next level`;
    }
}

// Fact Carousel
class FactCarousel {
    constructor() {
        this.currentSlide = 0;
        this.facts = document.querySelectorAll('.fact-card');
        this.prevBtn = document.querySelector('.prev-fact');
        this.nextBtn = document.querySelector('.next-fact');
        this.dotsContainer = document.querySelector('.fact-dots');
        
        this.initialize();
    }

    initialize() {
        this.createDots();
        this.showSlide(0);
        
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Auto-advance slides
        setInterval(() => this.nextSlide(), 5000);
    }

    createDots() {
        for (let i = 0; i < this.facts.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.showSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    showSlide(index) {
        this.facts.forEach(fact => fact.style.display = 'none');
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        this.currentSlide = index;
        this.facts[index].style.display = 'flex';
        document.querySelectorAll('.dot')[index].classList.add('active');
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.facts.length;
        this.showSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.facts.length) % this.facts.length;
        this.showSlide(prev);
    }
}

// View Controls
class ViewControls {
    constructor() {
        this.buttons = document.querySelectorAll('.view-btn');
        this.modulePath = document.querySelector('.module-path');
        
        this.initialize();
    }

    initialize() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const view = button.dataset.view;
                this.modulePath.className = `module-path ${view}-view`;
            });
        });
    }
}

// Daily Challenge
class DailyChallenge {
    constructor() {
        this.challenges = [
            { type: 'HTML Challenge', xp: 20, description: 'Create a navigation menu using HTML lists' },
            { type: 'CSS Challenge', xp: 25, description: 'Style a button with hover effects' },
            { type: 'JavaScript Challenge', xp: 30, description: 'Create a simple counter function' }
        ];
        
        this.currentChallenge = 0;
        this.updateChallenge();
    }

    updateChallenge() {
        const challenge = this.challenges[this.currentChallenge];
        const card = document.querySelector('.challenge-card');
        
        card.innerHTML = `
            <div class="challenge-header">
                <span class="challenge-type">${challenge.type}</span>
                <span class="challenge-xp">+${challenge.xp} XP</span>
            </div>
            <p class="challenge-description">${challenge.description}</p>
            <button class="start-challenge">Accept Challenge</button>
        `;
        
        card.querySelector('.start-challenge').addEventListener('click', () => {
            progress.addXP(challenge.xp);
            this.currentChallenge = (this.currentChallenge + 1) % this.challenges.length;
            this.updateChallenge();
        });
    }
}

// Navigation Controls
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const moduleItems = document.querySelectorAll('.path-item');
let currentModuleIndex = 0;

function updateNavigation() {
    // Update button states
    prevBtn.disabled = currentModuleIndex === 0;
    nextBtn.disabled = currentModuleIndex === moduleItems.length - 1;

    // Update active module
    moduleItems.forEach((item, index) => {
        if (index === currentModuleIndex) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

prevBtn.addEventListener('click', () => {
    if (currentModuleIndex > 0) {
        currentModuleIndex--;
        updateNavigation();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentModuleIndex < moduleItems.length - 1) {
        currentModuleIndex++;
        updateNavigation();
    }
});

// Initialize navigation
updateNavigation();

// Section Navigation
document.addEventListener('DOMContentLoaded', () => {
    const sectionNav = document.querySelector('.section-nav');
    const sectionLinks = sectionNav.querySelectorAll('a');
    const sections = document.querySelectorAll('section');

    // Update active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        sectionLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll to section
    sectionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Update active class
            sectionLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

// Initialize everything when the page loads
let progress, factCarousel, viewControls, dailyChallenge;

document.addEventListener('DOMContentLoaded', () => {
    progress = new ProgressSystem();
    factCarousel = new FactCarousel();
    viewControls = new ViewControls();
    dailyChallenge = new DailyChallenge();
    
    // Add click handlers for module cards
    document.querySelectorAll('.path-item:not(.locked)').forEach(module => {
        module.addEventListener('click', () => {
            if (!module.classList.contains('completed')) {
                progress.addXP(50);
                module.classList.add('completed');
            }
        });
    });
});
