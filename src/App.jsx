import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PredictionsList from './components/predictions/PredictionsList';
import FreeCombosList from './components/free_combos/Free_CombosList';
import PaidCombosList from './components/paid_combos/Paid_CombosList';
import AdvertsList from './components/adverts/AdvertsList';
import DetailsList from './components/details/DetailsList';
import Navigation from './components/Navigation';
import Bookies from './components/Bookies';
import Footer from './components/Footer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

const App = () => (
  <BrowserRouter>
    <Navigation />
    <AdvertsList />
    <Bookies />
    <PaidCombosList />
    <FreeCombosList />
    <Routes>
      <Route path="/" element={<PredictionsList />} />
      <Route path="/details/:detailId" element={<DetailsList />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
