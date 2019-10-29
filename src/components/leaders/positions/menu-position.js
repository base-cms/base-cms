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
      const initial = calcs.link('topNavTop') - calcs.menu('midH');

      // The element will be completely in-view.
      if (this.isYInView) return initial;

      // Either top or bottom will be out-of-view.
      // If top will be out of view, or if the menu height is taller than the viewport,
      // force top positioning.
      if (!this.isTopInView || calcs.menu('h') > calcs.viewport('h')) {
        const linkTop = calcs.link('top');
        const temp = initial - this.topOffset;
        // Link is in-view, return;
        if (linkTop >= 0) return temp;
        // @todo This should do a scroll-to!
        // Link is out of view, prevent menu from "breaking away" from the arrow.
        return temp + linkTop;
      }

      // Allow bottom positioning.
      if (!this.isBottomInView) {
        let temp = initial + this.bottomOffset;
        const linkBottomOffset = calcs.viewport('h') - calcs.link('bottom');
        // @todo This should do a scroll-to!
        // Adjust position if the menu is going to "break away" from the arrow.
        temp = linkBottomOffset > 0 ? temp : temp - linkBottomOffset;
        return temp;
      }
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

  get topOffset() {
    return this.top - this.screenOffset;
  }

  get isTopInView() {
    return this.topOffset > 0;
  }

  get bottomOffset() {
    const { calculus: calcs } = this;
    return calcs.viewport('h') - (this.bottom + this.screenOffset);
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
