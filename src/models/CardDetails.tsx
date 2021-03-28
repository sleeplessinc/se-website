export default class CardDetails {
  title: string;
  description: string;
  logo?: string;
  logoUrl?: string;
  url: string;
  order: number;

  constructor() {
    this.title = '';
    this.description = '';
    this.url = '';
    this.order = 0;
  }
}
