module.exports = (url, blockId) => {
  const BASE = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://potion-psi.vercel.app"

  return `${BASE}/api/asset?url=${encodeURIComponent(url)}&blockId=${blockId}`
}