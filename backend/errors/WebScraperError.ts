export class WebScraperError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebScraperError";
  }
}
