import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import FavoritesPage from "./FavoritesPage";
import Navbar from "./Navbar";
import { FavoritesProvider } from "./FavoritesContext";
import "./App.css";

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/favourites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
