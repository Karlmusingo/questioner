# questioner

[![Build Status](https://travis-ci.com/Karlmusingo/questioner.svg?branch=develop)](https://travis-ci.com/Karlmusingo/questioner)

Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

# Tech/Framework Used:
* [Git](https://git-scm.com/downloads)
* [Express](https://expressjs.com/)
* [Nodejs](https://nodejs.org/en/)

# Installation
```

git clone https://github.com/Inclet/questioner.git

cd questioner

npm install

```
# To start the server
```

npm start

```
# To run tests
```

npm test

```
# API Reference
You need need [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop//%40) to test APIs.

` GET api/v1/meetups ` Fetch all meetup records.

` GET api/v1/meetups/<meetup-id> ` Fetch a specific meetup record.

` GET api/v1/meetups/upcoming ` Fetch all upcoming meetup records.

` POST api/v1/meetups ` Create a meetup record.

` POST api/v1/meetups/<meetup-id>/rsvps ` Respond to meetup RSVP.

` GET api/v1/meetups/<meetup-id>/questions ` Fetch all for a specific meetup.

` POST api/v1/meetups/<meetup-id>/questions ` create question record.

` PATCH api/v1/questions/<question-id>/upvote ` Upvote a specific question.

` PATCH api/v1/questions/<question-id>/downvote ` Downvote a specific question.

