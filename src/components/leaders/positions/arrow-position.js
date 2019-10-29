import AbstractPosition from './abstract-position';

class ArrowPosition extends AbstractPosition {
  get x() {
    const { calculus: calcs } = this;
    if (this.opensAbove || this.opensBelow) return calcs.link('left') + calcs.link('halfW');
    if (this.opensLeft) return calcs.link('left');
    return calcs.link('right');
  }

  get y() {
    const { calculus: calcs } = this;
    if (this.opensLeft || this.opensRight) return calcs.link('topNavTop') + calcs.link('halfH');
    if (this.opensAbove) return calcs.link('topNavTop');
    return calcs.link('bottomNavTop');
  }
}

export default ArrowPosition;
