document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);

function handleKeyPress(event) {
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

  key.classList.toggle("playing"); // On applique la classe CSS pour l'effet visuel

  if (event.type === "keydown") {
    // si on appuie sur la touche, on déclenche le son associé
    playSound(event);
  }
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
}
