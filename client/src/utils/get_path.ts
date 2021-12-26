function getImagePath(imageId: string) {
  return `/images/${imageId}.avif`;
}

function getMoviePath(movieId: string) {
  return `/movies/${movieId}.webm`;
}

function getSoundPath(soundId: string) {
  return `/sounds/${soundId}.aac`;
}

function getSoundSvgPath(soundId: string) {
  return `/sounds/${soundId}.svg`;
}

function getProfileImagePath(profileImageId: string) {
  return `/images/profiles/${profileImageId}.avif`;
}

export { getImagePath, getMoviePath, getSoundPath, getSoundSvgPath, getProfileImagePath };
