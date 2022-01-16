import './App.css';
import { Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/login'
import Register from './views/register'
import Home from './views/home'
import Mess from './views/mess'
import NavigatePage from './components/layout/landing'

import checkLogged from './utils/checkLogged'


function App() {
  checkLogged()

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mess" element={<Mess />} />
        <Route path="/" element={<NavigatePage />} />
      </Routes>
    </div>
  );
}

export default App;
