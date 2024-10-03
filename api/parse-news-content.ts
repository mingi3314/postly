import type { VercelRequest, VercelResponse } from "@vercel/node";
import { WebScraper } from "../backend/modules/WebScraper.js";
import { ContentParser } from "../backend/modules/ContentParser.js";
import { WebScraperError } from "../backend/errors/WebScraperError.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url } = req.query;

  if (typeof url !== "string") {
    return res
      .status(422)
      .json({ error: "URL is required and must be a string" });
  }

  const webScraper = new WebScraper();
  const contentParser = new ContentParser();

  try {
    const content = await webScraper.fetchContent(url);
    const parsedContent = contentParser.parseNewsContent(url, content);
    return res.status(200).json({ parsedContent });
  } catch (error) {
    console.error("Error parsing news content:", error);
    if (error instanceof WebScraperError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to parse news content" });
  }
}
