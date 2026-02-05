export default (text: string): string | null => {
  if (!text) return null
  return text.substring(0, 1).toUpperCase() + text.substring(1, text.length)
}