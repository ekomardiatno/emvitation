export default function phoneNumberDisplayFormat(
  phone: string,
  groupSize = 4,
): string {
  if (!phone) {
    return '';
  }
  const digits = phone.replace(/\D/g, '');

  return digits.match(new RegExp(`.{1,${groupSize}}`, 'g'))!.join(' ');
}
