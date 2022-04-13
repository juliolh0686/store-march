import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';

const Payment = () => {

  const {state, addNewOrder} = useContext(AppContext);
  const {cart, buyer} = state;

  const navigate = useNavigate();

  const paypalOptions = {
    ClientId : 'ATRVL_5Owi3idBJNePcmFsxhSMcGoYllFl_7s251awKjn9KAlUR0XSBDB11yZpuYKgPxn3uz97FtyR2U',
    intent: 'capture',
    currency: 'USD',
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  }

   const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }

  const handlePaymentSuccess = (data) => {
    if(data.status === 'COMPLETED'){
      const newOrder = {
        buyer,
        products: cart,
        payment: data
      }
      addNewOrder(newOrder);
      navigate('/checkout/success');
    }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) =>(
          <div className='Payment-item' key={item.title}>
            <div className='Payment-element'>
              <h4> {item.title} </h4>
              <span>
                $ 
                {''}
                {item.price}
              </span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            amount= {handleSumTotal()}
            options= {paypalOptions}
            style= {buttonStyles}
            createOrder = {console.log('Start Payment')}
            onSuccess = {data => handlePaymentSuccess(data)}
            onError = {error => console.log(error)}
            onCancel = {data => console.log(data)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Payment;