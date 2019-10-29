import AbstractPosition from './abstract-position';

class MenuPosition extends AbstractPosition {
  constructor({ openDirection, calculus, screenOffset } = {}) {
    super({ openDirection, calculus });
    this.screenOffset = screenOffset || 0;
  }

  get x() {
    const { calculus: calcs } = this;
    if (this.above || this.below) return calcs.link('left') + calcs.link('halfW') - calcs.menu('halfW');
    if (this.left) return calcs.link('left') - calcs.menu('w');
    return calcs.link('right');
  }

  get y() {
    const { calculus: calcs, screenOffset } = this;
    if (this.left || this.right) {
      const linkTop = calcs.link('top');
      let y = calcs.link('topNavTop') - calcs.menu('midH');
      if (this.isInViewTop) return y;
      y += calcs.menu('midH', { offset: screenOffset }) - linkTop;
      // Link is in-view, return;
      if (linkTop >= 0) return y;
      // Link is out of view, prevent menu from "breaking away" from the arrow.
      return y + linkTop;
    }
    if (this.above) return calcs.link('topNavTop') - calcs.menu('h');
    return calcs.link('bottomNavTop');
  }

  get isInViewTop() {
    const { calculus: calcs, screenOffset } = this;
    return calcs.menu('midH', { offset: screenOffset }) < calcs.link('top');
  }
}

export default MenuPosition;
