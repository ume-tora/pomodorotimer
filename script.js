console.log('script.js loaded');

class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.isWorking = true;
        this.isRunning = false;
        this.interval = null;
        this.timeLeft = this.workTime;
        
        this.initializeUI();
        this.setupEventListeners();
    }

    initializeUI() {
        document.getElementById('timer-display').textContent = this.formatTime(this.workTime);
        document.getElementById('work-time').value = 25;
        document.getElementById('break-time').value = 5;
    }

    setupEventListeners() {
        const startBtn = document.getElementById('start-btn');
        const stopBtn = document.getElementById('stop-btn');
        const resetBtn = document.getElementById('reset-btn');
        const workTimeInput = document.getElementById('work-time');
        const breakTimeInput = document.getElementById('break-time');

        startBtn.addEventListener('click', () => this.start());
        stopBtn.addEventListener('click', () => this.stop());
        resetBtn.addEventListener('click', () => this.reset());
        
        workTimeInput.addEventListener('change', (e) => {
            this.workTime = parseInt(e.target.value) * 60;
            if (!this.isRunning) {
                this.timeLeft = this.workTime;
                document.getElementById('timer-display').textContent = this.formatTime(this.timeLeft);
            }
        });

        breakTimeInput.addEventListener('change', (e) => {
            this.breakTime = parseInt(e.target.value) * 60;
        });
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timer-display').textContent = this.formatTime(this.timeLeft);

            if (this.timeLeft <= 0) {
                this.stop();
                this.isWorking = !this.isWorking;
                this.timeLeft = this.isWorking ? this.workTime : this.breakTime;
                document.getElementById('timer-display').textContent = this.formatTime(this.timeLeft);
                
                // タイマー終了時の音
                const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
                audio.play();
            }
        }, 1000);
    }

    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.isWorking = true;
        this.timeLeft = this.workTime;
        document.getElementById('timer-display').textContent = this.formatTime(this.workTime);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// パーティクルアニメーション
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.insertBefore(particlesContainer, document.body.firstChild);

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // ランダムなサイズ（5px 〜 15px）
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // ランダムな位置
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // ランダムなアニメーションデュレーション（10秒 〜 30秒）
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // ランダムな透明度
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // ランダムなアニメーションデレイ（0秒 〜 5秒）
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // パーティクルを生成
    createParticles();
    
    // タイマーの初期化
    const timer = new PomodoroTimer();
});
