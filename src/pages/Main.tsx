import { QueryClient, QueryClientProvider } from 'react-query';
import DataPush from './DataPush';

const queryClient = new QueryClient();

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      main
      <DataPush />
    </QueryClientProvider>
  );
};
export default Main;
