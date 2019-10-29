class AbstractPosition {
  constructor({ openDirection, calculus } = {}) {
    this.openDirection = openDirection;
    this.calculus = calculus;
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
