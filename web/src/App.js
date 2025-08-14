import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import CarList from './components/CarList'
import CarOwners from './components/CarOwners';

function App() {

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Cars
          </Typography>
        </Toolbar>
      </AppBar>
        <CarOwners/>
    </div>
  );
}

export default App;