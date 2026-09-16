import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', backgroundColor: 'black', minHeight: '50vh' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}


// Pages
import Home from './pages/Home';
import About from './pages/About';
import Journey from './pages/Journey';
import Services from './pages/Services';
import Photography from './pages/Photography';
import Albums from './pages/Albums';
import Photobooks from './pages/Photobooks';
import Frames from './pages/Frames';
import PhotoPrinting from './pages/PhotoPrinting';
import Portfolio from './pages/Portfolio';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import BookNow from './pages/BookNow';
import Gallery from './pages/Gallery';
import AlbumPreview from './pages/AlbumPreview';
import Shop from './pages/shop/Shop';
import ProductDetails from './pages/shop/ProductDetails';
import Checkout from './pages/shop/Checkout';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import DashboardOverview from './pages/admin/DashboardOverview';
import LeadsManager from './pages/admin/LeadsManager';
import EventCalendar from './pages/admin/EventCalendar';
import CustomerView from './pages/admin/CustomerView';
import AIAlbumSelection from './pages/album/AIAlbumSelection';
import WhatsAppCTA from './components/layout/WhatsAppCTA';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
          <Navbar />
          <main className="flex-grow">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/services" element={<Services />} />
                <Route path="/photography" element={<Photography />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/photobooks" element={<Photobooks />} />
                <Route path="/frames" element={<Frames />} />
                <Route path="/photo-printing" element={<PhotoPrinting />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book-now" element={<BookNow />} />
                {/* Added for Phase 5 & 6 */}
                <Route path="/gallery/:id" element={<Gallery />} />
                <Route path="/album/:id" element={<AlbumPreview />} />
                {/* Added for Phase 7 & 9 */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={<CustomerDashboard />} />
                {/* Added for Phase 8: Admin */}
                <Route path="/admin" element={<DashboardOverview />} />
                <Route path="/admin/leads" element={<LeadsManager />} />
                <Route path="/admin/bookings" element={<EventCalendar />} />
                <Route path="/admin/customers" element={<CustomerView />} />
                <Route path="/admin/customers/:id" element={<CustomerView />} />
                {/* Added for Phase 10: AI Album Selection */}
                <Route path="/album/ai-selection" element={<AIAlbumSelection />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
          <WhatsAppCTA />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
