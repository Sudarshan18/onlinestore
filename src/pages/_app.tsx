import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from '../contexts/CartContext'; // Import CartProvider
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
