import AbstractPosition from './abstract-position';

class MenuPosition extends AbstractPosition {
  constructor({ openDirection, calculus, screenOffset } = {}) {
    super({ openDirection, calculus });
    this.screenOffset = screenOffset || 0;
  }

  get x() {
    const { calculus: calcs } = this;
    if (this.opensAbove || this.opensBelow) return calcs.link('left') + calcs.link('halfW') - calcs.menu('halfW');
    if (this.opensLeft) return calcs.link('left') - calcs.menu('w');
    return calcs.link('right');
  }

  get y() {
    const { calculus: calcs } = this;
    if (this.opensLeft || this.opensRight) {
      // const linkTop = calcs.link('top');
      // const offsetMidH = calcs.menu('midH', { offset: screenOffset });
      // @todo re-eval viewport adjustments
      return calcs.link('topNavTop') - calcs.menu('midH');
      // let y = calcs.link('topNavTop') - calcs.menu('midH');

      // // Return y as-is if completely in view.
      // if (this.isYInView) return y;

      // // Prefer top before bottom
      // if (!this.isTopInView && !this.isBottomInView) {
      //   y += offsetMidH - linkTop;
      //   // Link is in-view, return;
      //   if (linkTop >= 0) return y;
      //   // Link is out of view, prevent menu from "breaking away" from the arrow.
      //   return y + linkTop;
      // }
      // y += window.innerHeight - (offsetMidH + calcs.link('bottom'));
      // return y;
    }
    if (this.opensAbove) return calcs.link('topNavTop') - calcs.menu('h');
    return calcs.link('bottomNavTop');
  }

  get top() {
    const { calculus: calcs } = this;
    if (this.opensLeft || this.opensRight) return calcs.link('middle') - calcs.menu('halfH');
    if (this.opensAbove) return calcs.link('top') - calcs.menu('h');
    if (this.opensBelow) return calcs.link('bottom');
    return 0;
  }

  get bottom() {
    const { calculus: calcs } = this;
    if (this.opensLeft || this.opensRight) return calcs.link('middle') + calcs.menu('halfH');
    if (this.opensAbove) return calcs.link('top');
    if (this.opensBelow) return calcs.link('bottom') + calcs.menu('h');
    return 0;
  }

  get left() {
    const { calculus: calcs } = this;
    if (this.opensLeft) return calcs.link('left') - calcs.menu('w');
    if (this.opensRight) return calcs.link('right');
    if (this.opensAbove || this.opensBelow) return calcs.link('center') - calcs.menu('halfW');
    return 0;
  }

  get right() {
    const { calculus: calcs } = this;
    if (this.opensLeft) return calcs.link('left');
    if (this.opensRight) return calcs.link('right') + calcs.menu('w');
    if (this.opensAbove || this.opensBelow) return calcs.link('center') + calcs.menu('halfW');
    return 0;
  }

  get isTopInView() {
    return this.top - this.screenOffset > 0;
  }

  get isBottomInView() {
    const { calculus: calcs } = this;
    if (this.bottom - this.screenOffset < 0) return false;
    return this.bottom + this.screenOffset < calcs.viewport('h');
  }

  get isYInView() {
    return this.isTopInView && this.isBottomInView;
  }

  get isLeftInView() {
    return this.left - this.screenOffset > 0;
  }

  get isRightInView() {
    const { calculus: calcs } = this;
    return this.right + this.screenOffset < calcs.viewport('w');
  }

  get isXInView() {
    return this.isLeftInView && this.isRightInView;
  }
}

export default MenuPosition;
