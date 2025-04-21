import { Stack, Typography } from "@mui/material";
import {
  SocialMediaProfile as SocialMediaProfileType,
  SocialPlatform,
} from "~/domains/social-media/types";
import { PlatformSwitch } from "./PlatformSwitch";

type Props = {
  profile: SocialMediaProfileType;
  selectedPlatforms: SocialPlatform[];
  onPlatformChange: (data: {
    platform: SocialPlatform;
    shouldShare: boolean;
  }) => void;
};

export const SocialMediaProfile = ({
  profile,
  selectedPlatforms,
  onPlatformChange,
}: Props) => {
  return (
    <Stack
      gap={2}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 2,
        p: 1,
      })}
    >
      <Typography
        variant="h6"
        fontWeight="fontWeightBold"
        color="primary.light"
      >
        {profile.name}
      </Typography>
      {profile.platforms ? (
        <>
          {profile.platforms.map((platform) => {
            const checked = selectedPlatforms.includes(platform);
            return (
              <PlatformSwitch
                key={platform}
                platform={platform}
                checked={checked}
                onChange={() =>
                  onPlatformChange({ platform, shouldShare: !checked })
                }
              />
            );
          })}
        </>
      ) : (
        <Typography>
          You don't have social platforms for this profile
        </Typography>
      )}
    </Stack>
  );
};
