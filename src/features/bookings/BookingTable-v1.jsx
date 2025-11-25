import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import useBooking from './useBookings';
import { useSearchParams } from 'react-router-dom';
function BookingTable() {
  const { bookings, isLoading } = useBooking();
  const [searchParams] = useSearchParams();
  let filterValue = searchParams.get('status') || 'all';
  let sortByValue = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortByValue.split('-');
  if (isLoading) return <Spinner />;
  if (!bookings || bookings.length === 0) return <Empty />;
  let filterBookings;
  if (filterValue === 'all') filterBookings = bookings;
  if (filterValue === 'confirmed') filterBookings = bookings.filter(booking => booking.status === 'confirmed');
  if (filterValue === 'unconfirmed') filterBookings = bookings.filter(booking => booking.status === 'unconfirmed');
  if (filterValue === 'checked-in') filterBookings = bookings.filter(booking => booking.status === 'checked-in');
  if (filterValue === 'checked-out') filterBookings = bookings.filter(booking => booking.status === 'checked-out');

  const modifier = direction === 'asc' ? 1 : -1;
  const sortByBookings = filterBookings.sort((a, b) => (a[field] - b[field]) * modifier);
  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={sortByBookings} render={booking => <BookingRow key={booking.id} booking={booking} />} />
      </Table>
    </Menus>
  );
}

export default BookingTable;
