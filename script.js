document.addEventListener('DOMContentLoaded', () => {
    // إنشاء القلوب العائمة
    const container = document.getElementById('hearts-container');
    const hearts = ['💖', '💗', '💓', '💘', '💝', '💞'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.bottom = '-50px';
        heart.style.animationDuration = `${5 + Math.random() * 10}s`;
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, parseFloat(heart.style.animationDuration) * 1000);
    }
    
    setInterval(createHeart, 300);
    
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = `${e.clientX}px`;
                heart.style.bottom = `${window.innerHeight - e.clientY}px`;
                heart.style.animationDuration = `${3 + Math.random() * 4}s`;
                container.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, parseFloat(heart.style.animationDuration) * 1000);
            }, i * 200);
        }
    });

    // التحكم بالموسيقى
    const music = document.getElementById('music');
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    musicBtn.addEventListener('click', async () => {
        try {
            if (isPlaying) {
                await music.pause();
                musicBtn.textContent = 'تشغيل الموسيقى';
            } else {
                await music.play();
                musicBtn.textContent = 'إيقاف الموسيقى';
            }
            isPlaying = !isPlaying;
        } catch (err) {
            alert('الرجاء السماح بتشغيل الصوت أولاً');
            console.error('Error with audio playback:', err);
        }
    });
});
