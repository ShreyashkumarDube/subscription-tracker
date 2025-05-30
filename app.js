import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import workflowRouter from './routes/workflow.routes.js';
//import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflow', workflowRouter);

app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API');
});

app.listen(PORT, async() => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

   await connectDB();
})

export default app;
