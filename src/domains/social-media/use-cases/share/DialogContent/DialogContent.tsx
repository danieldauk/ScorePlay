import {
  SocialMediaProfile,
  SocialPlatform,
} from "~/domains/social-media/types";

import { NonEmptyArray } from "~/utils/non-empty-array";

type Props = {
  socialMediaProfiles: SocialMediaProfile[];
  onSubmit: (data: ValidatedFormData) => void;
  onCancel: () => void;
};

/* 
  I would typically define this type at the API method level for better context. 
  Since I'm not implementing the API method here, I've placed it in this file instead.
*/
type ProfileShareSelection = {
  id: SocialMediaProfile["id"];
  platforms: NonEmptyArray<SocialPlatform>;
};

type ValidatedFormData = {
  preset: string;
  title: string;
  description: string;
  profile: NonEmptyArray<ProfileShareSelection>;
};

// TODO: implement
export const DialogContent = (_: Props) => {
  return <div>DialogContent</div>;
};
