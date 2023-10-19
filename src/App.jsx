import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PredictionsList from './components/predictions/PredictionsList';
import AdvertsList from './components/adverts/AdvertsList';
import DetailsList from './components/details/DetailsList';
import Navigation from './components/Navigation';
import Bookies from './components/Bookies';
import Section from './components/Section';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Order from './components/Order';
import AdminPanel from './components/admin/AdminPanel';
import SideAds from './components/SideAds';

const App = () => (
  <BrowserRouter>
    <Navigation />
    <AdvertsList />
    <Bookies />
    <Routes>
      <Route path="/" element={<PredictionsList />} />
      <Route path="/predictions/:predictionId/details" element={<DetailsList />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/order" element={<Order />} />
      <Route path="/prince" element={<AdminPanel />} />
    </Routes>
    <SideAds />
    <Section />
  </BrowserRouter>
);

export default App;
