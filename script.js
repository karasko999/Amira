document.addEventListener('DOMContentLoaded', () => {
    const linesContainer = document.querySelector('.lines-container');
    const isMobile = window.innerWidth < 768;
    const lineCount = isMobile ? 20 : 36;
    
    // إنشاء الخطوط المشعة
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.transform = `rotate(${i * (360/lineCount)}deg)`;
        line.style.animation = `line-rotate ${3 + Math.random() * 4}s infinite linear ${i * 0.1}s`;
        linesContainer.appendChild(line);
    }
    
    // إضافة تفاعل عند الحركة
    document.addEventListener('mousemove', (e) => {
        const heart = document.querySelector('.heart-3d');
        const x = (e.clientX / window.innerWidth) * 50 - 25;
        const y = (e.clientY / window.innerHeight) * 50 - 25;
        heart.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    
    // نسخة للجوال
    if (isMobile) {
        let angle = 0;
        setInterval(() => {
            angle += 1;
            const x = Math.sin(angle * Math.PI / 180) * 25;
            const y = Math.cos(angle * Math.PI / 180) * 25;
            document.querySelector('.heart-3d').style.transform = 
                `rotateY(${x}deg) rotateX(${y}deg)`;
        }, 50);
    }
});
