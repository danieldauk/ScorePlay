import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";

type Props = {
  queryClient: QueryClient;
  children: React.ReactNode;
};

export const queryClient = new QueryClient();

export const QueryClientProvider = ({
  queryClient: queryClientProp,
  children,
}: Props) => {
  return (
    <TanstackQueryClientProvider client={queryClientProp}>
      {children}
    </TanstackQueryClientProvider>
  );
};
