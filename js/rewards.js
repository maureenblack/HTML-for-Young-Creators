// Reward and Achievement System
const achievements = {
    'first_step': {
        id: 'first_step',
        title: 'First Steps! 🎯',
        description: 'Complete your first lesson',
        icon: '🎯',
        points: 10,
        secret: false
    },
    'quiz_master': {
        id: 'quiz_master',
        title: 'Quiz Master! 🎓',
        description: 'Get all answers correct in a quiz',
        icon: '🎓',
        points: 20,
        secret: false
    },
    'fast_learner': {
        id: 'fast_learner',
        title: 'Fast Learner! ⚡',
        description: 'Complete a module in under 10 minutes',
        icon: '⚡',
        points: 15,
        secret: false
    },
    'helper': {
        id: 'helper',
        title: 'Helper! 🤝',
        description: 'Use hints less than 3 times in a module',
        icon: '🤝',
        points: 25,
        secret: false
    },
    'css_master': {
        id: 'css_master',
        title: 'CSS Wizard! 🎨',
        description: 'Create a beautiful design using CSS',
        icon: '🎨',
        points: 30,
        secret: false
    },
    'style_master': {
        id: 'style_master',
        title: 'Style Master! 💅',
        description: 'Complete the CSS challenge perfectly',
        icon: '💅',
        points: 35,
        secret: false
    },
    'code_artist': {
        id: 'code_artist',
        title: 'Code Artist! 🎪',
        description: 'Create something unique with code',
        icon: '🎪',
        points: 40,
        secret: false
    },
    'explorer': {
        id: 'explorer',
        title: 'Explorer! 🗺️',
        description: 'Visit all learning modules',
        icon: '🗺️',
        points: 25,
        secret: false
    },
    'night_owl': {
        id: 'night_owl',
        title: 'Night Owl! 🦉',
        description: 'Study after sunset',
        icon: '🦉',
        points: 15,
        secret: true
    },
    'early_bird': {
        id: 'early_bird',
        title: 'Early Bird! 🐦',
        description: 'Study before sunrise',
        icon: '🐦',
        points: 15,
        secret: true
    },
    'consistent_learner': {
        id: 'consistent_learner',
        title: 'Consistent Learner! 🔥',
        description: 'Maintain a 3-day learning streak',
        icon: '🔥',
        points: 20,
        secret: false
    },
    'weekly_master': {
        id: 'weekly_master',
        title: 'Weekly Master! 📆',
        description: 'Maintain a 7-day learning streak',
        icon: '📆',
        points: 50,
        secret: false
    },
    'monthly_champion': {
        id: 'monthly_champion',
        title: 'Monthly Champion! 🏆',
        description: 'Maintain a 30-day learning streak',
        icon: '🏆',
        points: 100,
        secret: false
    }
};

const levels = {
    1: { name: 'HTML Rookie', icon: '🌱', pointsNeeded: 0 },
    2: { name: 'Code Explorer', icon: '🗺️', pointsNeeded: 100 },
    3: { name: 'Style Apprentice', icon: '🎨', pointsNeeded: 250 },
    4: { name: 'Web Wizard', icon: '🧙', pointsNeeded: 500 },
    5: { name: 'Code Master', icon: '👑', pointsNeeded: 1000 },
    6: { name: 'Digital Legend', icon: '⭐', pointsNeeded: 2000 }
};

class RewardSystem {
    constructor() {
        this.userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
        this.unlockedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
        this.currentStreak = parseInt(localStorage.getItem('streak')) || 0;
        this.lastVisit = localStorage.getItem('lastVisit');
        this.initializeRewardPanel();
        this.checkDailyStreak();
    }

    initializeRewardPanel() {
        const panel = document.createElement('div');
        panel.className = 'reward-panel';
        panel.setAttribute('role', 'complementary');
        panel.setAttribute('aria-label', 'Achievements and Rewards');
        panel.innerHTML = `
            <div class="points-display" role="status">
                <span class="points-icon">⭐</span>
                <span class="points-count">${this.userPoints}</span>
            </div>
            <div class="achievements-list"></div>
            <div class="level-display" role="status">
                <span class="level-icon">${levels[1].icon}</span>
                <span class="level-name">${levels[1].name}</span>
                <span class="level-progress-bar">
                    <span class="level-progress" style="width: ${this.getProgressToNextLevel()}%"></span>
                </span>
            </div>
        `;
        document.body.appendChild(panel);
        this.updateAchievementsList();
        this.updateLevelDisplay();
    }

    awardPoints(points) {
        this.userPoints += points;
        localStorage.setItem('userPoints', this.userPoints);
        this.updatePointsDisplay();
        this.updateLevelDisplay();
        this.checkLevelUp();
    }

