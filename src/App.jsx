import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PredictionsList from './components/predictions/PredictionsList';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PredictionsList />} />
    </Routes>
  </BrowserRouter>
);

export default App;
