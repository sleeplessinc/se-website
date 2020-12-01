export default class Blog {
  author: string;
  blurb: string;
  category: string;
  image: string;
  published: Date;
  thumbnail: string;
  title: string;
  path?: string;

  constructor() {
    this.author = '';
    this.blurb = '';
    this.category = '';
    this.image = '';
    this.published = new Date();
    this.thumbnail = '';
    this.title = '';
  }
}
