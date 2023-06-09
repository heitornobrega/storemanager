const express = require('express');
const error = require('./middlewares/error');
const { productsRouter, salesRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/sales', salesRouter);
app.use('/products', productsRouter);
app.use(error);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo server.js para executar sua aplicaçao 
module.exports = app;