import { makeFetch, isValidUrl } from "@davidcrammer/shotgun"

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function handler(req, res) {
  let { url } = req.query

  const method = req.method
  const data = req.body

  if (!url) return res.status(400).json({ error: "Invalid URL" })
  url = process.env.API_ROUTE + "/?endpoint=" + url + "&api_key=" + process.env.API_KEY
  if (!isValidUrl(url)) {
    return res.status(400).json({
      error: "Invalid URL",
    })
  }

  const headers = {
    //"Content-Type": "application/json",
  }

  const request = await makeFetch(url, method, { data, headers })

  if (!request.error) {
    res.status(200).json(request)
  } else {
    res.status(400).json(request)
  }
}
