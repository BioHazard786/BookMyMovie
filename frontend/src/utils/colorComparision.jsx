function sumColor(hexColor) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result
    ? parseInt(result[1], 16) +
        parseInt(result[2], 16) +
        parseInt(result[3], 16)
    : null;
}

export default function lightColor(color1, color2) {
  let difference = sumColor(color1) - sumColor(color2);
  if (difference > 0) {
    return color1;
  } else {
    return color2;
  }
}
