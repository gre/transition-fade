var GlslTransition = require("glsl-transition");

module.exports = function (canvas) {
  var fade = GlslTransition(canvas)("#ifdef GL_ES\nprecision highp float;\n#endif\nuniform vec2 resolution;uniform sampler2D from, to;uniform float progress;void main() {vec2 p = gl_FragCoord.xy / resolution;gl_FragColor = mix(texture2D(from, p), texture2D(to, p), progress);}");
  return function (from, to, duration, easing) {
    return fade({ from: from, to: to }, duration, easing);
  };
};

