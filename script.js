document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('heart');
    const layers = 36;
    const heartSize = 120;
    const pulseSpeed = 3;
    
    function createHeartLayer(angle, index) {
        // الخط السفلي
        const bottomLine = document.createElement('div');
        bottomLine.className = 'heart-line';
        bottomLine.style.width = `${heartSize}px`;
        bottomLine.style.height = '3px';
        bottomLine.style.transform = `
            rotateY(${angle}rad)
            translateZ(${heartSize}px)
        `;
        bottomLine.style.animation = `pulse ${pulseSpeed}s infinite ${index * 0.05}s`;
        
        // الجانب الأيسر
        const leftCurve = document.createElement('div');
        leftCurve.className = 'heart-line';
        leftCurve.style.width = '3px';
        leftCurve.style.height = `${heartSize * 0.8}px`;
        leftCurve.style.transform = `
            rotateY(${angle}rad)
            rotateZ(-0.8rad)
            translateX(${heartSize/2}px)
            translateY(-${heartSize/3}px)
            translateZ(${heartSize}px)
        `;
        leftCurve.style.animation = `pulse ${pulseSpeed}s infinite ${index * 0.05 + 0.2}s`;
        
        // الجانب الأيمن
        const rightCurve = document.createElement('div');
        rightCurve.className = 'heart-line';
        rightCurve.style.width = '3px';
        rightCurve.style.height = `${heartSize * 0.8}px`;
        rightCurve.style.transform = `
            rotateY(${angle}rad)
            rotateZ(0.8rad)
            translateX(-${heartSize/2}px)
            translateY(-${heartSize/3}px)
            translateZ(${heartSize}px)
        `;
        rightCurve.style.animation = `pulse ${pulseSpeed}s infinite ${index * 0.05 + 0.4}s`;
        
        container.appendChild(bottomLine);
        container.appendChild(leftCurve);
        container.appendChild(rightCurve);
    }

    for (let i = 0; i < layers; i++) {
        const angle = (i / layers) * Math.PI * 2;
        createHeartLayer(angle, i);
    }
});
