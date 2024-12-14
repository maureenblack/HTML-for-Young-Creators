// Reward and Achievement System
const achievements = {
    'first_step': {
        id: 'first_step',
        title: 'First Steps! 🎯',
        description: 'Complete your first lesson',
        icon: '🎯',
        points: 10
    },
    'quiz_master': {
        id: 'quiz_master',
        title: 'Quiz Master! 🎓',
        description: 'Get all answers correct in a quiz',
        icon: '🎓',
        points: 20
    },
    'fast_learner': {
        id: 'fast_learner',
        title: 'Fast Learner! ⚡',
        description: 'Complete a module in under 10 minutes',
        icon: '⚡',
        points: 15
    },
    'helper': {
        id: 'helper',
        title: 'Helper! 🤝',
        description: 'Use hints less than 3 times in a module',
        icon: '🤝',
        points: 25
    }
};

class RewardSystem {
    constructor() {
        this.userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
        this.unlockedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
        this.initializeRewardPanel();
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
        `;
        document.body.appendChild(panel);
        this.updateAchievementsList();
    }

    awardPoints(points) {
        this.userPoints += points;
        localStorage.setItem('userPoints', this.userPoints);
        this.updatePointsDisplay();
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
}

// Initialize reward system
const rewardSystem = new RewardSystem();
