import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './page/SignIn/SignIn';
import Home from './page/Home/Home';
import SignUp from './page/SignUp/SignUp';




function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home/:login" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
