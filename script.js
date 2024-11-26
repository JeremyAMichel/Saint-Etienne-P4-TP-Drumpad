document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);

let isRecording = false;
let recordedKeys = [];
let startRecordDate;

function handleKeyPress(event) {
  console.log(event);

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

    console.log(recordedKeys);
  }
}

function triggerRecord() {
  isRecording = !isRecording;

  if (isRecording) recordedKeys = [];

  startRecordDate = Date.now();
}

// setTimeout(() => {
//   console.log("hello au bout de 2 secondes");

// }, 2000)

// setInterval(() => {
  // const newKeyBoardDownEvent = new KeyboardEvent("keydown", { keyCode: 65 });

  // const newKeyBoardUpEvent = new KeyboardEvent("keyup", { keyCode: 65 });
  // document.dispatchEvent(newKeyBoardDownEvent);

  // setTimeout(() => {
  //   document.dispatchEvent(newKeyBoardUpEvent);
  // }, 300)
  
// }, 2000);

// const newKeyBoardEvent = new KeyboardEvent("keydown", {keyCode: 65 });
// document.dispatchEvent(newKeyBoardEvent);
