import AbstractPosition from './abstract-position';

class ArrowPosition extends AbstractPosition {
  get x() {
    const { calculus: calcs } = this;
    const { pageXOffset } = window;
    if (this.opensAbove || this.opensBelow) return pageXOffset + calcs.link('left') + calcs.link('halfW');
    if (this.opensLeft) return pageXOffset + calcs.link('left') - calcs.arrow('w');
    return pageXOffset + calcs.link('right') + calcs.arrow('w');
  }

  get y() {
    const { calculus: calcs } = this;
    const { pageYOffset } = window;
    if (this.opensLeft || this.opensRight) return pageYOffset + calcs.link('top') + calcs.link('halfH');
    if (this.opensAbove) return pageYOffset + calcs.link('top') - calcs.arrow('h');
    return pageYOffset + calcs.link('bottom') + calcs.arrow('h');
  }
}

export default ArrowPosition;
