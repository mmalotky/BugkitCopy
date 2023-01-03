import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Contact from './components/Contact';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
