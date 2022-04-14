import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { Helmet } from 'react-helmet';
import '../styles/components/Checkout.css';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemove = product => () => {
    removeFromCart(product);
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }

  return (
    <>
      <Helmet>
        <title>Lista de Pedidos - Store Merch</title>
      </Helmet>
      <div className="Checkout">
        <div className="Checkout-content">
          <h3> {cart.length > 0 ? 'Lista de Pedidos':'Sin Pedidos'} </h3>
          {cart.map((item, index) => (
            <div className='Checkout-item' key={index}>
              <div className='Checkout-element'>
                <h4>{item.title}</h4>
                <span>$ {item.price} </span>
              </div>
              <button type='button' onClick={handleRemove(item)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className='Checkout-sidebar'>
            <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
            <button type='button'>
              <Link to='/checkout/information'>Continuar Pedido</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;