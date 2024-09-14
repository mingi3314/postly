import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generatePost } from "../backend/services/PostService.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { newsContents } = req.body;

  if (!newsContents) {
    return res.status(400).json({ error: "News contents are required" });
  }

  try {
    const generatedPost = await generatePost(newsContents);
    return res.status(200).json({ result: generatedPost });
  } catch (error) {
    console.error("Error generating post:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate post";
    return res.status(500).json({ error: errorMessage });
  }
}
