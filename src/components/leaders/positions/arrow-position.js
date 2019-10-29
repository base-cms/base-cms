import AbstractPosition from './abstract-position';

class ArrowPosition extends AbstractPosition {
  get x() {
    const { calculus: calcs } = this;
    if (this.above || this.below) return calcs.link('left') + calcs.link('halfW');
    if (this.left) return calcs.link('left');
    return calcs.link('right');
  }

  get y() {
    const { calculus: calcs } = this;
    if (this.left || this.right) return calcs.link('topNavTop') + calcs.link('halfH');
    if (this.above) return calcs.link('topNavTop');
    return calcs.link('bottomNavTop');
  }
}

export default ArrowPosition;
