import { QueryClient, QueryClientProvider } from 'react-query';
import NoList from '../components/NoList';
import Share from '../components/Share';
import DataPush from './DataPush';
const queryClient = new QueryClient();

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NoList />
      <DataPush />

      <Share />
    </QueryClientProvider>
  );
};

export default Main;
