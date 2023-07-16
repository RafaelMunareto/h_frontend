export function formatCgc(value: string | number): string {
  return String(value).padStart(4, '0');
}

export function padString(
  value: string | number,
  size: number,
  character = '0'
) {
  return String(value).padStart(size, character);
}

export function formatMaskCpf(
  value: string | number,
  mascarar = false
): string {
  if (!value) return '';

  const cpf = padString(String(value).replace(/\D/g, ''), 11) // Substitui caracteres não numericos por vazio
    .replace(/(\d{3})(\d)/, '$1.$2') // Captura grupos de 3 numeros e adiciona o ponto
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // Captura dois numeros após um traço (-) e impede a inserção de novos números

  if (mascarar) {
    return cpf.replace(/(\d{3}\.)(\d{3})(\..*$)/, '***.***$3'); // Mascara bloco do meio de numeros
  }

  return cpf;
}

export function formatCep(value: string | number) {
  if (!value) return;
  value = padString(value, 8, '0');
  return `${value.substring(0, 2)}.${value.substring(2, 5)}-${value.substring(
    5
  )}`;
}

export function formatTelefone(value: string | number) {
  value = String(value);
  return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(
    7
  )}`;
}

export function stripNotNumber(value: string) {
  return (value || '').replace(/\D/g, '');
}

export const PATTERN_DATE_DD_MM_YYYY =
  '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/(2[0-9]{3})$';
export const PATTERN_TIME_HH_MM = '^([01][0-9]|2[0-3]):[0-5][0-9]$';
