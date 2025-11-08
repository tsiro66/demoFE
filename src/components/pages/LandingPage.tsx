import { useCart } from "../../hooks/useCart";
import { ProductDisplay } from "../ProductDisplay";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTracking } from "../../hooks/useTracking";

const LandingPage = () => {
  const { product, isLoading, error } = useCart();
  const navigate = useNavigate();
  const trackEvent = useTracking();

  useEffect(() => {
    if (error) {
      navigate("/backenderror", { state: { message: error } });
    }
  }, [error, navigate]);

  useEffect(() => {
    if (product) {
      trackEvent('page_view', { 
        page: 'LandingPage', 
        productId: product.id
      });
    }
  }, [product, trackEvent]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-xl font-medium text-gray-500">
          Product data is unavailable.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="container mx-auto px-6 max-w-4xl py-16 lg:py-24"
        id="product"
      >
        <ProductDisplay />
      </div>
    </>
  );
};

export default LandingPage;
