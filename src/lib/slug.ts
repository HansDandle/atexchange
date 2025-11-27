export function generateSlugPreserveCase(name: string) {
  if (!name) return ''
  // Preserve capitalization: remove non-alphanumerics, replace with single hyphen, trim edges
  return name
    .trim()
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function generateSlugLowerCase(name: string) {
  if (!name) return ''
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '')
}

export default generateSlugPreserveCase
