import { SocialMediaProfile } from "~/domains/social-media/types";
import { DialogContent } from "./DialogContent";

type Props = {
  socialMediaProfiles: SocialMediaProfile[];
  onShared: () => void;
  onCancel: () => void;
};

export const DataSubmitter = ({
  socialMediaProfiles,
  onShared,
  onCancel,
}: Props) => {
  return (
    <DialogContent
      socialMediaProfiles={socialMediaProfiles}
      onSubmit={(data) => {
        console.log(data);
        onShared();
      }}
      onCancel={onCancel}
    />
  );
};
