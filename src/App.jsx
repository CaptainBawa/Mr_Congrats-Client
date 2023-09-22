import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PredictionsList from './components/predictions/PredictionsList';
import FreeCombosList from './components/free_combos/Free_CombosList';
import PaidCombosList from './components/paid_combos/Paid_CombosList';

const App = () => (
  <BrowserRouter>
    <PaidCombosList />
    <FreeCombosList />
    <Routes>
      <Route path="/" element={<PredictionsList />} />
    </Routes>
  </BrowserRouter>
);

export default App;
