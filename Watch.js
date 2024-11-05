let startTime, timerInterval;
let elapsedTime = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timerDisplay');
const startPauseBtn = document.getElementById('startPauseBtn');
const splitBtn = document.getElementById('splitBtn');
const resetBtn = document.getElementById('resetBtn');
const splits = document.getElementById('splits');
const history = document.getElementById('history'); 

function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  const hours = Math.floor(currentTime / 3600000);
  const minutes = Math.floor((currentTime % 3600000) / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const tenths = Math.floor((currentTime % 1000) / 100);
  
  timerDisplay.textContent = 
    `${hours.toString().padStart(2, '0')}:` +
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}.` +
    tenths;
}

function startPauseTimer() {
    if (isRunning) {
      clearInterval(timerInterval);
      elapsedTime += Date.now() - startTime;
      startPauseBtn.textContent = 'Start';
      startPauseBtn.classList.remove('pause-color');
      startPauseBtn.classList.add('start-color'); 
      splitBtn.disabled = true;
      resetBtn.disabled = false;
  
      const pauseRecord = document.createElement('div');
      pauseRecord.textContent = `Paused at: ${timerDisplay.textContent}`;
      pauseRecord.classList.add('history-item', 'pause-record');
      history.appendChild(pauseRecord);
    } else {
      startTime = Date.now();
      timerInterval = setInterval(updateDisplay, 100);
      startPauseBtn.textContent = 'Pause';
      startPauseBtn.classList.remove('start-color');
      startPauseBtn.classList.add('pause-color'); 
      splitBtn.disabled = false;
      resetBtn.disabled = false;
    }
    isRunning = !isRunning;
  }
  

function splitTime() {
  const time = timerDisplay.textContent;
  const splitItem = document.createElement('div');
  splitItem.classList.add('split-item');
  splitItem.textContent = `Split: ${time}`;
  splits.appendChild(splitItem);

  const splitRecord = document.createElement('div');
  splitRecord.textContent = `Split at: ${time}`;
  splitRecord.classList.add('history-item', 'split-record');
  history.appendChild(splitRecord);
  

}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  startPauseBtn.textContent = 'Start';
  startPauseBtn.classList.remove('pause-color');
  startPauseBtn.classList.add('start-color');
  splitBtn.disabled = true;
  resetBtn.disabled = true;
  splits.innerHTML = ''; 
  timerDisplay.textContent = '00:00:00.0';
}

startPauseBtn.addEventListener('click', startPauseTimer);
splitBtn.addEventListener('click', splitTime);
resetBtn.addEventListener('click', resetTimer);
