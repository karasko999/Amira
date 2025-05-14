document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('hearts-container');
    const colors = ['#ff0a54', '#ff477e', '#ff5c8a', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];

    // إنشاء 50 قلبًا عشوائيًا
    for (let i = 0; i < 50; i++) {
        createHeart();
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';

        // تحديد خصائص عشوائية لكل قلب
        const size = Math.random() * 20 + 10; // حجم بين 10 و30 بكسل
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 3 + 3; // مدة الحركة بين 3 و6 ثوانٍ

        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.background = color;
        heart.style.left = `${Math.random() * 100}vw`; // موقع أفقي عشوائي
        heart.style.top = `${Math.random() * 100}vh`; // موقع عمودي عشوائي
        heart.style.animationDuration = `${duration}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.3; // شفافية بين 0.3 و0.8

        // إضافة القلب إلى الصفحة
        container.appendChild(heart);

        // إزالة القلب بعد انتهاء الحركة (لتحسين الأداء)
        setTimeout(() => {
            heart.remove();
            createHeart(); // إنشاء قلب جديد مكانه
        }, duration * 1000);
    }
});