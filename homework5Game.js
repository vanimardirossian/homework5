const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const backgroundImage = new Image();
backgroundImage.src = 'https://images3.alphacoders.com/689/689585.jpg';

const neilTyson = new Image();
neilTyson.src = 'http://i.imgur.com/I7BxUym.png';

const flatEarthers = new Image();
flatEarthers.src = 'https://i.imgur.com/CQ7cI57.png';

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};

const badGuys = [];

const createPoints = function(count, canvasWidth, canvasHeight) {
  if (count === 0) {
    return badGuys;
  }

  const points = {
    image: flatEarthers,
    x: rand(canvasWidth-250),
    y: rand(canvasHeight-50),
    width: 250,
    height: 50,
    xDelta: 1,
    yDelta: 1,
  };

  badGuys[badGuys.length] = points;
  createPoints(count-1, canvasWidth, canvasHeight);
};

createPoints(7, canvas.width, canvas.height);


const floor = canvas.height-300;
const maxJump = floor-200;
const nTyson = {
    image: neilTyson,
    x: 10,
    y: floor,
    width: 200,
    height: 250,
    xDelta: 15,
    yDelta: 0
};


const draw = function() {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  context.drawImage(nTyson.image, nTyson.x, nTyson.y, nTyson.width, nTyson.height);

  const helper = function(arr, index) {
    if(index === badGuys.length) {
      return;
    }
    context.drawImage(badGuys[index].image, badGuys[index].x, badGuys[index].y, badGuys[index].width, badGuys[index].height);
    helper(arr, index+1);
  };
  helper(badGuys, 0);
};


const updateData = function() {
  if (nTyson.yDelta !== 0) {
    nTyson.y = nTyson.y - nTyson.yDelta;
    if (nTyson.y < maxJump) {
      nTyson.yDelta = -nTyson.yDelta;
    } else if (nTyson.y >= floor) {
      nTyson.y = floor,
      nTyson.yDelta = 0;
    }
  }

  const helper = function(arr, index) {
    if(index === badGuys.length) {
      return;
    }
    badGuys[index].x += badGuys[index].xDelta;
    badGuys[index].y += badGuys[index].yDelta;
    if(badGuys[index].x >= canvas.width-badGuys[index].width || badGuys[index].x <= 0) {
      badGuys[index].xDelta = -badGuys[index].xDelta;
    }
    if(badGuys[index].y >= canvas.height-badGuys[index].height || badGuys[index].y <= 0) {
      badGuys[index].yDelta = -badGuys[index].yDelta;
    }
    if (nTyson.yDelta < 0 && nTyson.y === badGuys[index].y + badGuys[index].height && nTyson.x + nTyson.width >= badGuys[index].x && badGuys[index].x + badGuys[index].width >= nTyson.x) {
      alert('You Cannot Escape The Flat Earthers, Loser!');
    }
    if (nTyson.yDelta > 0 && nTyson.y + nTyson.height === badGuys[index].y && nTyson.x + nTyson.width >= badGuys[index].x && badGuys[index].x + badGuys[index].width >= nTyson.x) {
      alert('You Cannot Escape The Flat Earthers, Loser!');
    }
    if (nTyson.yDelta === 0 && nTyson.y + nTyson.height >= badGuys[index].y && nTyson.y <= badGuys[index].y + badGuys[index].height && nTyson.x + nTyson.width >= badGuys[index].x && badGuys[index].x + badGuys[index].width >= nTyson.x) {
        alert('You Cannot Escape The Flat Earthers, Loser!');
    }
    helper(arr, index+1);
  };
  helper(badGuys, 0);
};

const loop = function() {
  draw();
  updateData();

  requestAnimationFrame(loop);
};

loop();

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event) {
	if(event.keyCode === rightKey) {
    nTyson.x = nTyson.x + nTyson.xDelta;
    if (nTyson.x >= canvas.width) {
      nTyson.x = -nTyson.width;
    }
  } else if (event.keyCode === leftKey) {
    nTyson.x = nTyson.x - nTyson.xDelta;
    if (nTyson.x <= -nTyson.width) {
      nTyson.x = canvas.width;
    }
  } else if (event.keyCode === upKey) {
    if (nTyson.yDelta === 0) {
      nTyson.yDelta = 5;
    }
  }
}, false);
