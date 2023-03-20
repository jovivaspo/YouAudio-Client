export const calculateTime = (segundos) => {
  if (isNaN(segundos)) {
    return " ";
  }
  const horas = Math.floor(segundos / 3600);
  segundos %= 3600;
  const minutos = Math.floor(segundos / 60);
  segundos %= 60;
  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
};
