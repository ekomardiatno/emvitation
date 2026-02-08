export default function groupDigits(
  input: string,
  groupSize = 3,
  separator = ' ',
): string {
  const digits = input.replace(/\D/g, '');
  const regex = new RegExp(`\\d{1,${groupSize}}`, 'g');
  const grouped = digits.match(regex);
  return grouped ? grouped.join(separator) : '';
}