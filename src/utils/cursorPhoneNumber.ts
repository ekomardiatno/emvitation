export default function censorPhoneNumber(
  phone: string,
  visibleStart = 4,
  visibleEnd = 2,
  groupSize = 4,
): string {
  if (phone.startsWith('62')) {
    phone = '0' + phone.slice(2);
  }

  if (phone.startsWith('+62')) {
    phone = '0' + phone.slice(3);
  }

  if (!phone.startsWith('0')) {
    phone = '0' + phone;
  }

  const digits = phone.replace(/\D/g, '');

  if (digits.length <= visibleStart + visibleEnd) {
    return digits;
  }

  const start = digits.slice(0, visibleStart);
  const end = digits.slice(-visibleEnd);
  const maskedLength = digits.length - visibleStart - visibleEnd;

  const masked = '*'.repeat(maskedLength);

  const combined = start + masked + end;

  return combined.match(new RegExp(`.{1,${groupSize}}`, 'g'))!.join(' ');
}
