import axios from "axios";
import type { Reference } from "../types";

export class PostGenerationService {
  constructor(private apiUrl: string) {}

  async generatePost(references: Reference[]): Promise<string> {
    const response = await axios.post(`${this.apiUrl}/generate-post`, {
      references,
    });
    return response.data.result;
  }
}
