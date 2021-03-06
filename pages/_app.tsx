import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
// Styles
import "../styles/globals.css";
// Types
import type { AppProps } from "next/app";


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
