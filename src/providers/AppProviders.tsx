import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssVarsProvider } from '@mui/joy/styles';

interface AppProvidersProps {
  children: React.ReactNode;
}
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider >
        {children}
      </CssVarsProvider>
    </QueryClientProvider>
  );
}
export default AppProviders;