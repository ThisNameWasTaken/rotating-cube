export default class Cube {
  /**
   * @param {HTMLElement} root
   */
  constructor(root) {
    this._root = root;
    this._innerElement = this._root.querySelector(Cube.cssSelectors.inner);
    this._width = this._root.getBoundingClientRect().width;
    this._rotation = {
      x: 0,
      y: 0,
    };
    this._placeFaces();
    this._resetRotation();

    new ResizeObserver(() => {
      this._width = this._root.getBoundingClientRect().width;
      this._placeFaces();
    }).observe(this._root);

    this._innerElement.addEventListener('transitionend', () =>
      this._resetRotation()
    );
  }

  /**
   * @public
   * @param {'left' | 'right' | 'top' | 'bottom' } direction
   */
  roll(direction) {
    switch (direction) {
      case 'left':
        this._rotation.y += 90;
        break;

      case 'right':
        this._rotation.y -= 90;
        break;

      case 'top':
        this._rotation.x -= 90;
        break;

      case 'bottom':
        this._rotation.x += 90;
        break;

      default:
        throw new Error(
          `${direction} is not a valid direction ('left' | 'right' | 'top' | 'bottom')`
        );
    }

    this._rotate();
  }

  /**
   * @private
   */
  _placeFaces() {
    this._root.style.perspective = `${this._width * 2}px`;

    const faceWidth = this._width / 2;
    this._root.querySelector(
      Cube.cssSelectors.frontFace
    ).style.transform = `rotateY(0deg) translateZ(${faceWidth}px)`;

    this._root.querySelector(
      Cube.cssSelectors.rightFace
    ).style.transform = `rotateY(90deg) translateZ(${faceWidth}px)`;

    this._root.querySelector(
      Cube.cssSelectors.backFace
    ).style.transform = `rotateY(180deg) translateZ(${faceWidth}px)`;

    this._root.querySelector(
      Cube.cssSelectors.leftFace
    ).style.transform = `rotateY(-90deg) translateZ(${faceWidth}px)`;

    this._root.querySelector(
      Cube.cssSelectors.topFace
    ).style.transform = `rotateX(90deg) translateZ(${faceWidth}px)`;

    this._root.querySelector(
      Cube.cssSelectors.bottomFace
    ).style.transform = `rotateX(-90deg) translateZ(${faceWidth}px)`;
  }

  /**
   * @private
   */
  _rotate() {
    const faceScale = 3 / 4;
    this._innerElement.style.transform = `scale(${faceScale}) rotateX(${this._rotation.x}deg) rotateY(${this._rotation.y}deg)`;
  }

  /**
   * @private
   * Prevents number overflow by resetting numbers on animation rest
   */
  _resetRotation() {
    this._innerElement.style.transitionDuration = '0s';
    requestAnimationFrame(() => {
      this._rotation.x %= 360;
      this._rotation.y %= 360;
      this._rotate();
      requestAnimationFrame(() => {
        this._innerElement.style.transitionDuration = '';
      });
    });
  }
}

Cube.cssSelectors = {
  root: '.cube',
  inner: '.cube__inner',
  face: '.cube__face',
  frontFace: '.cube__face--front',
  backFace: '.cube__face--back',
  leftFace: '.cube__face--left',
  rightFace: '.cube__face--right',
  topFace: '.cube__face--top',
  bottomFace: '.cube__face--bottom',
};
