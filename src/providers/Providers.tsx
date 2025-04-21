import { MuiThemeProvider } from "./MuiThemeProvider";
import { QueryClientProvider } from "./QueryClientProvider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <MuiThemeProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </MuiThemeProvider>
  );
};
