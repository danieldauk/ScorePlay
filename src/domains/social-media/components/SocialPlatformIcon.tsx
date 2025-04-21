import { FunctionComponent } from "react";

import InstagramIcon from "~/assets/instagram-icon.svg?react";
import TwitterIcon from "~/assets/twitter-icon.svg?react";
import YoutubeIcon from "~/assets/youtube-icon.svg?react";

import { SocialPlatform } from "~/domains/social-media/types";

type Props = {
  platform: SocialPlatform;
};

const getComponent = (
  platfrom: SocialPlatform,
): FunctionComponent<React.ComponentProps<"svg">> | null => {
  switch (platfrom) {
    case "instagram":
      return InstagramIcon;
    case "twitter":
      return TwitterIcon;
    case "youtube":
      return YoutubeIcon;
    default:
      return null;
  }
};

export const SocialPlatformIcon = ({ platform }: Props) => {
  const IconComponent = getComponent(platform);

  return IconComponent ? (
    <IconComponent style={{ height: "20px", width: "20px" }} />
  ) : null;
};
