import { SocialPlatform } from "~/domains/social-media/types";

export const getPlatformDisplayName = (platform: SocialPlatform): string => {
  switch (platform) {
    case "instagram":
      return "Instagram";
    case "twitter":
      return "Twitter";
    case "youtube":
      return "YouTube";
    default:
      return platform;
  }
};
