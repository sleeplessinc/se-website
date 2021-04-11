import React from 'react';
import { ReactComponent as FacebookIcon } from '../images/icon-facebook.svg';
import { ReactComponent as DiscordIcon } from '../images/icon-discord.svg';
import { ReactComponent as RedditIcon } from '../images/icon-reddit.svg';
import { ReactComponent as TwitterIcon } from '../images/icon-twitter.svg';
import { ReactComponent as YoutubeIcon } from '../images/icon-youtube.svg';
import CardDetails from '../models/CardDetails';

export const GetSocialMediaIcon = (card: CardDetails, iconSize: number, fill: string | undefined): React.ReactNode => {
  fill = fill ?? 'black';
  const logo = card.logo ?? 'facebook';
  switch (logo) {
    case 'logo_discord': {
      return <DiscordIcon width={iconSize} height={iconSize} fill={fill} />;
    }
    case 'logo_reddit': {
      return <RedditIcon width={iconSize} height={iconSize} fill={fill} />;
    }
    case 'logo_twitter': {
      return <TwitterIcon width={iconSize} height={iconSize} fill={fill} />;
    }
    case 'logo_youtube': {
      return <YoutubeIcon width={iconSize} height={iconSize} fill={fill} />;
    }
    default: {
      return <FacebookIcon width={iconSize} height={iconSize} fill={fill} />;
    }
  }
};

export const GetUrlIcon = (card: CardDetails, iconSize: number, className: string): React.ReactNode => {
  const size = `${iconSize}px`;
  return <img src={card.logoUrl} height={size} width={size} className={className} />;
};
