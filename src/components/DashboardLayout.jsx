import Sidebar from './Navbar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Header added here */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;