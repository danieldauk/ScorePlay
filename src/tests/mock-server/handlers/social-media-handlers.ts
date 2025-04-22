import { http, HttpResponse } from "msw";

import { SOCIAL_PROFILES_FIXTURE } from "~/domains/social-media/api/dto/fixtures";
import { API_BASE_URL } from "~/http/client";

export const PROFILES_ENDPOINT = `${API_BASE_URL}/sp-fe-task`;

export const socialMediaHandlers = [
  http.get(PROFILES_ENDPOINT, () => HttpResponse.json(SOCIAL_PROFILES_FIXTURE)),
];
