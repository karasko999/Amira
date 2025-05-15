let player;
const musicBtn = document.getElementById("musicToggle");
let isPlaying = true;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "1",
    width: "1",
    videoId: "NRlNvauSHyY", // ID تاع الفيديو
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: "NRlNvauSHyY",
      controls: 0,
      mute: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      rel: 0,
    },
    events: {
      onReady: (event) => {
        event.target.playVideo();
      }
    }
  });
}

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    player.pauseVideo();
    musicBtn.textContent = "تشغيل الموسيقى";
    isPlaying = false;
  } else {
    player.playVideo();
    musicBtn.textContent = "إيقاف الموسيقى";
    isPlaying = true;
  }
});
