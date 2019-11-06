import AbstractPosition from './abstract-position';

class MenuPosition extends AbstractPosition {
  constructor({
    openDirection,
    calculus,
    offsetTop,
    offsetBottom,
  } = {}) {
    super({ openDirection, calculus });
    this.offsetTop = offsetTop || 0;
    this.offsetBottom = offsetBottom || 0;
  }

  get x() {
    const { calculus: calcs } = this;
    const { pageXOffset } = window;
    if (this.opensAbove || this.opensBelow) return pageXOffset + calcs.link('left') + calcs.link('halfW') - calcs.menu('halfW');
    if (this.opensLeft) return pageXOffset + calcs.link('left') - calcs.arrow('w') - calcs.menu('w');
    return pageXOffset + calcs.link('right') + calcs.arrow('w');
  }

  get y() {
    const { calculus: calcs } = this;
    if (this.opensLeft || this.opensRight) {
      const initial = calcs.link('top') + window.pageYOffset - calcs.menu('midH');

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
    if (this.opensAbove) return calcs.link('top') + window.pageYOffset - calcs.menu('h') - calcs.arrow('h');
    return calcs.link('bottom') + window.pageYOffset + calcs.arrow('h');
  }

  get top() {
    const { calculus: calcs } = this;
    if (this.opensLeft || this.opensRight) return calcs.link('top') - calcs.menu('midH');
    if (this.opensAbove) return calcs.link('top') - calcs.menu('h');
    if (this.opensBelow) return calcs.link('bottom');
    return 0;
  }

  get bottom() {
    const { calculus: calcs } = this;
    if (this.opensLeft || this.opensRight) return calcs.link('bottom') + calcs.menu('midH');
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
    return this.top - this.offsetTop;
  }

  get isTopInView() {
    return this.topOffset > 0;
  }

  get bottomOffset() {
    const { calculus: calcs } = this;
    return calcs.viewport('h') - this.bottom - this.offsetBottom;
  }

  get isBottomInView() {
    return this.bottomOffset > 0;
  }

  get isYInView() {
    return this.isTopInView && this.isBottomInView;
  }

  get isLeftInView() {
    return this.left > 0;
  }

  get isRightInView() {
    const { calculus: calcs } = this;
    return this.right < calcs.viewport('w');
  }

  get isXInView() {
    return this.isLeftInView && this.isRightInView;
  }
}

export default MenuPosition;
