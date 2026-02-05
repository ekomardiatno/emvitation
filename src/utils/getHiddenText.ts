export default function getHiddenText(length = 6) {
  const hiddenText = [];
  for (let i = 0; i < length - 1; i++) {
    hiddenText.push('•');
  }

  return hiddenText.join(' ');
}
