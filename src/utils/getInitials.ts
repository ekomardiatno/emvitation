export default function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n.at(0))
    .join('');
}
