document.addEventListener('DOMContentLoaded', () => {
    const heart = document.querySelector('.wireframe-heart');
    const linesCount = 24; // عدد الخطوط
    
    // إنشاء خطوط القلب
    for (let i = 0; i < linesCount; i++) {
        createHeartLine(i * (360 / linesCount));
    }
    
    // إنشاء خط منحني للقلب
    function createHeartLine(angle) {
        // الخطوط الأفقية
        const hLine = document.createElement('div');
        hLine.className = 'line horizontal';
        hLine.style.transform = `rotateY(${angle}deg) translateZ(50px)`;
        hLine.style.animation = `glow ${2 + Math.random() * 3}s infinite ease-in-out`;
        heart.appendChild(hLine);
        
        // الخطوط المنحنية (لشكل القلب)
        const curve1 = document.createElement('div');
        curve1.className = 'line curve';
        curve1.style.transform = `rotateY(${angle}deg) rotateZ(-45deg) translateX(25px) translateY(-20px) translateZ(50px)`;
        curve1.style.animation = `glow ${3 + Math.random() * 2}s infinite ease-in-out`;
        heart.appendChild(curve1);
        
        const curve2 = document.createElement('div');
        curve2.className = 'line curve';
        curve2.style.transform = `rotateY(${angle}deg) rotateZ(45deg) translateX(-25px) translateY(-20px) translateZ(50px)`;
        curve2.style.animation = `glow ${3 + Math.random() * 2}s infinite ease-in-out`;
        heart.appendChild(curve2);
    }
    
    // تفاعل مع حركة الماوس
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 50 - 25;
        const y = (e.clientY / window.innerHeight) * 50 - 25;
        heart.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
});
