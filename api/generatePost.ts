import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generatePost } from "../backend/services/generatePostService.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { topic } = req.body;

  try {
    const result = await generatePost(topic);
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error generating post:", error);
    return res.status(500).json({ error: "Failed to generate post" });
  }
}
