import { IVideoReference } from './interfaces';

export default class AppSettings {
  shopUrl: string;
  contactAddress: string;
  featuredVideo: IVideoReference;

  constructor() {
    this.shopUrl = '';
    this.contactAddress = '';
    this.featuredVideo = { author: '', channelUrl: '', videoId: '' };
  }
}
