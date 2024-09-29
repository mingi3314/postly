export class NewsAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NewsAPIError";
  }
}
