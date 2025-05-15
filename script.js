const container = document.getElementById("heartContainer");
const musicBtn = document.getElementById("musicToggle");
const ytplayer = document.getElementById("ytplayer");

let isPlaying = true;

// قلب 3D يتفاعل مع حركة الماوس
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30; // زاوية التدوير حول المحور Y
  const y = (e.clientY / window.innerHeight - 0.5) * -30; // زاوية التدوير حول المحور X
  container.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

// زر تشغيل/إيقاف الموسيقى (يوتيوب iframe)
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    // إيقاف الفيديو عبر API
    ytplayer.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
    musicBtn.textContent = "تشغيل الموسيقى";
    isPlaying = false;
  } else {
    ytplayer.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
    musicBtn.textContent = "إيقاف الموسيقى";
    isPlaying = true;
  }
});

// إعداد API لاعب يوتيوب لتلقي الأوامر
window.onYouTubeIframeAPIReady = function () {
  // لا شيء مطلوب هنا لاحتياجاتنا
};
