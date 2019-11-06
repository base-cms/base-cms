class ElementCalculus {
  constructor({
    content,
    linkRect,
    navRect,
    arrowRect,
  }) {
    this.content = content;
    this.linkRect = linkRect;
    this.navRect = navRect;
    this.arrowRect = arrowRect;
    this.window = window;
    this.props = {
      menu: ['w', 'h', 'halfW', 'halfH', 'midH'],
      link: ['w', 'h', 'halfW', 'halfH', 'top', 'right', 'bottom', 'left', 'middle', 'center', 'topNavTop', 'bottomNavTop'],
      arrow: ['w', 'h'],
      nav: ['top'],
      viewport: ['w', 'h'],
    };
  }

  menu(prop, options) {
    return this.call('menu', prop, options);
  }

  link(prop, options) {
    return this.call('link', prop, options);
  }

  nav(prop, options) {
    return this.call('nav', prop, options);
  }

  arrow(prop, options) {
    return this.call('arrow', prop, options);
  }

  viewport(prop, options) {
    return this.call('viewport', prop, options);
  }

  all() {
    const { keys } = Object;
    return keys(this.props).reduce((o, type) => ({ ...o, [type]: this.allFor(type) }), {});
  }

  allFor(type) {
    return this.props[type].reduce((o, prop) => ({ ...o, [prop]: this.call(type, prop) }), {});
  }

  call(type, prop, { invert = false, offset = 0, px = false } = {}) {
    const method = `${type}${prop.charAt(0).toUpperCase()}${prop.slice(1)}`;
    if (typeof this[method] !== 'function') throw new Error(`No method found for ${method}`);
    const v = this[method]() + offset;
    const value = invert ? v * -1 : v;
    return px ? `${value}px` : value;
  }

  /**
   * Width of the visible viewport.
   */
  viewportW() {
    return this.window.innerWidth;
  }

  /**
   * Height of the visible viewport.
   */
  viewportH() {
    return this.window.innerHeight;
  }

  /**
   * Width of the arrow element.
   */
  arrowW() {
    return this.arrowRect.width;
  }

  /**
   * Height of the arrow element.
   */
  arrowH() {
    return this.arrowRect.height;
  }

  /**
   * Width of dropdown contents.
   */
  menuW() {
    return this.content.offsetWidth;
  }

  /**
   * Height of dropdown contents.
   */
  menuH() {
    return this.content.offsetHeight;
  }

  /**
   * Half-width of dropdown contents.
   */
  menuHalfW() {
    return this.content.offsetWidth / 2;
  }

  /**
   * Half-height of dropdown contents.
   */
  menuHalfH() {
    return this.content.offsetHeight / 2;
  }

  /**
   * The midpoint height of the dropdown contents relative
   * to the center of the nav link
   */
  menuMidH() {
    return this.menu('halfH') - this.link('halfH');
  }

  /**
   * Width of nav link.
   */
  linkW() {
    return this.linkRect.width;
  }

  /**
   * Height of nav link.
   */
  linkH() {
    return this.linkRect.height;
  }

  /**
   * Half-width of nav link.
   */
  linkHalfW() {
    return this.linkRect.width / 2;
  }

  /**
   * Half-height of nav link.
   */
  linkHalfH() {
    return this.linkRect.height / 2;
  }

  /**
   * The top position of the nav link.
   * Will be negative when off screen.
   */
  linkTop() {
    return this.linkRect.top;
  }

  /**
   * The right position of the nav link.
   * Will be positive when off screen.
   */
  linkRight() {
    return this.linkRect.right;
  }

  /**
   * The bottom position of the nav link.
   * Will be positive when off screen.
   */
  linkBottom() {
    return this.linkRect.bottom;
  }

  /**
   * The bottom position of the nav link.
   * Will be negative when off screen.
   */
  linkLeft() {
    return this.linkRect.left;
  }

  /**
   * The middle (y-axis) position of the nav link.
   * Will be negative when off screen.
   */
  linkMiddle() {
    return this.link('top') + this.link('halfH');
  }

  /**
   * The center (x-axis) position of the nav link.
   * Will be negative when off screen.
   */
  linkCenter() {
    return this.link('left') + this.link('halfW');
  }

  /**
   * The distance between the top position of the link
   * and the top position of the nav container.
   */
  linkTopNavTop() {
    return this.link('top') - this.nav('top');
  }

  /**
   * The distance between the bottom position of the link
   * and the top position of the nav container.
   */
  linkBottomNavTop() {
    return this.link('bottom') - this.nav('top');
  }

  /**
   * The top position of the nav container.
   */
  navTop() {
    return this.navRect.top;
  }
}

export default ElementCalculus;
