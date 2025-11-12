// Game configuration and data
const GameConfig = {
    upgrades: {
        production: [
            { id: 'advancedProcessors', name: 'Advanced Processors', cost: 100, increase: 1, description: '+1 Crypto per second' },
            { id: 'enhancedMemory', name: 'Enhanced Memory', cost: 200, increase: 2, description: '+2 Crypto per second' },
            { id: 'cpuCooling', name: 'CPU Cooling', cost: 400, increase: 3, description: '+3 Crypto per second' },
            { id: 'automation', name: 'Automation', cost: 800, increase: 5, description: '+5 Crypto per second' },
            { id: 'powerSupply', name: 'Power Supply', cost: 1200, increase: 6, description: '+6 Crypto per second' },
            { id: 'advancedCooling', name: 'Advanced Cooling', cost: 1500, increase: 8, description: '+8 Crypto per second' },
            { id: 'extraCooling', name: 'Extra Cooling', cost: 2000, increase: 10, description: '+10 Crypto per second' },
            { id: 'smartAlgorithm', name: 'Smart Algorithm', cost: 2500, effect: 'multiply', value: 2, description: 'Double crypto production' },
            { id: 'automationPlus', name: 'Automation+', cost: 3000, effect: 'multiply', value: 1.5, description: 'Increase production by 50%' },
            { id: 'cpuOverclock', name: 'CPU Overclock', cost: 4000, effect: 'multiply', value: 1.25, description: 'Increase production by 25%' },
            { id: 'breakthroughTech', name: 'Breakthrough Tech', cost: 5000, effect: 'breakthrough', description: '+1 Data Center & Triple production' },
            { id: 'equipmentUpgrade', name: 'Equipment Upgrade', cost: 8000, effect: 'multiply', value: 1.5, description: 'Increase production by 50%' },
            { id: 'cryptoFarm', name: 'Crypto Farm', cost: 10000, effect: 'cryptoFarm', description: '+1 Data Center & 5x production' },
            { id: 'advancedAlgorithm', name: 'Advanced Algorithm', cost: 15000, effect: 'multiply', value: 2, description: 'Double crypto production' }
        ],
        energy: [
            { id: 'energySaving', name: 'Energy Saving', cost: 1000, effect: 'energySaving', value: 0.9, description: 'Reduce energy consumption by 10%' },
            { id: 'expandCenter', name: 'Expand Center', cost: 1800, effect: 'expand', description: '+1 Data Center' },
            { id: 'energyEfficiency', name: 'Energy Efficiency', cost: 3500, effect: 'energyEfficiency', value: 0.8, description: 'Reduce energy consumption by 20%' },
            { id: 'innovativeDesign', name: 'Innovative Design', cost: 20000, effect: 'innovativeDesign', value: { energy: 0.7, performance: 1.75 }, description: 'Energy use -30%, Performance +75%' }
        ],
        defense: [
            { id: 'shield', name: 'Shield', cost: 600, effect: 'defense', value: 50, description: '+50 Defense' },
            { id: 'improvedDefense', name: 'Improved Defense', cost: 7000, effect: 'defense', value: 100, description: '+100 Defense' }
        ],
        special: [
            { id: 'investment', name: 'Investment', cost: 6000, effect: 'investment', value: 1.2, description: 'Instant 20% money boost' },
            { id: 'marketAnalyst', name: 'Market Analyst', cost: 12000, effect: 'investment', value: 1.4, description: 'Instant 40% money boost' }
        ]
    },
    
    achievements: [
        { id: 'firstMine', name: 'First Mine', description: 'Mine your first crypto', condition: (state) => state.money >= 500, reward: 100 },
        { id: 'thousandaire', name: 'Thousandaire', description: 'Reach $1,000', condition: (state) => state.money >= 1000, reward: 500 },
        { id: 'tenThousand', name: 'Ten Thousand', description: 'Reach $10,000', condition: (state) => state.money >= 10000, reward: 2000 },
        { id: 'dataMaster', name: 'Data Master', description: 'Own 5 Data Centers', condition: (state) => state.dataCenters >= 5, reward: 1500 },
        { id: 'energyExpert', name: 'Energy Expert', description: 'Reach Energy Regen Level 10', condition: (state) => state.energyRegenLevel >= 10, reward: 1000 },
        { id: 'firstRebirth', name: 'First Rebirth', description: 'Complete your first rebirth', condition: (state) => state.rebirths >= 1, reward: 5000 },
        { id: 'defensePro', name: 'Defense Pro', description: 'Reach 500 Defense', condition: (state) => state.defense >= 500, reward: 3000 },
        { id: 'upgradeMaster', name: 'Upgrade Master', description: 'Purchase 10 upgrades', condition: (state) => Object.keys(state.ownedUpgrades).length >= 10, reward: 4000 }
    ]
};

