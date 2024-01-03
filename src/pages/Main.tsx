// import NoList from '../components/NoList';
import NoList from '../components/NoList';
import Share from '../components/Share';
// import DataPush from './DataPush';

const Main = () => {
  // const newDate = new Date();
  // const today = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
  // const { data: filteredData } = useQuery(['contents', { date: today }], async () => {
  //   const contentsRef = collection(db, 'contents');
  //   const midnight = new Date(today);
  //   const queryContents = query(contentsRef, where('createdAt', '>=', midnight), orderBy('createdAt', 'asc'));
  //   const querySnapshot = await getDocs(queryContents);
  //   const newData = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     contents: doc.data().contents,
  //     isCompleted: doc.data().isCompleted,
  //     createdAt: doc.data().createdAt.toDate()
  //   }));
  //   return newData;
  // });
  return (
    <>
      {/* <RegisterModal /> */}
      <NoList />
      <Share />
    </>
  );
};

export default Main;
