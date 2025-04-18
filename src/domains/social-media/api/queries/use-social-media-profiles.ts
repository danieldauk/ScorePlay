import { get } from "~/http/client";
import { SocialMediaProfile } from "~/domains/social-media/types";
import { useQuery } from "@tanstack/react-query";
import { socialMediaQueryKeys } from "./query-keys";

type PaginationData = {
  limit: number;
  page: number;
  total: number;
};

type GetSocialMediaProfilesResponse = {
  items: SocialMediaProfile[];
} & PaginationData;

const getSocialMediaProfiles = async (): Promise<SocialMediaProfile[]> => {
  const response = await get<GetSocialMediaProfilesResponse>("/sp-fe-task");

  return response.items;
};

export const useSocialMediaProfilesQuery = () => {
  const result = useQuery({
    queryKey: socialMediaQueryKeys.allProfiles,
    queryFn: getSocialMediaProfiles,
  });

  return result;
};
