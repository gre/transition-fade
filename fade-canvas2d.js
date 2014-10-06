var Q = require("q");
var requestAnimationFrame = require("raf");
var now = require("performance-now");

module.exports = function (canvas) {
  var ctx = canvas.getContext("2d");
  var animationDefer = null;

  function draw (from, to, p) {
    canvas.width = canvas.width;
    ctx.drawImage(from, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = p;
    ctx.drawImage(to, 0, 0, canvas.width, canvas.height);
  }

  return function fadeCanvas2D (from, to, duration, easing) {
    var start = now();
    var d = Q.defer();
    animationDefer = d;
    (function render () {
      if (animationDefer !== d) return;
      var p = Math.min((now() - start) / duration, 1);
      if (p < 1) {
        requestAnimationFrame(render);
      }
      else {
        d.resolve(canvas);
        animationDefer = null;
      }
      draw(from, to, easing(p));
    }());
    return d.promise;
  };
};
