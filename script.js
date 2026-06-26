// ============================================================
// JavaScript المتطور - كامل ومصحح
// ============================================================

// ===== 1. شاشة التحميل =====
const loaderScreen = document.getElementById('loaderScreen');
if (loaderScreen) {
    let loadProgress = 0;
    const loaderPercent = document.getElementById('loaderPercent');
    const loaderBarFill = document.getElementById('loaderBarFill');

    function updateLoader() {
        loadProgress += Math.random() * 8 + 2;
        if (loadProgress > 100) loadProgress = 100;
        if (loaderBarFill) loaderBarFill.style.width = loadProgress + '%';
        if (loaderPercent) loaderPercent.textContent = Math.round(loadProgress) + '%';
        if (loadProgress < 100) {
            setTimeout(updateLoader, 100 + Math.random() * 150);
        } else {
            setTimeout(() => {
                if (loaderScreen) loaderScreen.classList.add('hidden');
            }, 400);
        }
    }
    setTimeout(updateLoader, 400);
}

// ===== 2. جسيمات الخلفية =====
function createBgParticles(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle-bg';
        const size = 30 + Math.random() * 80;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (15 + Math.random() * 25) + 's';
        p.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(p);
    }
}

if (document.getElementById('particlesContainer')) {
    createBgParticles('particlesContainer');
}

// ============================================================
// حساب الأيام من 2026/02/06 (6 فيفري 2026)
// ============================================================

// تاريخ الخروج الثابت: 6 فيفري 2026
const OUR_DATE = new Date(2026, 1, 6); // 2026-02-06 (شهر 1 = فيفري)
const CORRECT_DATE = '2026-02-06';

function calculateDays() {
    const today = new Date();
    const diffTime = Math.abs(today - OUR_DATE);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ===== تحديث عداد الأيام في Login =====
function updateLoginDayCounter() {
    const days = calculateDays();
    const loginDayCount = document.getElementById('loginDayCount');
    if (loginDayCount) {
        loginDayCount.textContent = days;
    }
}
updateLoginDayCounter();
setInterval(updateLoginDayCounter, 30000);

// ===== تحديث عداد الأيام في باقي الصفحات =====
function updateDayCounter() {
    const days = calculateDays();
    const dayCounter = document.getElementById('dayCount');
    if (dayCounter) {
        dayCounter.textContent = days;
    }
}
updateDayCounter();
setInterval(updateDayCounter, 30000);

// ============================================================
// 3. Login - مع التحقق من التاريخ (مثل كلمة السر)
// ============================================================

const nameInput = document.getElementById('nameInput');
const dateInput = document.getElementById('dateInput');
const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');
const musicIndicator = document.getElementById('musicIndicator');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

if (loginBtn && nameInput && dateInput) {

    function handleLogin() {
        const name = nameInput.value.trim();
        const enteredDate = dateInput.value.trim();

        // التحقق من الاسم
        if (name === '') {
            errorMsg.textContent = '⚠️ Ktbi Ismk!';
            errorMsg.classList.add('show');
            nameInput.style.borderColor = '#ff6b6b';
            setTimeout(() => {
                errorMsg.classList.remove('show');
                nameInput.style.borderColor = 'rgba(30, 136, 229, 0.15)';
            }, 2500);
            return;
        }

        // التحقق من التاريخ - مثل كلمة السر
        if (enteredDate === '') {
            errorMsg.textContent = '⚠️ Ktbi la date!';
            errorMsg.classList.add('show');
            dateInput.style.borderColor = '#ff6b6b';
            setTimeout(() => {
                errorMsg.classList.remove('show');
                dateInput.style.borderColor = 'rgba(30, 136, 229, 0.15)';
            }, 2500);
            return;
        }

        // التاريخ الصحيح هو 2026-02-06
        if (enteredDate !== CORRECT_DATE) {
            errorMsg.textContent = '⚠️ La date mchi sa7! (2026-02-06)';
            errorMsg.classList.add('show');
            dateInput.style.borderColor = '#ff6b6b';
            
            // اهتزاز الحقل
            dateInput.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                dateInput.style.animation = '';
            }, 500);
            
            setTimeout(() => {
                errorMsg.classList.remove('show');
                dateInput.style.borderColor = 'rgba(30, 136, 229, 0.15)';
            }, 3000);
            return;
        }

        // ===== كل شيء صحيح =====
        const clickSound = document.getElementById('clickSound');
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }

        // تشغيل الموسيقى
        if (bgMusic) {
            bgMusic.volume = 0.15;
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                if (musicIndicator) musicIndicator.classList.add('active');
            }).catch(() => {
                if (musicIndicator) {
                    musicIndicator.classList.add('active');
                    document.addEventListener('click', function playOnClick() {
                        bgMusic.play().catch(() => {});
                        document.removeEventListener('click', playOnClick);
                    });
                }
            });
        }

        // حفظ البيانات
        localStorage.setItem('userName', name);
        localStorage.setItem('selectedDate', CORRECT_DATE);
        
        // تأثير الزر
        loginBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            loginBtn.style.transform = 'scale(1)';
        }, 200);
        
        // الانتقال بعد 0.8 ثانية
        setTimeout(() => {
            window.location.href = 'question.html';
        }, 800);
    }

    loginBtn.addEventListener('click', handleLogin);
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    dateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
}

