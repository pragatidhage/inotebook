import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>

        <Route exact path='/about' element={<About/>}/>
      </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
