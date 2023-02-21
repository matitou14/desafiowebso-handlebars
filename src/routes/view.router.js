import express from 'express';
import { products } from '../app.js';

const viewRouter = express.Router();

viewRouter.get('/', (req, res) => {
    const products = []

    res.render( "index",{products});
});

viewRouter.post('/add-product', (req, res) => {
    const product = {
      name: req.body.name,
      price: req.body.price
    };
    products.push(product);
    res.redirect('/');
  });

  viewRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
  });
  
export default viewRouter;