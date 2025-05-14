document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hearts-container');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const heartCount = isMobile ? 20 : 40;
    const colors = ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        const size = isMobile ? 20 : 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const xPos = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 3;
        const rotation = Math.random() * 360;

        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${xPos}vw`;
        heart.style.bottom = `-30px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.setProperty('--color', color);

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
            if (container.children.length < heartCount) createHeart();
        }, (duration + delay) * 1000);
    }

    // بدء إنشاء القلوب
    for (let i = 0; i < heartCount; i++) {
        setTimeout(createHeart, i * 300);
    }

    // إضافة تفاعل عند النقر
    document.addEventListener('click', (e) => {
        if (container.children.length < heartCount + 5) {
            for (let i = 0; i < 3; i++) {
                createHeart();
            }
        }
    });
});
