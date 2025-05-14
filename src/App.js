import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Components/UserLogin";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Transaction from "./Components/Transaction";
import TransactionAccount from "./Components/TransactionAccount";
import PrivateRoute from "./Services/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <>
        {isLoggedIn && <Navbar />}

        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          <Route
            path="/account"
            element={
              <PrivateRoute>
                <TransactionAccount />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction"
            element={
              <PrivateRoute>
                <Transaction />
              </PrivateRoute>
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}
      </>
    </BrowserRouter>
  );
}

export default App;
