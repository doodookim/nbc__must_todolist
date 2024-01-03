import { QueryClient, QueryClientProvider } from 'react-query';
import NoList from '../components/NoList';
import Share from '../components/Share';

const queryClient = new QueryClient();

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NoList />
      <Share />
    </QueryClientProvider>
  );
};

export default Main;
