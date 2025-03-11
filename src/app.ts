import express, { RequestHandler } from 'express';
import cors from 'cors';

import userRoutes from './routes/user';
import subjectRoutes  from './routes/subject';

// Initializations
const app: express.Application = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json() as RequestHandler);


// Routes
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);

export default app;