    unlockAchievement(achievementId) {
        if (!this.unlockedAchievements.includes(achievementId)) {
            const achievement = achievements[achievementId];
            this.unlockedAchievements.push(achievementId);
            localStorage.setItem('achievements', JSON.stringify(this.unlockedAchievements));
            this.awardPoints(achievement.points);
            this.showAchievementNotification(achievement);
            this.updateAchievementsList();
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.setAttribute('role', 'alert');
        notification.innerHTML = `
            <span class="achievement-icon">${achievement.icon}</span>
            <div class="achievement-details">
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <p>+${achievement.points} points!</p>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    updatePointsDisplay() {
        const pointsDisplay = document.querySelector('.points-count');
        if (pointsDisplay) {
            pointsDisplay.textContent = this.userPoints;
        }
    }

    updateLevelDisplay() {
        const levelDisplay = document.querySelector('.level-display');
        if (levelDisplay) {
            const currentLevel = this.getCurrentLevel();
            levelDisplay.querySelector('.level-icon').textContent = levels[currentLevel].icon;
            levelDisplay.querySelector('.level-name').textContent = levels[currentLevel].name;
            levelDisplay.querySelector('.level-progress').style.width = `${this.getProgressToNextLevel()}%`;
        }
    }

    updateAchievementsList() {
        const list = document.querySelector('.achievements-list');
        if (list) {
            list.innerHTML = '';
            Object.values(achievements).forEach(achievement => {
                const isUnlocked = this.unlockedAchievements.includes(achievement.id);
                const achievementEl = document.createElement('div');
                achievementEl.className = `achievement ${isUnlocked ? 'unlocked' : 'locked'}`;
                achievementEl.setAttribute('role', 'listitem');
                achievementEl.innerHTML = `
                    <span class="achievement-icon">${achievement.icon}</span>
                    <div class="achievement-info">
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                    </div>
                `;
                list.appendChild(achievementEl);
            });
        }
    }

    checkLevelUp() {
        const level = Math.floor(this.userPoints / 100) + 1;
        const previousLevel = Math.floor((this.userPoints - 1) / 100) + 1;
        
        if (level > previousLevel) {
            this.showLevelUpNotification(level);
        }
    }

    showLevelUpNotification(level) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.setAttribute('role', 'alert');
        notification.innerHTML = `
            <h3>Level Up! 🎉</h3>
            <p>You've reached level ${level}!</p>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    checkDailyStreak() {
        const now = new Date();
        const lastVisit = this.lastVisit ? new Date(this.lastVisit) : null;
        
        if (lastVisit) {
            const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === 1) {
                this.currentStreak++;
                this.checkStreakAchievements();
            } else if (daysDiff > 1) {
                this.currentStreak = 1;
            }
        } else {
            this.currentStreak = 1;
        }
        
        localStorage.setItem('streak', this.currentStreak);
        localStorage.setItem('lastVisit', now.toISOString());
        
        if (this.currentStreak > 0) {
            this.showStreakNotification();
        }
    }

    checkStreakAchievements() {
        if (this.currentStreak === 3) this.unlockAchievement('consistent_learner');
        if (this.currentStreak === 7) this.unlockAchievement('weekly_master');
        if (this.currentStreak === 30) this.unlockAchievement('monthly_champion');
    }

    showStreakNotification() {
        const notification = document.createElement('div');
        notification.className = 'streak-notification';
        notification.setAttribute('role', 'alert');
        notification.innerHTML = `
            <h3>🔥 ${this.currentStreak} Day Streak!</h3>
            <p>Keep it up! Come back tomorrow for more points!</p>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    getCurrentLevel() {
        let currentLevel = 1;
        for (const [level, info] of Object.entries(levels)) {
            if (this.userPoints >= info.pointsNeeded) {
                currentLevel = parseInt(level);
            }
        }
        return currentLevel;
    }

    getProgressToNextLevel() {
        const currentLevel = this.getCurrentLevel();
        const nextLevel = currentLevel + 1;
        
        if (!levels[nextLevel]) return 100;
        
        const currentLevelPoints = levels[currentLevel].pointsNeeded;
        const nextLevelPoints = levels[nextLevel].pointsNeeded;
        const pointsInLevel = this.userPoints - currentLevelPoints;
        const pointsNeededForNext = nextLevelPoints - currentLevelPoints;
        
        return (pointsInLevel / pointsNeededForNext) * 100;
    }

    checkTimeBasedAchievements() {
        const hour = new Date().getHours();
        if (hour < 6) this.unlockAchievement('early_bird');
        if (hour >= 20) this.unlockAchievement('night_owl');
    }
}

// Initialize reward system
const rewardSystem = new RewardSystem();
