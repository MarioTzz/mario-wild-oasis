import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import { HiOutlineBriefcase, HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings?.length || 0;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays?.length || 0;
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
  return (
    <>
      <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings}></Stat>
      <Stat title='Sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)}></Stat>
      <Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkins}></Stat>
      <Stat title='Occupancy rate' color='yellow' icon={<HiOutlineChartBar />} value={Math.ceil(occupation * 100) + '%'}></Stat>
    </>
  );
}

export default Stats;
