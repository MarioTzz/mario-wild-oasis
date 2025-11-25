import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabin from './useCabin';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
function CabinTable() {
  const [searchParams] = useSearchParams();
  let filterValue = searchParams.get('discount') || 'all';
  let sortByValue = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortByValue.split('-');

  const { isLoading, error, cabins } = useCabin();

  if (isLoading) return <Spinner />;
  let filterCabins;
  if (filterValue === 'all') filterCabins = cabins;
  if (filterValue === 'no-discount') filterCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount') filterCabins = cabins.filter(cabin => cabin.discount > 0);

  const modifier = direction === 'asc' ? 1 : -1;
  const sorByCabins = filterCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sorByCabins} render={cabin => <CabinRow key={cabin.id} cabin={cabin} />} />
      </Table>
    </Menus>
  );
}

export default CabinTable;
