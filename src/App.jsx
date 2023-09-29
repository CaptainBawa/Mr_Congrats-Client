import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PredictionsList from './components/predictions/PredictionsList';
import FreeCombosList from './components/free_combos/Free_CombosList';
import PaidCombosList from './components/paid_combos/Paid_CombosList';
import AdvertsList from './components/adverts/AdvertsList';
import DetailsList from './components/details/DetailsList';
import Navigation from './components/Navigation';

const App = () => (
  <BrowserRouter>
    <Navigation />
    <AdvertsList />
    <PaidCombosList />
    <FreeCombosList />
    <Routes>
      <Route path="/" element={<PredictionsList />} />
      <Route path="/details/:detailId" element={<DetailsList />} />
    </Routes>
  </BrowserRouter>
);

export default App;
