export default function getValidSubdomain(host) {
  let subdomain = null
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host
  }
  //check if host contains 2 dots—means it's a subdomain
  if (host && host.split(".").length > 2) {
    const candidate = host.split(".")[0]
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      subdomain = candidate
    }
  }
  return subdomain
}
