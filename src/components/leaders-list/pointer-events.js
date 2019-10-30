export default () => (window.PointerEvent ? {
  end: 'pointerup',
  enter: 'pointerenter',
  leave: 'pointerleave',
} : {
  end: 'touchend',
  enter: 'mouseenter',
  leave: 'mouseleave',
});
