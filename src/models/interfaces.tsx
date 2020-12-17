export interface IUserClaims {
  admin?: boolean;
  editor?: boolean;
}

export interface IEmail {
  email: string;
  subject: string;
  message: string;
}

export interface IVideoReference {
  author: string;
  channelUrl: string;
  videoId: string;
}
