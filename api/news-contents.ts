import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchNewsContent } from "../backend/services/NewsService.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { query } = req.query;

  if (typeof query !== "string") {
    return res
      .status(400)
      .json({ error: "Query is required and must be a string" });
  }

  try {
    const newsContents = await fetchNewsContent(query);
    return res.status(200).json({ newsContents });
  } catch (error) {
    console.error("Error fetching news content:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch news content";
    return res.status(500).json({ error: errorMessage });
  }
}
