import { Routes, Route } from "react-router-dom";
import CartPage from "./components/Cart/CartPage";
import { ThankYouPage } from "./components/ThankYou/ThankYou";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="thankyou" element={<ThankYouPage />} />
      </Routes>
    </div>
  );
}
export default App;