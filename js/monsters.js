function Monster(id, game, x, y, speed) {
  var stageEl = game.stage;
  var me = this;
  var el = document.createElement('div');
  el.setAttribute('id', id);
  el.setAttribute('class', 'monster');
  stageEl.appendChild(el);
  this.x = x;
  this.y = y;
  this.speed = speed || 10;
  this.moveToObject = function(targetObject) {
    var deltaX = targetObject.x - me.x;
    var deltaY = targetObject.y - me.y;
    if (deltaX < 0) {
      me.x -= me.speed;
    } else {
      me.x += me.speed;
    }
    if (deltaY < 0) {
      me.y -= me.speed;
    } else {
      me.y += me.speed;
    }
  }
  this.destroy = function() {
    el.setAttribute("class", "fired");
    setTimeout(function() {
      stageEl.removeChild(el);
    }, 1000)
  }
  this.draw = function() {

    el.style.left = this.x + 'px';
    el.style.top = this.y + 'px';
  }
  this.draw();
}

/** КЛАСС ОРКА */
function Ork(id, game, x, y) {
  // находим элемент на странице и сохраняем
  var stageEl = game.stage;
  var me = this;
  var el = document.createElement('div');
  el.setAttribute('id', id);
  el.setAttribute('class', 'ork');
  stageEl.appendChild(el);
  
  // сохраняем переменную this под другим названием,
  // чтобы обращаться в других функциях
  var me = this;

  // константы для положений орка (по аналогии с прежней переменной frameY)
  const RIGHT = 1;
  const LEFT = 3;
  const DOWN = 2;
  const UP = 0;
  
  // коды клавиш, соответствующие направлению орка
  this.keys = {
    'ArrowRight': RIGHT,
    'ArrowLeft': LEFT,
    'ArrowUp': UP,
    'ArrowDown': DOWN,
  }

  // по умолчанию орк смотрит вправо
  var direction = RIGHT;
  // количество пикселей на один шаг
  var movePx = 10; 
  
  // координаты
  this.x = x;
  this.y = y;
  
  // изначально нет цели, куда идти
  var target = null;
  
  // функция установки цели
  this.setTarget = function(targetBuilding) {
    target = {
      x: Math.round(targetBuilding.x / 10) * 10,
      y: targetBuilding.y
    }
  }
  
  // функция поворота орка
  this.turn = function(nextDirection) {
    direction = nextDirection;
  }

  // функция движения орка
  this.move = function() {
    // если есть цель, то она может изменить направление орка
    if(target) {
      if(target.x > me.x) {
        direction = RIGHT;
      } else if (target.x < me.x) {
        direction = LEFT;
      } else { // если по x мы уже на уровне цели, то меняем направление по y
        if(target.y > me.y) {
          direction = DOWN;
        } else {
          direction = UP;
        }
        // здесь мы уже идём по прямой к цели, а значит цель можно сбросить
        target = null;
      }
    }
  
    switch(direction) {
      case RIGHT:
        me.x += movePx;
        break;
      case LEFT:
        me.x -= movePx;
        break;
      case UP:
        me.y -= movePx;
        break;
       case DOWN:
         me.y += movePx;
        break;
    }
  }

  /** ОТРИСОВКА */

  var frame = 0;
  var step = 0;

  // переключаемся на следующий шаг (другой фрейм по горизонтали)
  function nextFrame() {
    step += 1
    if (step == 4) {
      step = 0;
    }
    frame = step;
    if (step == 3) {
      frame = 1;
    }
  }

  this.draw = function() {
    // делаем шаг
    nextFrame();
    // отрисовываем орка
    el.style.backgroundPosition = -frame * 48 + 'px  -' + direction * 64 + 'px';
    el.style.left = me.x + 'px';
    el.style.top = me.y + 'px';
  }
  me.draw();
}