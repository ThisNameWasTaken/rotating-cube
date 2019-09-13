import Cube from './Cube';

const cube = new Cube(document.querySelector('.cube'));
setInterval(() => cube.roll('left'), 2000);
