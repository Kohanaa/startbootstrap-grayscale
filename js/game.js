function Game(stageId) {
  this.stage = document.getElementById(stageId);
}

function intersect(object, target, radius) {
  if (Math.abs(target.x - object.x) < radius) {
    return true;
  }
  return false
}