/**
 * Clean up addresses returned by Google Geocoding/Places API.
 *
 * Removes:
 * - Plus codes (e.g. "QFCG+JM2, ")
 * - Country name (", Indonesia")
 * - Postal codes (5-digit)
 * - City/regency (Kota/Kabupaten) and province names
 * - Keeps sub-district (Kecamatan) for locality context
 */
export default function cleanAddress(address: string): string {
  let cleaned = address
    .replace(/^[A-Z0-9]{2,8}\+[A-Z0-9]{2,4},?\s*/i, '')
    .replace(/,?\s*Indonesia\s*$/i, '')
    .trim();

  cleaned = cleaned.replace(/\s+\d{5}\s*$/, '');

  const parts = cleaned
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  while (parts.length > 1) {
    const last = parts[parts.length - 1];
    if (isAdminSegment(last)) {
      parts.pop();
    } else {
      break;
    }
  }

  return parts.join(', ');
}

function isAdminSegment(s: string): boolean {
  return (
    /^(Kota|Kabupaten|Kab\.|Provinsi|Prov\.|Daerah)\s/i.test(s) ||
    /^(Jawa|Sumatera|Kalimantan|Sulawesi|Papua|Banten|Bali|Nusa Tenggara|Maluku|Gorontalo|Bengkulu|Lampung|Riau|Jambi|Aceh|Yogyakarta|DKI|D\.I\.)/i.test(
      s,
    )
  );
}
