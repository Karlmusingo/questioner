/* eslint-disable no-console */
/* eslint-disable no-tabs */
// Set up the express app
import express from 'express';
import { json, urlencoded } from 'body-parser';
import meetupRouter from './server/routes/meetupsRoutes';
import questionRouter from './server/routes/questionsRoutes';
import authRouter from './server/routes/authRoutes';

const app = express();


// Parse incoming requests data
app.use(json());
app.use(urlencoded({ extended: false }));


app.use('/api/v1/meetups/', meetupRouter);
app.use('/api/v1/questions/', questionRouter);
app.use('/api/v1/auth/', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server listening on PORT ${PORT}`);
});
export default app;
