require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const { getProductsByConditions } = require('./controllers/product');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/products', getProductsByConditions);

app.use((err, req, res, next) =>{
  if (err) {
      console.log(err)
      return res.status(err.statuscode || 500).json({message: err.message || "실패하였습니다. 관리자에게 문의 하세요"});
  };
  });

  

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
