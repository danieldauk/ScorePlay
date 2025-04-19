import {
  DialogContent as MuiDialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Typography,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  SocialMediaProfile as SocialMediaProfileType,
  SocialPlatform,
} from "~/domains/social-media/types";

import { NonEmptyArray } from "~/utils/non-empty-array";
import { SocialMediaProfile } from "./SocialMediaProfile";
import { useState } from "react";
import { z } from "zod";

type Props = {
  socialMediaProfiles: SocialMediaProfileType[];
  onSubmit: (data: ValidatedFormData) => void;
  onCancel: () => void;
};

/* 
  I would typically define this type at the API method level for better context. 
  Since I'm not implementing the API method here, I've placed it in this file instead.
*/

type ProfileShareSelection = {
  id: SocialMediaProfileType["id"];
  platforms: NonEmptyArray<SocialPlatform>;
};

type ValidatedFormData = {
  preset: string;
  title: string;
  description: string;
  profiles: NonEmptyArray<ProfileShareSelection>;
};

type FormData = {
  preset: string | null;
  title: string | null;
  description: string | null;
  profilesToPlatformSelectionMap: Map<
    SocialMediaProfileType["id"],
    Array<SocialPlatform>
  >;
};

type ValidationErrors = {
  preset?: string;
  title?: string;
  description?: string;
  profilesToPlatformSelectionMap?: string;
};

// TODO: implement
export const DialogContent = ({
  socialMediaProfiles,
  onCancel,
  onSubmit,
}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    preset: null,
    title: null,
    description: null,
    profilesToPlatformSelectionMap: new Map(),
  });

  const validationErrors = getValidationErrors({ submitted, formData });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);

        const result = validationSchema.safeParse(formData);

        if (result.success) {
          onSubmit(result.data);
        }
      }}
    >
      <MuiDialogContent>
        <Grid container spacing={4}>
          <Box>
            <Typography variant="h6">Share to profiles</Typography>
            {socialMediaProfiles.length ? (
              socialMediaProfiles.map((profile) => (
                <SocialMediaProfile
                  key={profile.id}
                  profile={profile}
                  selectedPlatforms={
                    formData.profilesToPlatformSelectionMap.get(profile.id) ||
                    []
                  }
                  onPlatformChange={({ platform, shouldShare }) => {
                    setFormData((prevFormData) => {
                      const newMap = new Map(
                        prevFormData.profilesToPlatformSelectionMap,
                      );
                      let updatedProfilePlatforms = [
                        ...(newMap.get(profile.id) || []),
                      ];

                      if (shouldShare) {
                        updatedProfilePlatforms.push(platform);
                      } else {
                        updatedProfilePlatforms =
                          updatedProfilePlatforms.filter(
                            (selectedPlatform) => selectedPlatform !== platform,
                          );
                      }

                      newMap.set(profile.id, updatedProfilePlatforms);

                      return {
                        ...prevFormData,
                        profilesToPlatformSelectionMap: newMap,
                      };
                    });
                  }}
                />
              ))
            ) : (
              <Typography>You dont have any profiles</Typography>
            )}
          </Box>
          <Stack>
            <Stack>
              <Typography variant="h6">Branding Presets</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Branding Preset
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Preset"
                  value={formData.preset}
                  error={!!validationErrors?.preset}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      preset: e.target.value,
                    }))
                  }
                >
                  {PRESETS.map((preset) => (
                    <MenuItem key={preset} value={preset}>
                      {preset}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack>
              <Typography variant="h6">Post details</Typography>
              <Stack>
                <TextField
                  error={!!validationErrors?.title}
                  label="Post title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      title: e.target.value,
                    }))
                  }
                />
                <Box>
                  <TextField
                    error={!!validationErrors?.description}
                    label="Description/Caption"
                    multiline
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        description: e.target.value,
                      }))
                    }
                  />
                  {/* TODO: */}
                  <Typography>Character count</Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </MuiDialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={!!validationErrors}>
          Share to socials
        </Button>
      </DialogActions>
    </form>
  );
};

// TODO: either leave explanatory comment or update according to email asnwer
const PRESETS = ["preset1", "preset2", "preset3"];

const MIN_TITLE_LENGTH = 1;

const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 2000;

const validationSchema = z
  .object({
    title: z
      .string({
        message: "Required field",
      })
      .min(MIN_TITLE_LENGTH, {
        message: `Title should be at least ${MIN_TITLE_LENGTH} character(s)`,
      }),

    preset: z.string({
      message: "Required field",
    }),
    description: z
      .string({
        message: "Required field",
      })
      .min(MIN_DESCRIPTION_LENGTH, {
        message: `Description should be at least ${MIN_DESCRIPTION_LENGTH} character(s)`,
      })
      .max(MAX_DESCRIPTION_LENGTH, {
        message: `Description should at most ${MAX_DESCRIPTION_LENGTH} character(s)`,
      }),
    profilesToPlatformSelectionMap: z
      .map(
        z.number(),
        z
          .array(z.string())
          .min(1)
          .transform((value) => value as NonEmptyArray<SocialPlatform>),
      )
      .refine((map) => map.size >= 1),
  })
  .transform<ValidatedFormData>(
    ({ title, description, preset, profilesToPlatformSelectionMap }) => {
      return {
        title,
        description,
        preset,
        profiles: Array.from(profilesToPlatformSelectionMap.entries()).map(
          ([profileId, platforms]) => ({ id: profileId, platforms }),
        ) as NonEmptyArray<ProfileShareSelection>,
      };
    },
  );

const getValidationErrors = ({
  submitted,
  formData,
}: {
  submitted: boolean;
  formData: FormData;
}): ValidationErrors | null => {
  if (!submitted) {
    return null;
  }

  const result = validationSchema.safeParse(formData);

  if (result.success) {
    return null;
  }

  const { fieldErrors } = result.error.flatten();

  return {
    title: fieldErrors.title?.[0],
    description: fieldErrors.description?.[0],
    preset: fieldErrors.preset?.[0],
    profilesToPlatformSelectionMap: fieldErrors
      .profilesToPlatformSelectionMap?.[0]
      ? "At least one platform should be selected"
      : undefined,
  };
};
