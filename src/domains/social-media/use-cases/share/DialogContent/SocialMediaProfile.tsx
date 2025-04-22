import { lighten, Stack, Typography } from "@mui/material";
import { useId } from "react";

import {
  SocialMediaProfile as SocialMediaProfileType,
  SocialPlatform,
} from "~/domains/social-media/types";
import { Button } from "~/ui/atoms/Button";

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
  const titleId = useId();

  return (
    <Stack
      aria-labelledby={titleId}
      gap={2}
      sx={(theme) => ({
        border: `1px solid ${lighten(theme.palette.primary.main, 0.8)}`,
        borderRadius: 2,
        p: 1,
      })}
    >
      <Typography
        id={titleId}
        variant="h6"
        fontWeight="fontWeightBold"
        color="primary.light"
      >
        {profile.name}
      </Typography>
      {profile.platforms.length ? (
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
        /* 
          Ideally, we want to make it easier for user to add social platform. 
          Hence, empty state placeholder with navigation to platform addition flow (not implemented)
        */
        <Stack spacing={2} alignItems="center" p={2}>
          <Typography>
            You don't have social platforms for this profile.
          </Typography>

          <Button variant="contained">Add platform</Button>
        </Stack>
      )}
    </Stack>
  );
};
