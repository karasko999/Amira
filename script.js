document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hearts-container');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const heartCount = isMobile ? 20 : 50; // تقليل عدد القلوب على الجوال

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';

        const size = isMobile ? Math.random() * 10 + 10 : Math.random() * 20 + 15;
        const xPos = Math.random() * 100;
        const duration = Math.random() * 4 + 3;

        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${xPos}vw`;
        heart.style.animationDuration = `${duration}s`;

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
            if (container.children.length < heartCount) createHeart();
        }, duration * 1000);
    }

    // بدء الإنشاء
    for (let i = 0; i < heartCount; i++) {
        setTimeout(createHeart, i * 500);
    }

    // إعادة الضبط عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        container.innerHTML = '';
        for (let i = 0; i < heartCount; i++) {
            setTimeout(createHeart, i * 500);
        }
    });
});
