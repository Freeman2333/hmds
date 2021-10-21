export const hexToRgb = (hex) => {
  if(!hex) return null;

  const preparedHex = hex.startsWith('#') ? hex.substring(1) : hex;
  const r = parseInt(preparedHex.substring(0, 2), 16);
  const g = parseInt(preparedHex.substring(2, 4), 16);
  const b = parseInt(preparedHex.substring(4, 6), 16);

  return [r, g, b];
}

export const rgbToHex = (rgb) => {
  if(!rgb || rgb.length !== 3) return;

  const hexValues = [];
  for(let i = 0; i < 3; i++) {
    const val = rgb[i].toString(16);
    if(val.length === 1) {
      hexValues.push('0' + val);
      continue;
    }

    hexValues.push(val);
  }
  
  return '#' + hexValues.join('');
}

export const linearInterplotion = (from, to, amount) => {
  return 1/(to-from) * (amount - from);
}

export const interpolateColor = (from, to, target, hex1, hex2) => {
  const lerp = linearInterplotion(from, to, target);

  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const rgbResult = [];

  for(let i = 0; i < 3; i++) {
    rgbResult.push(Math.ceil(lerp * (rgb1[i] - rgb2[i]) + rgb2[i]));
  }

  return rgbToHex(rgbResult);
}