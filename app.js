/* eslint-disable no-tabs */
// Set up the express app
import express from 'express';
import { json, urlencoded } from 'body-parser';
import meetupRouter from './server/routes/meetupsRoutes';
import questionRouter from './server/routes/questionsRoutes';

const app = express();


// Parse incoming requests data
app.use(json());
app.use(urlencoded({ extended: false }));


app.use('/api/v1/meetups/', meetupRouter);
app.use('/api/v1/questions/', questionRouter);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on PORT ${PORT}`);
});
export default app;
