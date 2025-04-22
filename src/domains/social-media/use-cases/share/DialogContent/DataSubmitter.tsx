import { SocialMediaProfile } from "~/domains/social-media/types";
import { DialogContent } from "./DialogContent";

type Props = {
  socialMediaProfiles: SocialMediaProfile[];
  onShared: () => void;
  onCancel: () => void;
};

/* 
  I would send a request to the server here while managing the loading and error states
*/
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
