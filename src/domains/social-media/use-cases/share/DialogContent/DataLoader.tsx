import { useSocialMediaProfilesQuery } from "~/domains/social-media/api/queries/use-social-media-profiles";
import { notReachable } from "~/utils/not-reachable";
import { DataSubmitter } from "./DataSubmitter";

type Props = {
  onShared: () => void;
  onCancel: () => void;
};

export const DataLoader = ({ onShared, onCancel }: Props) => {
  const socialMediaProfilesQuery = useSocialMediaProfilesQuery();

  switch (socialMediaProfilesQuery.status) {
    case "error":
      // TODO:
      return null;
    case "pending":
      // TODO:
      return null;
    case "success":
      return (
        <DataSubmitter
          socialMediaProfiles={socialMediaProfilesQuery.data}
          onShared={onShared}
          onCancel={onCancel}
        />
      );
    default:
      return notReachable(socialMediaProfilesQuery);
  }
};
