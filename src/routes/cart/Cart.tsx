import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart } from "../../redux/cartSlice";
import banner from "../../assets/cart-banner.jpeg";
import { Product } from "../../types"; // Assuming you have a Product type defined

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartdata: Product[] = useSelector(
    (state: any) => state.cart.cart
  ) as Product[];

  const removeFromCart = (id: number) => {
    dispatch(removeCart(id.toString()));
  };

  return (
    <div className="category-products">
      <div className="container">
        <h1 className="category-products__title">Cart</h1>
        <img className="category-products__banner" src={banner} alt="" />
        <div className="category-products__content">
          {cartdata.map((product) => (
            <div className="item" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.images[0]} alt="" />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </Link>
              <div className="item-price">
                <strong>${product.price}</strong>
                <button onClick={() => removeFromCart(product.id)}>
                  Remove from cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
