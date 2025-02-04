import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details.");
        const data = await response.json();
        setTimeout(() => {
          setProduct(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading-message">LOADING PRODUCTS ...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!product) return <p className="error-message">Product not found</p>;
  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          Price: <span>${product.price}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
