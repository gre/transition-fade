var fadeCanvas2D = require("./fade-canvas2d");
var fadeWebGL = require("./fade-webgl");
var fadeDOM = require("./fade-dom");

function linear (x) { return x; }

function wrap (constructor) {
  return function (elt) {
    var t = constructor(elt);
    return function (from, to, duration, easing) {
      return t(from, to, duration, easing || linear);
    };
  };
}

var Module = module.exports = {
  DOM: wrap(fadeDOM),
  Canvas2D: wrap(fadeCanvas2D),
  WebGL: wrap(fadeWebGL),
  Canvas: function (canvas) {
    // Auto Detect what to use
    if (!!window.WebGLRenderingContext)
      return Module.WebGL(canvas);
    else
      return Module.Canvas2D(canvas);
  }
};
