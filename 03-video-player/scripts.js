const videoPlayer = document.getElementById("video");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const progressBar = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// functions
const toggleVideoStatus = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
};

const updatePlayIcon = () => {
  if (videoPlayer.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
};

const stopVideo = () => {
  videoPlayer.currentTime = 0;
  videoPlayer.pause();
};

const updatePlayerProgress = () => {
  progressBar.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;

  let mins = Math.floor(videoPlayer.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let seconds = Math.floor(videoPlayer.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + String(seconds);
  }

  timestamp.innerHTML = `${mins}:${seconds}`;
};

const setVideoProgress = () => {
  videoPlayer.currentTime = (+progressBar.value * videoPlayer.duration) / 100;
};

// event listeners
videoPlayer.addEventListener("click", toggleVideoStatus);
videoPlayer.addEventListener("pause", updatePlayIcon);
videoPlayer.addEventListener("play", updatePlayIcon);
videoPlayer.addEventListener("timeupdate", updatePlayerProgress);

playButton.addEventListener("click", toggleVideoStatus);

stopButton.addEventListener("click", stopVideo);

progressBar.addEventListener("change", setVideoProgress);
