export type SocialMediaProfile = {
  id: number;
  name: string;
  platforms: SocialPlatform[];
};

export type SocialPlatform = "twitter" | "youtube" | "instagram";
