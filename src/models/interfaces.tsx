export interface IAnnouncement {
  title: string;
  message: string;
  url: string | null;
  endDate: string | null;
}

export interface IEmail {
  email: string;
  subject: string;
  message: string;
}

export interface IUserClaims {
  admin?: boolean;
  editor?: boolean;
}

export interface IVideoReference {
  author: string;
  channelUrl: string;
  videoId: string;
}

export interface IAppSettings {
  shopUrl: string;
  contactAddress: string;
  featuredVideo: IVideoReference;
  announcement?: IAnnouncement;
}
