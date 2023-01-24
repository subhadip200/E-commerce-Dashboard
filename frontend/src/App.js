
import './App.css';
import Nav from './componnent/Nav.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './componnent/Footer';
import Signup from './componnent/Signup';
import PrivateComponent from './componnent/PrivateComponent';
import Login from './componnent/Login';
import Addproduct from './componnent/Addproduct';
import ProductList from './componnent/ProductList';
import UpdateProduct from './componnent/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList/>} />
            <Route path='/add' element={<Addproduct/>} />
            <Route path='/update/:id' element={<UpdateProduct/>} />
            <Route path='/logout' element={<h1>logout component</h1>} />
            {/* <Route path='/profile' element={<h1>Profile component</h1>} /> */}
          </Route>

          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
        
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

