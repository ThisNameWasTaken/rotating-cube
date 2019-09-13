import Cube from './Cube';

document.querySelectorAll('.cube').forEach(element => {
  const cube = new Cube(element);
  setTimeout(
    () => setInterval(() => cube.roll('top'), 5000),
    1000 + Math.random() * 9000
  );
});
