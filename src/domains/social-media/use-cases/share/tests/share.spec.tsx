import { screen, waitFor, within } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { EMPTY_SOCIAL_PROFILES_FIXTURE } from "~/domains/social-media/api/dto/fixtures";
import { ENDPOINTS, server } from "~/tests/mock-server";
import { setupAppTest } from "~/tests/setup-test";

test("As a user, I should be able to post content to social profiles", async () => {
  const { user } = setupAppTest();

  const openDialogButton = await screen.findByRole("button", {
    name: "Open dialog",
  });
  user.click(openDialogButton);

  const shareToSocialDialog = await screen.findByRole("dialog", {
    name: "Share to Social Media",
  });
  expect(shareToSocialDialog).toBeInTheDocument();

  /* 
    test list of profiles
  */
  const shareToProfilesSection = await screen.findByLabelText(
    "Share to Profiles",
  );
  expect(shareToProfilesSection).toBeInTheDocument();

  const profile1 = within(shareToProfilesSection).getByLabelText("Profile 1");
  const profile1Switches = within(profile1).getAllByRole("checkbox");
  expect(profile1Switches).toHaveLength(2);
  expect(within(profile1).getByLabelText("Instagram")).toBeInTheDocument();
  expect(within(profile1).getByLabelText("Twitter")).toBeInTheDocument();

  const profile2 = within(shareToProfilesSection).getByLabelText("Profile 2");
  const profile2Switches = within(profile2).getAllByRole("checkbox");
  expect(profile2Switches).toHaveLength(3);
  expect(within(profile2).getByLabelText("Instagram")).toBeInTheDocument();
  expect(within(profile2).getByLabelText("Twitter")).toBeInTheDocument();
  expect(within(profile2).getByLabelText("YouTube")).toBeInTheDocument();

  /* 
    test validation
  */
  expect(
    within(shareToSocialDialog).queryByText(
      "At least one platform should be selected",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(shareToSocialDialog).queryByText(
      "At least one platform should be selected",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(shareToSocialDialog).queryByText("Required field"),
  ).not.toBeInTheDocument();

  const shareButton = within(shareToSocialDialog).getByRole("button", {
    name: "Share to socials",
  });
  expect(shareButton).toBeEnabled();
  user.click(shareButton);

  await waitFor(() => expect(shareButton).toBeDisabled());

  const profileNotSelectedAlert =
    within(shareToSocialDialog).getByRole("alert");
  expect(profileNotSelectedAlert).toHaveTextContent(
    "At least one platform should be selected",
  );
  user.click(within(profile2).getByLabelText("Instagram"));
  await waitFor(() => expect(profileNotSelectedAlert).not.toBeInTheDocument());
  expect(shareButton).toBeDisabled();

  const selectBrandingPresetInput = within(shareToSocialDialog).getByLabelText(
    "Select Branding Preset",
  );
  expect(selectBrandingPresetInput).toHaveAccessibleDescription(
    "Required field",
  );

  user.click(selectBrandingPresetInput);

  user.click(await screen.findByText("preset1"));
  await waitFor(() =>
    expect(selectBrandingPresetInput).not.toHaveAccessibleDescription(
      "Required field",
    ),
  );
  expect(shareButton).toBeDisabled();

  const postTitleInput =
    within(shareToSocialDialog).getByLabelText("Post title");
  expect(postTitleInput).toHaveAccessibleDescription("Required field");

  await user.type(postTitleInput, "title");

  await waitFor(() =>
    expect(postTitleInput).not.toHaveAccessibleDescription("Required field"),
  );
  expect(shareButton).toBeDisabled();

  const postDescriptionInput = within(shareToSocialDialog).getByLabelText(
    "Description/Caption",
  );
  expect(postDescriptionInput).toHaveAccessibleDescription("Required field");

  await user.type(postDescriptionInput, "description");

  await waitFor(() =>
    expect(postDescriptionInput).toHaveAccessibleDescription(
      "Character count 11/2000",
    ),
  );

  expect(shareButton).toBeEnabled();
  user.click(shareButton);

  /* 
    Usually, we would check if request was sent properly and the flow has finished
  */
  await waitFor(() => expect(shareToSocialDialog).not.toBeInTheDocument());
});

test("As a user, I should be not able to post content to social profiles if I didn't link my profiles. Also, I should see placeholder encouraging me to link my social profiles", async () => {
  server.use(
    http.get(ENDPOINTS.PROFILES_ENDPOINT, () =>
      HttpResponse.json(EMPTY_SOCIAL_PROFILES_FIXTURE),
    ),
  );

  const { user } = setupAppTest();

  const openDialogButton = await screen.findByRole("button", {
    name: "Open dialog",
  });
  user.click(openDialogButton);

  const shareToSocialDialog = await screen.findByRole("dialog", {
    name: "Share to Social Media",
  });
  expect(shareToSocialDialog).toBeInTheDocument();

  const noSocialProfilesPlaceholder = await within(
    shareToSocialDialog,
  ).findByLabelText(
    "No social profiles linked yet. Add at least one to continue",
  );
  expect(noSocialProfilesPlaceholder).toBeInTheDocument();

  const linkProfileButton = within(noSocialProfilesPlaceholder).getByRole(
    "button",
    { name: "Link profile" },
  );
  /* 
    Usually we would test if we land on apprpriate flow
  */
  expect(linkProfileButton).toBeInTheDocument();
});

test("As a user, I should see informative error message if something went wrong during loading of profiles. And I should be able to recover from error.", async () => {
  server.use(
    http.get(
      ENDPOINTS.PROFILES_ENDPOINT,
      () => new HttpResponse(null, { status: 503 }),
    ),
  );

  const { user } = setupAppTest();

  const openDialogButton = await screen.findByRole("button", {
    name: "Open dialog",
  });
  user.click(openDialogButton);

  const shareToSocialDialog = await screen.findByRole("dialog", {
    name: "Share to Social Media",
  });
  expect(shareToSocialDialog).toBeInTheDocument();

  const errorMessage = await within(shareToSocialDialog).findByText(
    "There was an issue loading social media profiles",
  );
  expect(errorMessage).toBeInTheDocument();

  /* test error recovery */
  server.resetHandlers();
  const retryButton = within(shareToSocialDialog).getByRole("button", {
    name: "Try again",
  });
  user.click(retryButton);

  const formContent = await within(shareToSocialDialog).findByText(
    "Branding Presets",
  );
  expect(formContent).toBeInTheDocument();
  expect(errorMessage).not.toBeInTheDocument();
});
