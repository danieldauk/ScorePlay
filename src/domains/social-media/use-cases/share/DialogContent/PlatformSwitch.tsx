import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import { SocialPlatform } from "~/domains/social-media/types";
import { SocialPlatformIcon } from "./SocialPlatformIcon";

type Props = {
  platform: SocialPlatform;
  checked: boolean;
  onChange: () => void;
};

export const PlatformSwitch = ({ platform, checked, onChange }: Props) => {
  return (
    <FormControlLabel
      value={platform}
      checked={checked}
      onChange={onChange}
      control={<Switch color="primary" />}
      label={
        <Stack direction="row">
          <SocialPlatformIcon platform={platform} />
          <Box>
            <Typography>{getPlatformName(platform)}</Typography>
          </Box>
        </Stack>
      }
      labelPlacement="start"
    />
  );
};

// TODO: move to reusable domain helpers
const getPlatformName = (platform: SocialPlatform): string => {
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
