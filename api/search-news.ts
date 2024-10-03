import type { VercelRequest, VercelResponse } from "@vercel/node";
import { NewsAPI } from "../backend/modules/NewsAPI.js";
import { NewsAPIError } from "../backend/errors/NewsAPIError.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { query } = req.query;

  if (typeof query !== "string") {
    return res
      .status(422)
      .json({ error: "Query is required and must be a string" });
  }

  const newsAPI = new NewsAPI();

  try {
    const newsItems = await newsAPI.searchNews(query);
    return res.status(200).json({ newsItems });
  } catch (error) {
    console.error("Error searching news:", error);
    if (error instanceof NewsAPIError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to search news" });
  }
}
