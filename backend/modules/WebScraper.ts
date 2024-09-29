import axios from "axios";
import puppeteer, { Browser } from "puppeteer";
import { NAVER_ENTERTAIN_URL, NAVER_SPORTS_URL } from "../config/newsConfig.js";
import { WebScraperError } from "../errors/WebScraperError.js";

export class WebScraper {
  private browser: Browser | null = null;

  async fetchHtmlContent(url: string): Promise<string> {
    try {
      if (this.needsPuppeteer(url)) {
        return await this.fetchWithPuppeteer(url);
      } else {
        return await this.fetchWithAxios(url);
      }
    } catch (error) {
      throw new WebScraperError(`Failed to fetch HTML content from ${url}`);
    }
  }

  private needsPuppeteer(url: string): boolean {
    return (
      url.startsWith(NAVER_ENTERTAIN_URL) || url.startsWith(NAVER_SPORTS_URL)
    );
  }

  private async fetchWithPuppeteer(url: string): Promise<string> {
    if (!this.browser) {
      this.browser = await puppeteer.launch();
    }
    const page = await this.browser.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle0" });
      return await page.content();
    } finally {
      await page.close();
    }
  }

  private async fetchWithAxios(url: string): Promise<string> {
    const response = await axios.get(url);
    return response.data;
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
