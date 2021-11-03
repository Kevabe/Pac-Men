const pacmanImages = {
    rightOpen: 'PacMan1.png',
    rightClosed: 'PacMan2.png',
    leftOpen: 'PacMan3.png',
    leftClosed: 'PacMan4.png',
}

const pacmen = [];

function setRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}

function makePacman() {
    const velocity = setRandom(10)
    const position = setRandom(200);

    let element = document.createElement('img');
    element.style.position = 'absolute';
    element.src = pacmanImages.rightOpen;
    element.style.width = 100;
    element.style.left = position.x;
    element.style.top = position.y;
    

    const game = document.getElementById('game');
    game.appendChild(element);

    pacmen.push({
        position,
        velocity,
        element,
    });
}

function deletePacman() {
    const pacman = pacmen.shift();

    if (pacman) {
        const game = document.getElementById('game');
        game.removeChild(pacman.element);

    }
}

function checkCollisions(pacman) {
    const xMax = window.innerWidth;
    const xMin = 0;

    const yMax = window.innerHeight;
    const yMin = 0;

    const currentX = pacman.position.x + pacman.velocity.x;
    const currentY = pacman.position.y + pacman.velocity.y;

    if(currentX + pacman.element.width > xMax) {
        pacman.velocity.x = -pacman.velocity.x;
        pacman.element.src = pacmanImages.leftOpen;
    }

    if(currentX < xMin) {
        pacman.velocity.x = -pacman.velocity.x;
        pacman.element.src = pacmanImages.rightOpen;
    }

    if(currentY + pacman.element.height > yMax) {
        pacman.velocity.y = -pacman.velocity.y;
    }

    if(currentY < yMin) {
        pacman.velocity.y = -pacman.velocity.y;
    }
}

function update() {
  for (const pacman of pacmen) {
    checkCollisions(pacman);
    pacman.position.x += pacman.velocity.x;
    pacman.position.y += pacman.velocity.y;

    pacman.element.style.left = pacman.position.x + 'px';
    pacman.element.style.top = pacman.position.y + 'px';

    if (pacman.element.src.includes(pacmanImages.rightOpen)) { 
        pacman.element.src = pacmanImages.rightClosed;
    } else if (pacman.element.src.includes(pacmanImages.rightClosed)) {
        pacman.element.src = pacmanImages.rightOpen;
    }

    if (pacman.element.src.includes(pacmanImages.leftOpen)) {
        pacman.element.src = pacmanImages.leftClosed;
    } else if (pacman.element.src.includes(pacmanImages.leftClosed)) {
        pacman.element.src = pacmanImages.leftOpen;
    }
  }
}

setInterval(update, 100);