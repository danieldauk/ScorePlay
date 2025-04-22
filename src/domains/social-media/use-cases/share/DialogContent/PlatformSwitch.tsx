import { alpha, Box, FormControlLabel, Stack, Typography } from "@mui/material";

import { SocialPlatformIcon } from "~/domains/social-media/components/SocialPlatformIcon";
import { getPlatformDisplayName } from "~/domains/social-media/helpers/get-platform-display-name";
import { SocialPlatform } from "~/domains/social-media/types";
import { Switch } from "~/ui/atoms/Switch";

type Props = {
  platform: SocialPlatform;
  checked: boolean;
  onChange: () => void;
};

export const PlatformSwitch = ({ platform, checked, onChange }: Props) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.4),
        p: 1,
      })}
    >
      <FormControlLabel
        sx={{
          m: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
        value={platform}
        checked={checked}
        onChange={onChange}
        control={<Switch />}
        label={
          <Stack direction="row" spacing={2}>
            <SocialPlatformIcon platform={platform} />
            <Box>
              <Typography fontWeight="fontWeightBold" color="primary.light">
                {getPlatformDisplayName(platform)}
              </Typography>
            </Box>
          </Stack>
        }
        labelPlacement="start"
      />
    </Box>
  );
};
