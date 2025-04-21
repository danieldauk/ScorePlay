import { QueryClient } from "@tanstack/react-query";

import { MuiThemeProvider } from "./MuiThemeProvider";
import { QueryClientProvider } from "./QueryClientProvider";

type Props = {
  queryClient: QueryClient;
  children: React.ReactNode;
};

export const Providers = ({ queryClient, children }: Props) => {
  return (
    <MuiThemeProvider>
      <QueryClientProvider queryClient={queryClient}>
        {children}
      </QueryClientProvider>
    </MuiThemeProvider>
  );
};
