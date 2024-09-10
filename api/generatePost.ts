import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generatePost } from "../backend/services/generatePostService.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { references } = req.body;

  if (!references || !Array.isArray(references)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const result = await generatePost(references);
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error generating post:", error);
    return res.status(500).json({ error: "Failed to generate post" });
  }
}
