import { useSocialMediaProfilesQuery } from "~/domains/social-media/api/queries/use-social-media-profiles";
import { notReachable } from "~/utils/not-reachable";

import { DataSubmitter } from "./DataSubmitter";
import { ErrorDialogContent } from "./ErrorDialogContent";
import { LoadingDialogContent } from "./LoadingDialogContent";

type Props = {
  onShared: () => void;
  onCancel: () => void;
};

export const DataLoader = ({ onShared, onCancel }: Props) => {
  const socialMediaProfilesQuery = useSocialMediaProfilesQuery();

  switch (socialMediaProfilesQuery.status) {
    case "error":
      return (
        <ErrorDialogContent
          onCancel={onCancel}
          onRetry={() => socialMediaProfilesQuery.refetch()}
        />
      );
    case "pending":
      return <LoadingDialogContent />;
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
