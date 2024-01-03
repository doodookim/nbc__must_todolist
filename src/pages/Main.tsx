import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useQuery, useQueryClient } from 'react-query';
import NoList from '../components/NoList';
import RegisterModal from '../components/RegisterModal';
import Share from '../components/Share';
import { db } from '../firebase';

const Main = () => {
  const queryClient = useQueryClient();
  const newDate = new Date();
  const today = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
  const { data: filteredData = [] } = useQuery(['contents', { date: today }], async () => {
    const contentsRef = collection(db, 'contents');
    const midnight = new Date(today);
    const queryContents = query(contentsRef, where('createdAt', '>=', midnight), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(queryContents);
    const newData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      contents: doc.data().contents,
      isCompleted: doc.data().isCompleted,
      createdAt: doc.data().createdAt.toDate()
    }));
    return newData;
  });
  return (
    <>
      {filteredData.length > 0 ? (
        <>
          <RegisterModal onClose={() => {}} filteredData={filteredData} />
          <Share />
        </>
      ) : (
        <NoList />
      )}
    </>
  );
};
export default Main;
