export default function setBodyColor({ color }) {
  document.documentElement.style.setProperty('--color-darkest', color);
}
