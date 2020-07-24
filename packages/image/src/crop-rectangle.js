class CropRectangle {
  constructor({
    x,
    y,
    width,
    height,
  } = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  isCropped() {
    return !this.notCropped();
  }

  notCropped() {
    return this.x === 0 && this.y === 0;
  }

  toString() {
    return ['x', 'y', 'width', 'height'].map(key => this[key]).join(',');
  }
}

module.exports = ({ width, height, cropDimensions }) => {
  if (!cropDimensions) {
    return new CropRectangle({
      x: 0,
      y: 0,
      width,
      height,
    });
  }
  // @see Cygnus\ApplicationBundle\Apps\Management\Controller::cropImageAction
  const scale = width / 640;
  const {
    x1,
    x2,
    y1,
    y2,
  } = ['x1', 'x2', 'y1', 'y2'].reduce((o, key) => {
    const v = Math.round(cropDimensions[key] * scale);
    return { ...o, [key]: v };
  }, {});

  return new CropRectangle({
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1,
  });
};
