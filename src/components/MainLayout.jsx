import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <>
    <Header />
    <main className="min-h-[calc(100vh-160px)]">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;
