import { Box, Stack, Typography } from "@mui/material";
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
    <Box>
      <Typography>{profile.name}</Typography>
      <Stack>
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
            {/* TODO: add proper text */}
            You dont have social platforms for this profile
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
