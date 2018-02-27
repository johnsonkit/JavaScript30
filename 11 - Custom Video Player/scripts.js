const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const rangeSelector = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.player__fullscreen');


function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updateIcon(e) {
    let icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleSkip(e) {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange(e) {
    let input = e.target;
    video[input.name] = input.value;        
}


function handleProgress(e) {
    let percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    video.currentTime = (e.offsetX / video.offsetWidth) * video.duration;
}


function handleFullscreen() {
    video.webkitRequestFullScreen();
}


skipButtons.forEach(skip => {
    skip.addEventListener('click', handleSkip);
})


rangeSelector.forEach(range => {
    let allowSelect = false;

    range.addEventListener('mousedown', () => { allowSelect = true } );
    range.addEventListener('mouseup', () => { allowSelect = false } );
    range.addEventListener('mousemove',  (e) => { allowSelect && handleRange(e) } );
    range.addEventListener('change', (e) => handleRange(e));
})

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', handleProgress);

let allowScrub = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => { allowScrub = true } );
progress.addEventListener('mouseup', () => { allowScrub = false } );
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => { allowScrub && scrub(e) } );

toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', handleFullscreen);