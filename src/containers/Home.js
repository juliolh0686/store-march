import React from 'react';
import Products from '../components/Products';
import { Helmet } from 'react-helmet';
import initialState from '../initialState';

const Home = () => {
  return (
    <>
    <Helmet>
      <title> Store Merch - Productos</title>
    </Helmet>
      <Products products={initialState.products} />
    </>
  );
}

export default Home;