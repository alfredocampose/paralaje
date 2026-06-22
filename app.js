const narration = document.querySelector('#narration');
const music = document.querySelector('#music');
const playButton = document.querySelector('#playButton');
const restartButton = document.querySelector('#restartButton');
const playIcon = document.querySelector('#playIcon');
const playLabel = document.querySelector('#playLabel');
const musicVolume = document.querySelector('#musicVolume');
const status = document.querySelector('#status');

let playing = false;

music.volume = Number(musicVolume.value);
narration.volume = 1;

function updatePlayer(isPlaying) {
  playing = isPlaying;
  playButton.setAttribute('aria-pressed', String(isPlaying));
  playIcon.textContent = isPlaying ? 'Ⅱ' : '▶';
  playLabel.textContent = isPlaying ? 'Pausar' : 'Escuchar';
  status.classList.remove('error');
  status.textContent = isPlaying
    ? 'Reproduciendo semblanza y música.'
    : 'Audio en pausa.';
}

function showAudioError() {
  updatePlayer(false);
  status.classList.add('error');
  status.textContent = 'No se encontraron los audios. Revisa los archivos de la carpeta assets.';
}

async function playExperience() {
  try {
    const results = await Promise.allSettled([narration.play(), music.play()]);
    if (results.some((result) => result.status === 'rejected')) {
      narration.pause();
      music.pause();
      showAudioError();
      return;
    }
    updatePlayer(true);
  } catch (error) {
    showAudioError();
  }
}

function pauseExperience() {
  narration.pause();
  music.pause();
  updatePlayer(false);
}

playButton.addEventListener('click', () => {
  if (playing) {
    pauseExperience();
  } else {
    playExperience();
  }
});

restartButton.addEventListener('click', () => {
  narration.currentTime = 0;
  music.currentTime = 0;
  playExperience();
});

musicVolume.addEventListener('input', (event) => {
  music.volume = Number(event.target.value);
});

narration.addEventListener('ended', () => {
  music.pause();
  music.currentTime = 0;
  updatePlayer(false);
  status.textContent = 'La semblanza ha terminado.';
});

window.addEventListener('pagehide', pauseExperience);
