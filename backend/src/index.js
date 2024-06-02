const express = require('express')
const cors = require('cors');


const app = express()
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const authenticateToken = require('./middleware/authenticationToken');
  
const authRouter = require('./routes/Auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');	
const categoryRouter = require('./routes/category');
const exportInvoiceRouter = require('./routes/export-invoice');
const userInfoRouter = require('./routes/user-info');
const kpisRouter = require('./routes/kpiRoutes');
const UserKpiRouter = require('./routes/userKpiRoutes');

app.use('/auth', authRouter);
app.use('/user', authenticateToken, userRouter);
app.use('/product', authenticateToken, productRouter);
app.use('/category', authenticateToken, categoryRouter);
app.use('/invoice', authenticateToken, exportInvoiceRouter);
app.use('/user-info', authenticateToken, userInfoRouter);
app.use('/kpis', authenticateToken, kpisRouter);
app.use('/user-kpis', authenticateToken, UserKpiRouter);
app.use('/public/images', express.static('./public/images'));




app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`),
);
