import dayjs from './dayjs';

function returnDateOrSame(valor: any) {
  const data = dayjs(valor, 'DD/MM/YYYY');
  if (data.isValid()) {
    return data.toDate();
  }
  return valor;
}

export default (campo: string, ordem = 1) => {
  return (a: any, b: any) => {
    let result = null;
    let valorA: any = returnDateOrSame(a[campo]);
    let valorB: any = returnDateOrSame(b[campo]);

    if (
      (typeof valorA === 'number' && typeof valorB === 'number') ||
      (valorA instanceof Date && valorB instanceof Date)
    ) {
      result = (valorB as number) - (valorA as number);
      result = result > 0 ? 1 : result < 0 ? -1 : 0;
    } else {
      result = valorB < valorA ? 1 : valorB > valorA ? -1 : 0;
    }
    return result * ordem;
  };
};
