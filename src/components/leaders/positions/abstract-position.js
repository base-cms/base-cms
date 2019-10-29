class AbstractPosition {
  constructor({ openDirection, calculus } = {}) {
    this.openDirection = openDirection;
    this.calculus = calculus;
  }

  get x() {
    throw new Error(`The ${typeof this} class must implement an 'x' getter.`);
  }

  get y() {
    throw new Error(`The ${typeof this} class must implement a 'y' getter.`);
  }

  get xPx() {
    return `${this.x}px`;
  }

  get yPx() {
    return `${this.y}px`;
  }

  get above() {
    return this.openDirection === 'above';
  }

  get below() {
    return this.openDirection === 'below';
  }

  get left() {
    return this.openDirection === 'left';
  }

  get right() {
    return this.openDirection === 'right';
  }
}

export default AbstractPosition;
