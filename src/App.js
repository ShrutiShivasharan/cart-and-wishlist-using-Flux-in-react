import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductComponent from "./components/ProductComponent";
import Wishlist from './components/Wishlist'
import Cart from './components/Cart'

function App() {
  return (
    <>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={ <ProductComponent /> } />
            <Route path="/wishlist" element={ <Wishlist /> } />
            <Route path="/cart" element={ <Cart /> } />
          </Routes>
        </Router>
    </>
  );
}

export default App;
