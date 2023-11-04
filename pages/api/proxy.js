import { makeFetch, isValidUrl } from "@davidcrammer/shotgun"
import Cors from "cors"

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "POST"],
  origin: true,
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error if anything goes wrong
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

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
    "Content-Type": "",
  }

  const request = await makeFetch(url, method, { data, headers, debug: true })

  if (!request.error) {
    res.status(200).json(request)
  } else {
    res.status(400).json(request)
  }
}
