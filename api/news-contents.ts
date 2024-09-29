import type { VercelRequest, VercelResponse } from "@vercel/node";
import { NewsService } from "../backend/services/NewsService.js";
import { NewsAPI } from "../backend/modules/NewsAPI.js";
import { WebScraper } from "../backend/modules/WebScraper.js";
import { ContentParser } from "../backend/modules/ContentParser.js";
import { NewsServiceError } from "../backend/errors/NewsServiceError.js";

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
  const webScraper = new WebScraper();
  const contentParser = new ContentParser();
  const newsService = new NewsService(newsAPI, webScraper, contentParser);

  try {
    const newsContents = await newsService.fetchNewsContent(query);
    return res.status(200).json({ newsContents });
  } catch (error) {
    console.error("Error fetching news content:", error);
    if (error instanceof NewsServiceError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch news content" });
  } finally {
    await webScraper.close();
  }
}
