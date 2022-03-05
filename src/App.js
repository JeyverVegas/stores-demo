import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import FeedbackComponents from './components/shared/FeedbackComponents/FeedbackComponents';
import MainRoutes from './routes/MainRoutes';

function App() {
  return (
    <>
      <CssBaseline />
      <FeedbackComponents />
      <MainRoutes />
    </>
  );
}

export default App;
