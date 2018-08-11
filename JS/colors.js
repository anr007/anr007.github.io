function updateGradient() {
  if (void 0 !== $) {
    var o = colors[colorIndices[0]],
      r = colors[colorIndices[1]],
      e = colors[colorIndices[2]],
      t = colors[colorIndices[3]],
      c = 1 - step,
      n =
        "rgb(" +
        Math.round(c * o[0] + step * r[0]) +
        "," +
        Math.round(c * o[1] + step * r[1]) +
        "," +
        Math.round(c * o[2] + step * r[2]) +
        ")",
      s =
        "rgb(" +
        Math.round(c * e[0] + step * t[0]) +
        "," +
        Math.round(c * e[1] + step * t[1]) +
        "," +
        Math.round(c * e[2] + step * t[2]) +
        ")";
    $(".gradient")
      .css({
        background:
          "-webkit-gradient(linear, left top, right top, from(" +
          n +
          "), to(" +
          s +
          "))"
      })
      .css({
        background: "-moz-linear-gradient(left, " + n + " 0%, " + s + " 100%)"
      }),
      (step += gradientSpeed) >= 1 &&
        ((step %= 1),
        (colorIndices[0] = colorIndices[1]),
        (colorIndices[2] = colorIndices[3]),
        (colorIndices[1] =
          (colorIndices[1] +
            Math.floor(1 + Math.random() * (colors.length - 1))) %
          colors.length),
        (colorIndices[3] =
          (colorIndices[3] +
            Math.floor(1 + Math.random() * (colors.length - 1))) %
          colors.length));
  }
}
var colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]
  ),
  step = 0,
  colorIndices = [0, 1, 2, 3],
  gradientSpeed = 0.002;
setInterval(updateGradient, 10);
