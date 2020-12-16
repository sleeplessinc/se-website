export default class AppSettings {
  shopUrl: string;
  contactAddress: string;
  featuredVideo: { author: string; channelUrl: string; url: string };

  constructor() {
    this.shopUrl = '';
    this.contactAddress = '';
    this.featuredVideo = { author: '', channelUrl: '', url: '' };
  }
}
