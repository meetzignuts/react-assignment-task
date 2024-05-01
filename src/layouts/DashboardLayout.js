
import Navbar from '../components/Navbar';
const DashboardLayout = ({ children }) => {
    return (
        <div className='w-100'>
            <Navbar />
            {children}
        </div>
    );
  };
export default DashboardLayout;