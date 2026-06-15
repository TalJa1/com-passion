import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import Transparency from './pages/Transparency';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Account from './pages/Account';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/san-pham/:slug" element={<ProductDetail />} />
          <Route path="/cau-chuyen" element={<Stories />} />
          <Route path="/cau-chuyen/:slug" element={<StoryDetail />} />
          <Route path="/minh-bach" element={<Transparency />} />
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/tai-khoan" element={<Account />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
