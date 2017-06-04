const Jimp = require('jimp');

/**
 * target: {
 *   format: string
 * }
 *
 * Format is parsed and expected to be a mime type.
 * e.g. "image/jpeg"
 */

function output(image, target, callback) {
  const jimpImage = new Jimp(image.length, image[0].length);
  for (var l = 0; l != image.length; ++l) {
    for (var L = 0; L != image[0].length; ++L) {
      const pixel = image[l][L];

      // Fixme, don't want to hardcode alpha
      const hex = Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, 255);
      jimpImage.setPixelColor(hex, l, L);
    }
  }

  Jimp.getBase64(target.format, function (err, result) {
    callback(err, result);
  });
}

/**
 * Idea here is to accept an arbitrary image and then create a base 64
 * string which could be submitted to core for resizing.  The output
 * of that can be given to adaptors again to produce a real image.
 * The output format is a "data URI" defined as:
 * data:[<mime type>][;charset=<charset>][;base64],<encoded data>
 * e.g.
 * data:image/jpeg;base64,<data>
 */
function input(image, callback) {
  return undefined;
}

module.exports = {
  output: output,
  input: input
};
