function Base(id, game, x, y) {
  var stageEl = game.stage;
  var el = document.createElement('div');
  el.setAttribute('id', id);
  el.setAttribute('class', 'base');
  stageEl.appendChild(el);
  this.x = x;
  this.y = y;
  this.draw = function() {

    el.style.left = this.x + 'px';
    el.style.top = this.y + 'px';
  }
  this.draw();
}

function Tower(id, game, x, y) {
  var stageEl = game.stage;
  var el = document.createElement('div');
  el.setAttribute('id', id);
  el.setAttribute('class', 'tower');
  stageEl.appendChild(el);
  this.radius = 100;
  this.x = x;
  this.y = y;
  this.attack = function(monster) {
    monster.destroy();
  }
  this.draw = function() {

    el.style.left = this.x + 'px';
    el.style.top = this.y + 'px';
  }
  this.draw();
}