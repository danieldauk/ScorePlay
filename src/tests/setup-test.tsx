import userEvent, {
  Options as UserEventSetupOptions,
} from "@testing-library/user-event";
import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Providers } from "~/providers";
import App from "~/App";
import { QueryClient } from "@tanstack/react-query";

/**
 * A custom wrapper is need to isolate cache between tests
 * and have different options (such as retry policy) for tests
 */

const createWrapper = () => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => {
    return <Providers queryClient={testQueryClient}>{children}</Providers>;
  };
};

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: createWrapper(), ...options });

export const setupTest = (
  ui: ReactElement,
  options?: {
    renderOptions?: Omit<RenderOptions, "wrapper">;
    userEventSetupOptions?: UserEventSetupOptions;
  },
) => {
  return {
    ...renderWithProviders(ui, options?.renderOptions),
    user: userEvent.setup(options?.userEventSetupOptions),
  };
};

type SetupIntegrationTestOptions = {
  userEventSetupOptions?: UserEventSetupOptions;
};

export const setupAppTest = (options?: SetupIntegrationTestOptions) => {
  return {
    ...setupTest(<App />, {
      userEventSetupOptions: options?.userEventSetupOptions,
    }),
  };
};