// Game state management
const GameState = {
    energy: parseInt(localStorage.getItem('energy')) || 100,
    money: parseInt(localStorage.getItem('money')) || 500,
    cryptoPerSecond: parseInt(localStorage.getItem('cryptoPerSecond')) || 1,
    dataCenters: parseInt(localStorage.getItem('dataCenters')) || 1,
    energyRegenLevel: parseInt(localStorage.getItem('energyRegenLevel')) || 1,
    defense: parseInt(localStorage.getItem('defense')) || 0,
    rebirths: parseInt(localStorage.getItem('rebirths')) || 0,
    rebirthBonus: parseFloat(localStorage.getItem('rebirthBonus')) || 0,
    totalRebirthBonus: parseFloat(localStorage.getItem('totalRebirthBonus')) || 0,
    ownedUpgrades: JSON.parse(localStorage.getItem('ownedUpgrades')) || {},
    achievements: JSON.parse(localStorage.getItem('achievements')) || {},
    
    save() {
        localStorage.setItem('energy', this.energy);
        localStorage.setItem('money', this.money);
        localStorage.setItem('cryptoPerSecond', this.cryptoPerSecond);
        localStorage.setItem('dataCenters', this.dataCenters);
        localStorage.setItem('energyRegenLevel', this.energyRegenLevel);
        localStorage.setItem('defense', this.defense);
        localStorage.setItem('rebirths', this.rebirths);
        localStorage.setItem('rebirthBonus', this.rebirthBonus);
        localStorage.setItem('totalRebirthBonus', this.totalRebirthBonus);
        localStorage.setItem('ownedUpgrades', JSON.stringify(this.ownedUpgrades));
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
    },
    
    reset() {
        if (confirm('Are you sure you want to reset all progress?')) {
            localStorage.clear();
            location.reload();
        }
    }
};

