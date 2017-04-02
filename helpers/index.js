function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function shadeColor(color, luminosity) {
  if (color[0] === 'r') {
    const rgbColor = color.substring(color.indexOf('(') + 1, color.length - 1).split(',');
    color = rgbToHex(parseInt(rgbColor[0]), parseInt(rgbColor[1]), parseInt(rgbColor[2]));
  }
  // validate hex string
  color = new String(color).replace(/[^0-9a-f]/gi, '');
  if (color.length < 6) {
    color = color[0]+ color[0]+ color[1]+ color[1]+ color[2]+ color[2];
  }
  luminosity = luminosity || 0;

  let newColor = "#", c, i, black = 0, white = 255;
  for (i = 0; i < 3; i++) {
    c = parseInt(color.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(black, c + (luminosity * white)), white)).toString(16);
    newColor += ("00"+c).substr(c.length);
  }
  return newColor; 
}

export {
  shadeColor
}
