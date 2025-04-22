import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  Alert,
  Box,
  DialogActions,
  DialogContent as MuiDialogContent,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useId, useState } from "react";
import { z } from "zod";

import {
  SocialMediaProfile as SocialMediaProfileType,
  SocialPlatform,
} from "~/domains/social-media/types";
import { Button } from "~/ui/atoms/Button";
import { Input } from "~/ui/atoms/Input";
import { Select } from "~/ui/atoms/Select";
import { NonEmptyArray } from "~/utils/non-empty-array";

import { SocialMediaProfile } from "./SocialMediaProfile";

type Props = {
  socialMediaProfiles: SocialMediaProfileType[];
  onSubmit: (data: ValidatedFormData) => void;
  onCancel: () => void;
};

type ValidatedFormData = {
  preset: string;
  title: string;
  description: string;
  profiles: NonEmptyArray<ProfileShareSelection>;
};

type ProfileShareSelection = {
  id: SocialMediaProfileType["id"];
  platforms: NonEmptyArray<SocialPlatform>;
};

type FormData = {
  preset: string | null;
  title: string | null;
  description: string | null;
  profileIdToPlatformSelectionMap: Map<
    SocialMediaProfileType["id"],
    Array<SocialPlatform>
  >;
};

const FORM_ID = "social-share-form-id";

export const DialogContent = ({
  socialMediaProfiles,
  onCancel,
  onSubmit,
}: Props) => {
  const shareToProfilesTitleId = useId();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    preset: null,
    title: null,
    description: null,
    profileIdToPlatformSelectionMap: new Map(),
  });

  const validationErrors = getValidationErrors({ submitted, formData });

  return (
    <>
      <MuiDialogContent>
        <form
          id={FORM_ID}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);

            const result = validationSchema.safeParse(formData);

            if (result.success) {
              onSubmit(result.data);
            }
          }}
        >
          <Grid
            container
            spacing={5}
            columns={{ xs: 1, sm: 2 }}
            direction={{ xs: "column-reverse", sm: "row" }}
          >
            <Grid size={1}>
              <Stack spacing={3} aria-labelledby={shareToProfilesTitleId}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  id={shareToProfilesTitleId}
                >
                  Share to Profiles
                </Typography>
                {!!validationErrors?.profileIdToPlatformSelectionMap && (
                  <Alert severity="error">
                    {validationErrors?.profileIdToPlatformSelectionMap}
                  </Alert>
                )}
                {socialMediaProfiles.length ? (
                  socialMediaProfiles.map((profile) => (
                    <SocialMediaProfile
                      key={profile.id}
                      profile={profile}
                      selectedPlatforms={
                        formData.profileIdToPlatformSelectionMap.get(
                          profile.id,
                        ) || []
                      }
                      onPlatformChange={({ platform, shouldShare }) => {
                        setFormData((prevFormData) => {
                          const newMap = new Map(
                            prevFormData.profileIdToPlatformSelectionMap,
                          );
                          let updatedProfilePlatforms = [
                            ...(newMap.get(profile.id) || []),
                          ];

                          if (shouldShare) {
                            updatedProfilePlatforms.push(platform);
                          } else {
                            updatedProfilePlatforms =
                              updatedProfilePlatforms.filter(
                                (selectedPlatform) =>
                                  selectedPlatform !== platform,
                              );
                          }

                          if (updatedProfilePlatforms.length) {
                            newMap.set(profile.id, updatedProfilePlatforms);
                          } else {
                            newMap.delete(profile.id);
                          }

                          return {
                            ...prevFormData,
                            profileIdToPlatformSelectionMap: newMap,
                          };
                        });
                      }}
                    />
                  ))
                ) : (
                  <NoProfilesPlaceholder />
                )}
              </Stack>
            </Grid>
            <Grid size={1}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography variant="h6" color="text.secondary">
                    Branding Presets
                  </Typography>
                  <Select
                    label="Select Branding Preset"
                    value={formData.preset || ""}
                    error={!!validationErrors?.preset}
                    errorText={validationErrors?.preset}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        preset: e.target.value,
                      }))
                    }
                  >
                    {PRESETS.map((preset) => (
                      <Select.MenuItem key={preset} value={preset}>
                        {preset}
                      </Select.MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="h6" color="text.secondary">
                    Post details
                  </Typography>
                  <Stack spacing={3}>
                    <Input
                      label={
                        <InputLabelWithHelp label="Post title" help="Help" />
                      }
                      error={!!validationErrors?.title}
                      errorText={validationErrors?.title}
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          title: e.target.value,
                        }))
                      }
                    />

                    <Input
                      error={!!validationErrors?.description}
                      errorText={validationErrors?.description}
                      label={
                        <InputLabelWithHelp
                          label="Description/Caption"
                          help="Help"
                        />
                      }
                      multiline
                      minRows={5}
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          description: e.target.value,
                        }))
                      }
                      helperText={`Character count ${
                        formData.description?.length || 0
                      }/${MAX_DESCRIPTION_LENGTH}`}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </MuiDialogContent>

      <DialogActions
        sx={(theme) => ({
          padding: theme.spacing(3),
        })}
      >
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          form={FORM_ID}
          variant="contained"
          type="submit"
          disabled={!!validationErrors}
        >
          Share to socials
        </Button>
      </DialogActions>
    </>
  );
};

const InputLabelWithHelp = ({
  label,
  help,
}: {
  label: string;
  help: string;
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Box>{label}</Box>
      <Tooltip
        placement="top"
        title={<Typography variant="body1">{help}</Typography>}
      >
        <InfoOutlineIcon
          sx={(theme) => ({
            fontSize: theme.typography.body1,
          })}
        />
      </Tooltip>
    </Stack>
  );
};

/* 
  Ideally, we want to make it easier for user to link social profile. 
  Hence, empty state placeholder with navigation to profile linking page (not implemented)
*/
const NoProfilesPlaceholder = () => {
  const titleId = useId();

  return (
    <Stack
      aria-labelledby={titleId}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 2,
        p: 3,
      })}
      spacing={2}
    >
      <Typography id={titleId} variant="h6">
        No social profiles linked yet. Add at least one to continue
      </Typography>
      <Button variant="contained">Link profile</Button>
    </Stack>
  );
};

/* 
  Not sure what preset means in this form, so treating this field as a dummy select.
*/
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
      .trim()
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
      .trim()
      .min(MIN_DESCRIPTION_LENGTH, {
        message: `Description should be at least ${MIN_DESCRIPTION_LENGTH} character(s)`,
      })
      .max(MAX_DESCRIPTION_LENGTH, {
        message: `Description should at most ${MAX_DESCRIPTION_LENGTH} character(s)`,
      }),
    profileIdToPlatformSelectionMap: z
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
    ({ title, description, preset, profileIdToPlatformSelectionMap }) => {
      return {
        title,
        description,
        preset,
        profiles: Array.from(profileIdToPlatformSelectionMap.entries()).map(
          ([profileId, platforms]) => ({ id: profileId, platforms }),
        ) as NonEmptyArray<ProfileShareSelection>,
      };
    },
  );

type ValidationErrors = {
  preset?: string;
  title?: string;
  description?: string;
  profileIdToPlatformSelectionMap?: string;
};

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
    profileIdToPlatformSelectionMap: fieldErrors
      .profileIdToPlatformSelectionMap?.[0]
      ? "Please select at least one social platform for at least one profile"
      : undefined,
  };
};
