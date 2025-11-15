/**
 * Normalizes a URL by adding https:// if no protocol is present
 * @param url - The URL to normalize (can be empty, relative, or absolute)
 * @returns The normalized URL with https:// prefix, or empty string if input was empty
 */
export function normalizeUrl(url: string): string {
  if (!url || !url.trim()) return ''
  
  const trimmed = url.trim()
  
  // If it already has a protocol, return as-is
  if (/^https?:\/\//.test(trimmed)) return trimmed
  
  // Otherwise add https://
  return `https://${trimmed}`
}

/**
 * Validates if a string is a valid URL (or would be valid after normalization)
 * @param url - The URL to validate
 * @returns true if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  if (!url || !url.trim()) return true // Empty URLs are allowed
  
  try {
    const normalized = normalizeUrl(url)
    new URL(normalized)
    return true
  } catch {
    return false
  }
}

/**
 * Gets validation error message for a URL field
 * @param url - The URL to validate
 * @returns Error message if invalid, empty string if valid
 */
export function getUrlError(url: string): string {
  if (!url || !url.trim()) return ''
  if (!isValidUrl(url)) return 'Please enter a valid URL'
  return ''
}