// UI management
const ui = {
    logMessage(message) {
        const logContainer = document.getElementById('log');
        const logEntry = document.createElement('p');
        logEntry.textContent = message;
        logContainer.appendChild(logEntry);
        
        if (logContainer.children.length > 3) {
            logContainer.removeChild(logContainer.firstChild);
        }
        
        setTimeout(() => {
            if (logEntry.parentNode === logContainer) {
                logContainer.removeChild(logEntry);
            }
        }, 5000);
    },
    
    updateUI() {
        document.getElementById('energy').textContent = GameState.energy;
        document.getElementById('money').textContent = GameState.money.toLocaleString();
        document.getElementById('cryptoPerSecond').textContent = GameState.cryptoPerSecond;
        document.getElementById('dataCenters').textContent = GameState.dataCenters;
        document.getElementById('energyRegenLevel').textContent = GameState.energyRegenLevel;
        document.getElementById('defense').textContent = GameState.defense;
        document.getElementById('rebirths').textContent = GameState.rebirths;
        document.getElementById('rebirthBonus').textContent = GameState.rebirthBonus.toFixed(2);
        document.getElementById('totalRebirthBonus').textContent = GameState.totalRebirthBonus.toFixed(2);
        
        document.getElementById('energyBar').style.width = `${GameState.energy}%`;
        
        document.getElementById('mineButton').disabled = GameState.energy < 1;
        document.getElementById('energyRegenButton').textContent = `Upgrade Energy Regen ($${GameState.energyRegenLevel * 100})`;
        document.getElementById('energyRegenButton').disabled = GameState.money < GameState.energyRegenLevel * 100;
        
        this.updateUpgradeButtons();
        GameState.save();
    },
    
    updateUpgradeButtons() {
        for (const category in GameConfig.upgrades) {
            GameConfig.upgrades[category].forEach(upgrade => {
                const button = document.getElementById(`upgrade-${upgrade.id}`);
                if (button) {
                    button.disabled = GameState.money < upgrade.cost || GameState.ownedUpgrades[upgrade.id];
                }
            });
        }
    },
    
    showUpgrades(category) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.upgrades').forEach(upgrades => upgrades.classList.remove('active'));
        
        document.getElementById(category).classList.add('active');
        document.querySelector(`.tab[onclick="ui.showUpgrades('${category}')"]`).classList.add('active');
    },
    
    generateUpgradeButtons() {
        for (const category in GameConfig.upgrades) {
            const container = document.getElementById(category);
            container.innerHTML = '';
            
            GameConfig.upgrades[category].forEach(upgrade => {
                const upgradeElement = document.createElement('button');
                upgradeElement.className = 'upgrade';
                upgradeElement.id = `upgrade-${upgrade.id}`;
                upgradeElement.innerHTML = `
                    ${upgrade.name}
                    <span class="upgrade-cost">$${upgrade.cost.toLocaleString()}</span>
                    <small>${upgrade.description}</small>
                `;
                upgradeElement.onclick = () => game.buyUpgrade(upgrade.id, category);
                
                if (GameState.ownedUpgrades[upgrade.id]) {
                    upgradeElement.disabled = true;
                    upgradeElement.innerHTML += '<br><small>✓ Purchased</small>';
                }
                
                container.appendChild(upgradeElement);
            });
        }
    },
    
    generateAchievementList() {
        const container = document.getElementById('achievements');
        container.innerHTML = '';
        
        GameConfig.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement ${GameState.achievements[achievement.id] ? 'unlocked' : ''}`;
            achievementElement.innerHTML = `
                <div class="achievement-icon">${GameState.achievements[achievement.id] ? '✓' : '?'}</div>
                <div>
                    <strong>${achievement.name}</strong><br>
                    <small>${achievement.description}</small>
                    ${GameState.achievements[achievement.id] ? `<br><small>Reward: $${achievement.reward}</small>` : ''}
                </div>
            `;
            container.appendChild(achievementElement);
        });
    },
    
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${10 + Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }
    }
};

// Game logic
const game = {
    init() {
        ui.createParticles();
        ui.generateUpgradeButtons();
        ui.generateAchievementList();
        ui.updateUI();
        this.startGameLoops();
        this.checkAchievements();
    },
    
    mineCrypto() {
        if (GameState.energy > 0) {
            GameState.energy -= 1;
            const mined = GameState.cryptoPerSecond * GameState.dataCenters;
            GameState.money += mined;
            ui.updateUI();
            ui.logMessage(`Mined $${mined} worth of crypto`);
            this.checkAchievements();
        } else {
            ui.logMessage('Not enough energy to mine');
        }
    },
    
    upgradeEnergyRegen() {
        const upgradeCost = GameState.energyRegenLevel * 100;
        if (GameState.money >= upgradeCost) {
            GameState.money -= upgradeCost;
            GameState.energyRegenLevel += 1;
            ui.updateUI();
            ui.logMessage('Energy regeneration upgraded');
            this.checkAchievements();
        } else {
            ui.logMessage(`Not enough money. Need $${upgradeCost}`);
        }
    },
    
    buyUpgrade(upgradeId, category) {
        const upgradeData = GameConfig.upgrades[category].find(u => u.id === upgradeId);
        
        if (!upgradeData || GameState.money < upgradeData.cost || GameState.ownedUpgrades[upgradeId]) {
            return;
        }
        
        GameState.money -= upgradeData.cost;
        GameState.ownedUpgrades[upgradeId] = true;
        
        if (upgradeData.increase) {
            GameState.cryptoPerSecond += upgradeData.increase;
        } else if (upgradeData.effect) {
            switch (upgradeData.effect) {
                case 'multiply':
                    GameState.cryptoPerSecond = Math.floor(GameState.cryptoPerSecond * upgradeData.value);
                    break;
                case 'energySaving':
                    break;
                case 'expand':
                    GameState.dataCenters += 1;
                    break;
                case 'breakthrough':
                    GameState.dataCenters += 1;
                    GameState.cryptoPerSecond *= 3;
                    break;
                case 'energyEfficiency':
                    break;
                case 'defense':
                    GameState.defense += upgradeData.value;
                    break;
                case 'investment':
                    GameState.money = Math.floor(GameState.money * upgradeData.value);
                    break;
                case 'cryptoFarm':
                    GameState.dataCenters += 1;
                    GameState.cryptoPerSecond *= 5;
                    break;
                case 'innovativeDesign':
                    GameState.cryptoPerSecond = Math.floor(GameState.cryptoPerSecond * upgradeData.value.performance);
                    break;
            }
        }
        
        ui.logMessage(`Purchased: ${upgradeData.name}`);
        ui.updateUI();
        ui.generateUpgradeButtons();
        this.checkAchievements();
    },
    
    checkAchievements() {
        let newAchievements = false;
        
        GameConfig.achievements.forEach(achievement => {
            if (!GameState.achievements[achievement.id] && achievement.condition(GameState)) {
                GameState.achievements[achievement.id] = true;
                GameState.money += achievement.reward;
                ui.logMessage(`Achievement Unlocked: ${achievement.name}! Reward: $${achievement.reward}`);
                newAchievements = true;
            }
        });
        
        if (newAchievements) {
            ui.generateAchievementList();
            ui.updateUI();
        }
    },
    
    randomEvent() {
        const events = [
            {
                name: 'Market Crash',
                message: 'The crypto market crashed! You lost 10% of your money.',
                effect: () => {
                    const loss = Math.floor(GameState.money * 0.1);
                    GameState.money -= loss;
                    return `Lost $${loss}`;
                }
            },
            {
                name: 'Market Boom',
                message: 'The crypto market is booming! You gained 10% of your money.',
                effect: () => {
                    const gain = Math.floor(GameState.money * 0.1);
                    GameState.money += gain;
                    return `Gained $${gain}`;
                }
            },
            {
                name: 'Hacker Attack',
                message: 'Hackers attacked your data centers!',
                effect: () => {
                    const attackStrength = Math.floor(Math.random() * 9000) + 1000;
                    if (GameState.defense >= attackStrength) {
                        const reward = 1000;
                        GameState.money += reward;
                        return `Attack repelled! Gained $${reward}`;
                    } else {
                        const loss = 1000;
                        GameState.money = Math.max(0, GameState.money - loss);
                        return `Attack successful! Lost $${loss}`;
                    }
                }
            },
            {
                name: 'Energy Surge',
                message: 'An energy surge boosted your mining!',
                effect: () => {
                    GameState.energy = Math.min(100, GameState.energy + 20);
                    return 'Energy +20';
                }
            }
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        const result = event.effect();
        ui.logMessage(`${event.name}: ${result}`);
        ui.updateUI();
    },
    
    rebirth() {
        if (GameState.money < 10000) {
            ui.logMessage('You need at least $10,000 to rebirth');
            return;
        }
        
        if (confirm('Rebirth will reset your progress but give a permanent bonus. Continue?')) {
            const bonus = Math.min(50, Math.floor(GameState.money / 10000));
            
            GameState.totalRebirthBonus += bonus;
            GameState.rebirthBonus = bonus;
            GameState.rebirths += 1;
            
            GameState.money = 500;
            GameState.energy = 100;
            GameState.cryptoPerSecond = 1;
            GameState.dataCenters = 1;
            GameState.energyRegenLevel = 1;
            GameState.defense = 0;
            GameState.ownedUpgrades = {};
            
            ui.logMessage(`Rebirth complete! Permanent +${bonus}% income bonus`);
            ui.updateUI();
            ui.generateUpgradeButtons();
            this.checkAchievements();
        }
    },
    
    startGameLoops() {
        setInterval(() => {
            if (GameState.energy < 100) {
                GameState.energy = Math.min(100, GameState.energy + GameState.energyRegenLevel);
                ui.updateUI();
            }
        }, 1000);
        
        setInterval(() => {
            const passiveIncome = GameState.cryptoPerSecond * GameState.dataCenters;
            GameState.money += passiveIncome;
            ui.updateUI();
        }, 1000);
        
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.randomEvent();
            }
        }, Math.random() * 30000 + 30000);
    }
};

// Initialize the game when the page loads
window.onload = () => game.init();

// Add reset function to global scope for debugging
window.resetGame = () => GameState.reset();