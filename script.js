document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);

let isRecording = false;
let isPlaying = false;
let recordedKeys = [];
let startRecordDate;

function handleKeyPress(event) {
  // console.log(event);

  // Si l'event est declenché en boucle car la personne laisse la touche appuyer, on ne fait rien !
  if (event.repeat) {
    return;
  }

  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);

  // Directement après avoir essayé de récuperer la div associée à une touche, on vérifie
  // si on a bien réussi à avoir une touche
  if (!key) {
    return; // sinon on ne continue pas la fonction
  }

  if (event.type === "keydown") {
    key.classList.toggle("playing");
  }

  if (event.type === "keyup") {
    if (event.keyCode !== 82 && event.keyCode !== 80) {
      key.classList.toggle("playing");
      return;
    }

    if (event.keyCode === 82) {
      // 82 est la touche de record
      triggerRecord();
    }


    if (event.keyCode === 80){
      triggerPlay(key);
    }
  }

  playSound(event);
}

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);

  // Directement après avoir essayé de récuperer l'audio associée à une touche, on vérifie
  // si on a bien réussi à avoir un audio
  if (!audio) {
    return; // sinon on ne continue pas la fonction
  }

  audio.currentTime = 0; // Remet le son au début
  audio.play();

  if (isRecording) {
    recordedKeys.push({
      keyCode: event.keyCode,
      timeCode: Date.now() - startRecordDate,
    });

    // console.log(recordedKeys);
  }
}

function triggerRecord() {
  isRecording = !isRecording;

  if (isRecording) recordedKeys = [];

  startRecordDate = Date.now();
}

function triggerPlay(key) {
  isPlaying = true;
  key.classList.add("playing");
  if (isPlaying) {
    playBeat(recordedKeys).then(() => {
      isPlaying = false;
      key.classList.remove("playing");
    })
  }
}



async function playBeat(recordedKeys) {
  const promises = recordedKeys.map((key) => {
     
    const { keyCode, timeCode} = key;
  
    return simulateKey(keyCode, timeCode)
  });

  console.log(promises);
  

  await Promise.all(promises);
}


function simulateKey(keyCode, timeCode) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const keyDownEvent = new KeyboardEvent("keydown", {keyCode: keyCode});
      document.dispatchEvent(keyDownEvent);

      setTimeout(() => {
        const keyUpEvent = new KeyboardEvent("keyup", {keyCode: keyCode});
        document.dispatchEvent(keyUpEvent);
        resolve();
      }, 300);
    }, timeCode);
  })
}