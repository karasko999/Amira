document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hearts-container');
    const colors = [
        'linear-gradient(45deg, #64b5f6, #bbdefb)',
        'linear-gradient(45deg, #42a5f5, #e3f2fd)',
        'linear-gradient(45deg, #1e88e5, #90caf9)'
    ];

    // إنشاء 60 قلبًا بتأثيرات متقدمة
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 300); // تأخير إنشاء كل قلب للحصول على تأثير متتالي
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';

        // إعدادات عشوائية متقدمة
        const size = Math.random() * 20 + 15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 5;
        const duration = Math.random() * 4 + 6;
        const xPos = Math.random() * 100;
        const rotation = Math.random() * 360;

        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.background = color;
        heart.style.left = `${xPos}vw`;
        heart.style.bottom = `-50px`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.setProperty('--rotation', `${rotation}deg`); // للاستخدام في CSS

        container.appendChild(heart);

        // إزالة القلب بعد انتهاء الحركة لتحسين الأداء
        setTimeout(() => {
            heart.remove();
            createHeart(); // إنشاء قلب جديد
        }, (duration + delay) * 1000);
    }
});