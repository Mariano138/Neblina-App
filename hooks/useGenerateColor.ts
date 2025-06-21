export default function useGenerateColor() {
  //Hook que elije un color random para la nota si el usuario no selecciona uno.
  const pastelColors = ['red', 'blue'];
  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  return randomColor;
}
