const { camelize } = require('@base-cms/inflector');
const { URL, URLSearchParams } = require('url');

const params = [
  // Adjustment
  'bri', // Brightness
  'con', // Contrast
  'exp', // Exposure
  'gam', // Gamma
  'high', // Highlight
  'hue', // Hue
  'invert', // Invert
  'sat', // Saturation
  'shad', // Shadow
  'sharp', // Sharpen
  'usm', // Unsharp Mask
  'usmrad', // Unsharp Mask Radius
  'vib', // Vibrance

  // Automatic
  'auto', // Automatic

  // Blending
  'ba', // Blend Align
  'balph', // Blend Alpha
  'bc', // Blend Crop
  'bf', // Blend Fit
  'bh', // Blend Height
  'blend', // Blend
  'bm', // Blend Mode
  'bp', // Blend Padding
  'bs', // Blend Size
  'bw', // Blend Width
  'bx', // Blend X Position
  'by', // Blend Y Position

  // Border & Padding
  'border-radius-inner', // Inner Border Radius
  'border-radius', // Outher Border Radius
  'border', // Border Size Color
  'pad', // Padding

  // Color Palette
  'colors', // Palette Color Count
  'palette', // Color Palette Extraction
  'prefix', // CSS Prefix

  // Face Detection
  'facebindex', // Face Index
  'facepad', // Face Padding
  'faces', // JSON Face Data

  // Fill
  'bg', // Background Color
  'fill-color', // Fill Color
  'fill-mode', // Fill Mode

  // Focal Point Crop
  'fp-debug', // Focal Point Debug
  'fp-x', // Focal Point X Position
  'fp-y', // Focal Point Y Position
  'fp-z', // Focal Point Zoom

  // Format
  'ch', // Client Hints
  'chromasub', // Chroma Subsampling
  'colorquant', // Color Quantization
  'cs', // Color Space
  'dl', // Download
  'dpi', // Dots Per Inch
  'fm', // Output Format
  'lossless', // Lossless Compression
  'q', // Output Quality

  // Mask Image
  'corner-radius', // Mask Corner Radius
  'mask', // Mask Type
  'maskbg', // Mask Background Color

  // Noise Reduction
  'nr', // Noise Reduction Bound
  'nrs', // Noise Reduction Sharpen

  // PDF
  'page', // PDF Page Number

  // Pixel Density
  'dpr', // Device Pixel Ration

  // Rotation
  'flip', // Flip Axis
  'or', // Orientation
  'rot', // Rotation

  // Size
  'ar', // Aspect Ratio
  'crop', // Crop Mode
  'fit', // Resize Fit Mode
  'h', // Image Height
  'max-h', // Maximum Height
  'max-w', // Maximum Width
  'min-h', // Minimum Height
  'min-w', // Minimum Width
  'rect', // Source Rectangle Region
  'w', // Image Width

  // Stylize
  'blur', // Gaussian Blur
  'duotone-alpha', // Duotone Alpha
  'duotone', // Duotone
  'htn', // Halftone
  'mono', // Monochrome
  'px', // Pixellate
  'sepia', // Sepia Tone

  // Text
  'txt', // Text String
  'txtalign', // Text Align
  'txtclip', // Text Clipping Mode
  'txtclr', // Text Color
  'txtfit', // Text Fit Mode
  'txtfont', // Text Font
  'txtlig', // Text Ligatures
  'txtline', // Text Outline
  'txtlineclr', // Text Outline Color
  'txtpad', // Text Padding
  'txtshad', // Text Shadow
  'txtsize', // Text Font Size
  'txtwidth', // Text Width

  // Trim
  'trim', // Trim Image
  'trimcolor', // Trim Color
  'trimmd', // Trim Mean Difference
  'trimsd', // Trim Standard Deviation
  'trimtol', // Trim Tolerance

  // Watermark
  'mark', // Watermark Image URL
  'markalign', // Watermark Alignment Mode
  'markalpha', // Watermark Alpha
  'markbase', // Watermark Base URL
  'markfit', // Watermark Fit Mode
  'markh', // Watermark Height
  'markpad', // Watermark Padding
  'markscale', // Watermark Scale
  'markw', // Watermark Width
  'markx', // Watermark X Position
  'marky', // Watermark Y Position
];

const coreDefaults = {
  auto: 'format',
  h: 320,
  w: 320,
};

module.exports = (src, selected, defaults, isLogo) => {
  const options = { ...(selected || defaults || coreDefaults) };
  if (isLogo) {
    options.fit = 'fillmax';
    options.fillColor = options.fillColor || 'fff';
    options.pad = options.pad || '5';
  }
  try {
    const url = new URL(src);
    const searchParams = params.sort().reduce((sp, key) => {
      const optVal = options[camelize(key)];
      const searchVal = url.searchParams.get(key);
      const value = optVal || searchVal;
      if (value) sp.append(key, value);
      return sp;
    }, new URLSearchParams());
    url.search = searchParams;
    return url.toString();
  } catch (e) {
    return src;
  }
};
