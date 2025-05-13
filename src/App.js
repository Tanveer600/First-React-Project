import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Transaction from  "./Components/Transaction";
import TransactionAccount from "./Components/TransactionAccount";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <BrowserRouter>
   <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/account" element={<TransactionAccount />} /> 
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
        <Footer />
      </>
   </BrowserRouter>
  );
}

export default App;
