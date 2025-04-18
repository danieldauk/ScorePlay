import { QueryClientProvider } from "./QueryClientProvider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};
