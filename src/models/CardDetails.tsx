export default class CardDetails {
  title: string;
  description: string;
  logo?: string;
  logoUrl?: string;
  url: string;

  constructor() {
    this.title = '';
    this.description = '';
    this.url = '';
  }
}
