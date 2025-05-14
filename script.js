document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('heart');
    const layers = 24; // عدد طبقات القلب
    
    function createHeartLayer(angle) {
        // الخط السفلي للقلب
        const bottomLine = document.createElement('div');
        bottomLine.className = 'heart-line';
        bottomLine.style.width = '120px';
        bottomLine.style.height = '2px';
        bottomLine.style.transform = `rotateY(${angle}rad) translateZ(100px)`;
        
        // الجانب الأيسر للقلب
        const leftCurve = document.createElement('div');
        leftCurve.className = 'heart-line';
        leftCurve.style.width = '2px';
        leftCurve.style.height = '80px';
        leftCurve.style.transform = `
            rotateY(${angle}rad) 
            rotateZ(-0.8rad) 
            translateX(50px) 
            translateY(-40px) 
            translateZ(100px)
        `;
        
        // الجانب الأيمن للقلب
        const rightCurve = document.createElement('div');
        rightCurve.className = 'heart-line';
        rightCurve.style.width = '2px';
        rightCurve.style.height = '80px';
        rightCurve.style.transform = `
            rotateY(${angle}rad) 
            rotateZ(0.8rad) 
            translateX(-50px) 
            translateY(-40px) 
            translateZ(100px)
        `;
        
        container.appendChild(bottomLine);
        container.appendChild(leftCurve);
        container.appendChild(rightCurve);
    }

    // إنشاء جميع طبقات القلب
    for (let i = 0; i < layers; i++) {
        const angle = (i / layers) * Math.PI * 2;
        createHeartLayer(angle);
    }
});
