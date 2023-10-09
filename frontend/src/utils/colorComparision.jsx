// functiong for calculating sum to red, green and blue of a given color
function sumColor(hexColor) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result
    ? parseInt(result[1], 16) +
        parseInt(result[2], 16) +
        parseInt(result[3], 16)
    : null;
}

// function for comparing colors and give the lightest of them
export default function lightColor(color1, color2) {
  let difference = sumColor(color1) - sumColor(color2);
  if (difference > 0) {
    return color1;
  } else {
    return color2;
  }
}
