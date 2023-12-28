import { QueryClient, QueryClientProvider } from 'react-query';
import Share from '../components/Share';
import DataPush from './DataPush';

const queryClient = new QueryClient();

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataPush />
      <Share />
    </QueryClientProvider>
  );
};

export default Main;
