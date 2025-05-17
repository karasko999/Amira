document.addEventListener('DOMContentLoaded', () => {
    // العناصر الأساسية
    const container = document.getElementById('hearts-container');
    const music = document.getElementById('music');
    const musicBtn = document.getElementById('music-btn');
    const hearts = ['💙', '💕', '🩵', '💘', '💋', '💞']; // رموز زرقاء
    let isPlaying = true;

    // تشغيل الموسيقى تلقائياً
    function autoPlayMusic() {
        music.volume = 0.7;
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                musicBtn.textContent = 'تشغيل الموسيقى';
                isPlaying = false;
                console.log('التشغيل التلقائي معطل:', error);
            });
        }
    }

    // إنشاء القلوب العائمة
    function createFloatingHearts() {
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.bottom = '-50px';
            heart.style.animationDuration = `${5 + Math.random() * 10}s`;
            heart.style.opacity = `${0.5 + Math.random() * 0.5}`;
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, parseFloat(heart.style.animationDuration) * 1000);
        }
        
        // إنشاء 20 قلباً أولياً
        for (let i = 0; i < 20; i++) {
            setTimeout(createHeart, i * 300);
        }
        
        // استمرار إنشاء القلوب
        setInterval(createHeart, 800);
        
        // قلوب إضافية عند النقر
        document.addEventListener('click', (e) => {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'floating-heart';
                    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    heart.style.left = `${e.clientX + (Math.random() * 60 - 30)}px`;
                    heart.style.bottom = `${window.innerHeight - e.clientY}px`;
                    heart.style.animationDuration = `${3 + Math.random() * 4}s`;
                    heart.style.fontSize = `${1.5 + Math.random() * 1.5}rem`;
                    container.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, parseFloat(heart.style.animationDuration) * 1000);
                }, i * 150);
            }
        });
    }

    // التحكم بالموسيقى
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicBtn.textContent = 'تشغيل الموسيقى';
        } else {
            music.play();
            musicBtn.textContent = 'إيقاف الموسيقى';
        }
        isPlaying = !isPlaying;
    });

    // بدء التشغيل
    autoPlayMusic();
    createFloatingHearts();
});
