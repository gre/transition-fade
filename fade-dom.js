var Q = require("q");
var Zanimo = require("zanimo");

module.exports = function (container) {
  if (container.style.position !== "absolute")
    container.style.position = "relative";
  container.style.overflow = "hidden";
  container.style.backgroundColor = "#000";
  container.innerHTML = "";

  function addImage (img) {
    var old = {
      position: img.style.position,
      top: img.style.top,
      left: img.style.left,
      opacity: img.style.opacity
    };
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    container.appendChild(img);
    return old;
  }

  function removeImage (img, restore) {
    for (var k in restore) {
      img.style[k] = restore[k];
    }
    container.removeChild(img);
  }

  return function (from, to, duration, easing) {
    var previousFrom = addImage(from);
    var previousTo = addImage(to);
    var cssEasing = easing && (typeof easing==="string" ? easing : easing.toCSS && easing.toCSS()) || "linear";
    var p = Q.all([
      Zanimo(from, "opacity", 1),
      Zanimo(to, "opacity", 0)
    ])
    .then(function(){
      return Q.all([
        Zanimo(from, "opacity", 0, duration, cssEasing),
        Zanimo(to, "opacity", 1, duration, cssEasing)
      ]);
    });
    p.done(function(){
      removeImage(from, previousFrom);
      removeImage(to, previousTo);
    });
    return p;
  };
};
