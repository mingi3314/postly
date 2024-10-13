import axios from "axios";
import type { Example, Reference } from "@/types";

export class PostGenerationService {
  constructor(private apiUrl: string) {}

  async generatePost({
    references,
    examples,
  }: {
    references: Reference[];
    examples: Example[];
  }): Promise<string> {
    const response = await axios.post(`${this.apiUrl}/generate-post`, {
      references,
      examples,
    });
    return response.data.result;
  }
}