// ============================================================
// 4. تأثير الكتابة
// ============================================================

function typeText(element, text, speed = 55) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed + Math.random() * 30);
        }
    }
    type();
}

const pageTexts = {
    'page1': '💙 Mon Klba',
    'page2': '✨ Frkha tey',
    'page3': '🌸 Mon Bébé',
    'page4': '🌹 أنتِ كل شيء'
};

const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
const titleElement = document.getElementById('typingTitle');

if (titleElement && pageTexts[currentPage]) {
    setTimeout(() => {
        typeText(titleElement, pageTexts[currentPage]);
    }, 1500);
}

// ============================================================
// 5. جسيمات حول النص
// ============================================================

function createTextParticles() {
    const container = document.getElementById('particlesText');
    if (!container) return;
    const emojis = ['💙', '✨', '⭐', '💫', '🌟', '❤️'];
    for (let i = 0; i < 14; i++) {
        const dot = document.createElement('span');
        dot.className = 'particle-dot';
        dot.textContent = emojis[i % emojis.length];
        const angle = (360 / 14) * i;
        const distance = 70 + Math.random() * 50;
        dot.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: rotate(${angle}deg) translateX(${distance}px);
            animation: orbitParticle ${4 + Math.random() * 3}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
            font-size: ${14 + Math.random() * 18}px;
            opacity: 0.5;
        `;
        container.appendChild(dot);
    }
}
createTextParticles();

// ============================================================
// 6. عداد القلوب
// ============================================================

let heartCount = parseInt(localStorage.getItem('heartCount')) || 0;
const heartCounter = document.getElementById('heartCount');

function updateHeartCounter() {
    if (heartCounter) {
        heartCounter.textContent = heartCount;
    }
    localStorage.setItem('heartCount', heartCount.toString());
}
updateHeartCounter();

// ============================================================
// 7. انفجار قلوب وشرر عند النقر
// ============================================================

document.querySelectorAll('.heart-interactive').forEach(heart => {
    heart.addEventListener('click', function(e) {
        heartCount++;
        updateHeartCounter();

        const heartSound = document.getElementById('heartSound');
        if (heartSound) {
            heartSound.currentTime = 0;
            heartSound.play().catch(() => {});
        }

        const emojis = ['❤️', '💙', '💖', '💗', '💕', '💝', '✨', '💫', '🌟'];
        const rect = this.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        for (let i = 0; i < 30; i++) {
            const burst = document.createElement('div');
            burst.className = 'heart-burst';
            burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.3;
            const distance = 50 + Math.random() * 180;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 40;
            burst.style.cssText = `
                position: fixed;
                left: ${cx}px;
                top: ${cy}px;
                --tx: ${tx}px;
                --ty: ${ty}px;
                font-size: ${20 + Math.random() * 40}px;
                pointer-events: none;
                z-index: 9999;
                animation: burstUp 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            `;
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 1600);
        }

        const colors = ['#1e88e5', '#64b5f6', '#42a5f5', '#90caf9', '#ffffff', '#ff6b9d'];
        for (let i = 0; i < 25; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 130;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 20;
            spark.style.cssText = `
                position: fixed;
                left: ${cx}px;
                top: ${cy}px;
                --tx: ${tx}px;
                --ty: ${ty}px;
                width: ${4 + Math.random() * 8}px;
                height: ${4 + Math.random() * 8}px;
                background: ${color};
                box-shadow: 0 0 30px ${color};
                pointer-events: none;
                z-index: 9999;
                animation: sparkFly 0.8s ease forwards;
            `;
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 900);
        }

        this.style.transform = 'scale(0.6)';
        setTimeout(() => {
            this.style.transform = 'scale(1.3)';
        }, 150);
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 400);
    });
});

// ============================================================
// 8. قلوب تتبع الماوس
// ============================================================

let mouseTimeout;
document.addEventListener('mousemove', function(e) {
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'mouse-heart';
        const hearts = ['💙', '❤️', '💖', '✨', '💫'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        const tx = (Math.random() - 0.5) * 100;
        const ty = -40 - Math.random() * 100;
        heart.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            --tx: ${tx}px;
            --ty: ${ty}px;
            font-size: ${18 + Math.random() * 25}px;
            pointer-events: none;
            z-index: 9998;
            animation: mouseHeartFade 1.5s ease forwards;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1600);
    }, 50);
});

// ============================================================
// 9. نجوم متساقطة
// ============================================================

function createShootingStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    for (let i = 0; i < 10; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = (5 + Math.random() * 90) + '%';
        star.style.top = (Math.random() * 60) + '%';
        star.style.animationDuration = (2 + Math.random() * 5) + 's';
        star.style.animationDelay = (Math.random() * 12) + 's';
        container.appendChild(star);
    }
}
createShootingStars();

// ============================================================
// 10. ورود متحركة (فقط في الصفحة الأخيرة)
// ============================================================

if (currentPage === 'page4') {
    function createFlowers() {
        const container = document.getElementById('flowersContainer');
        if (!container) return;
        const flowers = ['🌹', '🌸', '🌺', '🌷', '💐', '🌻', '🌼', '🌿'];
        setInterval(() => {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * 100 + '%';
            flower.style.fontSize = (25 + Math.random() * 45) + 'px';
            flower.style.animationDuration = (8 + Math.random() * 14) + 's';
            flower.style.animationDelay = (Math.random() * 3) + 's';
            container.appendChild(flower);
            setTimeout(() => flower.remove(), 22000);
        }, 600);
    }
    createFlowers();
}

// ============================================================
// 11. التحكم في الموسيقى
// ============================================================

const musicToggle = document.getElementById('musicToggle');

if (musicToggle) {
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            this.innerHTML = '<span class="icon">🎵</span><span class="text">تشغيل</span>';
        } else {
            bgMusic.play().catch(() => {});
            isMusicPlaying = true;
            this.innerHTML = '<span class="icon">🔇</span><span class="text">إيقاف</span>';
        }
    });
}

// ============================================================
// 12. تغيير الخلفية
// ============================================================

const bgToggle = document.getElementById('bgToggle');
if (bgToggle) {
    const backgrounds = [
        'linear-gradient(135deg, #0a0e27, #1a1a5e)',
        'linear-gradient(135deg, #1a0a2e, #2d1b3d)',
        'linear-gradient(135deg, #0a1a2e, #1a3d5e)',
        'linear-gradient(135deg, #2e0a1a, #5e1a3d)',
        'linear-gradient(135deg, #0a2e1a, #1a5e3d)'
    ];
    let bgIndex = 0;
    bgToggle.addEventListener('click', function() {
        bgIndex = (bgIndex + 1) % backgrounds.length;
        const page = document.querySelector('.page, .home-page, .login-page, .question-page');
        if (page) {
            page.style.background = backgrounds[bgIndex];
        }
    });
}

// ============================================================
// 13. مؤثرات صوتية للأزرار
// ============================================================

document.querySelectorAll('.btn, .back-btn, .control-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const clickSound = document.getElementById('clickSound');
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
    });
});

// ============================================================
// 14. تأثير مرآة للصور
// ============================================================

document.querySelectorAll('.image-frame img, .gallery img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.5s ease';
        this.style.transform = 'scaleX(-1)';
    });
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scaleX(1)';
    });
});

// ============================================================
// 15. معلومات في الكونسول
// ============================================================

const days = calculateDays();
console.log('%c💙 مرحباً حبيبتي! 💙', 'font-size: 24px; color: #1e88e5; font-weight: bold;');
console.log('%c❤️ عدد القلوب: ' + heartCount, 'font-size: 16px; color: #ff6b9d;');
console.log('%c📅 عدد الأيام من 2026/02/06: ' + days + ' يوم', 'font-size: 16px; color: #64b5f6;');
console.log('%c🎵 الأغنية تعمل تلقائياً! 💙', 'font-size: 16px; color: #90caf9;');