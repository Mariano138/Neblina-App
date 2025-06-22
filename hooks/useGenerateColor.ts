export default function useGenerateColor() {
  //Hook que elije un color random para la nota si el usuario no selecciona uno.
  const pastelColors = ['#e8d3ef', '#f0bccc', '#ffeee2', '#f7ffe0', '#cbeada'];
  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  return randomColor;
}
