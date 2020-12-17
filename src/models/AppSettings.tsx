import { IAnnouncement, IAppSettings, IVideoReference } from './interfaces';
import { compareAsc, parseISO } from 'date-fns';

export default class AppSettings implements IAppSettings {
  shopUrl: string;
  contactAddress: string;
  featuredVideo: IVideoReference;
  announcement?: IAnnouncement;

  constructor() {
    this.shopUrl = '';
    this.contactAddress = '';
    this.featuredVideo = { author: '', channelUrl: '', videoId: '' };
  }

  hasAnnouncement(): boolean {
    let hasNotEnded = true;
    if (this.announcement?.endDate) {
      hasNotEnded = compareAsc(parseISO(this.announcement.endDate), new Date()) > 0;
    }

    return this.announcement && this.announcement.message && hasNotEnded ? true : false;
  }
}
