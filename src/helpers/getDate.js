import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export const getDate = (date) => {
  const fechaDesde = new Date(date);
  const fechaActual = new Date();
  const diasTranscurridos = differenceInDays(fechaActual, fechaDesde);
  if (diasTranscurridos < 1) {
    return `${diasTranscurridos} días`;
  }
  const semanasTranscurridas = differenceInWeeks(fechaActual, fechaDesde);
  if (semanasTranscurridas < 4) {
    return `${semanasTranscurridas} semanas`;
  }
  const mesesTranscurridos = differenceInMonths(fechaActual, fechaDesde);
  if (mesesTranscurridos < 12) {
    return `${mesesTranscurridos} meses`;
  }
  const aniosTranscurridos = differenceInYears(fechaActual, fechaDesde);
  return `${aniosTranscurridos} años`;
};
