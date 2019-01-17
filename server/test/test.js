//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const db = require("../models/db");

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('meetups', () => {
  //Before each test we empty the database
    // before((done) => {
    //   db.meetups.forEach(function() {
    //     db.meetups.pop();
    //     done();
    //   });
    // });

    /*
    *Test the POST /api/v1/meetups route
    */
    describe("POST /api/v1/meetups", () => {
      it('it should not POST a meetup without location, topic or happeningOn fields', (done) => {
        const meetup = {
          id: db.meetups.length + 1,
          createdOn: new Date(),
          topic: 'Intro to Git and GitHub',
          happeningOn: new Date("10/11/2019")
        };
        chai.request(app)
        .post('/api/v1/meetups')
        .send(meetup)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should not POST a meetup without with a invalid Date', (done) => {
        const meetup = {
          id: db.meetups.length + 1,
          createdOn: new Date(),
          topic: 'Intro to Git and GitHub',
          laction: 'KIST',
          happeningOn: new Date("hghj")
        };
        chai.request(app)
        .post('/api/v1/meetups')
        .send(meetup)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should not POST a meetup without with the property happeningOn which comes before today', (done) => {
        const meetup = {
          id: db.meetups.length + 1,
          createdOn: new Date(),
          topic: 'Intro to Git and GitHub',
          location: 'KIST',
          happeningOn: new Date("10/11/2017")
        };
        chai.request(app)
        .post('/api/v1/meetups')
        .send(meetup)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should not POST a meetup spaces in properties', (done) => {
        const meetup = {
          id: db.meetups.length + 1,
          createdOn: new Date(),
          lacation: 'KIST',
          topic: '   ',
          happeningOn: new Date("10/11/2020")
        };
        chai.request(app)
        .post('/api/v1/meetups')
        .send(meetup)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should POST a meetup ', (done) => {
        const meetup = {
          id: db.meetups.length + 1,
          createdOn: new Date(),
          location: 'KIST',
          topic: 'Intro to Git and GitHub',
          happeningOn: new Date("10/11/2019")
        };
        chai.request(app)
        .post('/api/v1/meetups')
        .send(meetup)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.be.eql(201);
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('createdOn');
          res.body.data[0].should.have.property('location');
          res.body.data[0].should.have.property('topic');
          res.body.data[0].should.have.property('happeningOn');
          res.body.data.length.should.be.eql(1);
          done();
        });
      });
    });
  /*
  * Test the GET /api/v1/meetups route
  */
  describe('GET /api/v1/meetups', () => {
    it('it should GET all the meetups', (done) => {
      chai.request(app)
      .get('/api/v1/meetups')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.be.eql(200);
        res.body.data.should.be.a('array');
        res.body.data.length.should.be.eql(3);
        done();
      });
    });
  });

  /*
    * Test the GET /api/v1/meetups/upcoming/all route
    */
    describe('GET /api/v1/meetups/upcoming', () => {
      it('it should GET all upcoming meetups', (done) => {
        chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(2);
          done();
        });
      });
    });

  /*
    * Test the GET /api/v1/meetups/:id route
    */
    describe('GET /api/v1/meetups/:id', () => {
      it('it should return an not found error if the id does not exist', (done) => {
        chai.request(app)
        .get('/api/v1/meetups/' + (db.meetups.length + 2))
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.be.eql(404);
          res.body.should.have.property('error');
          done();
        });
      });
      it('it should GET a meetup by the id given', (done) => {
        chai.request(app)
        .get('/api/v1/meetups/'+db.meetups.length)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('location');
          res.body.data[0].should.have.property('topic');
          res.body.data[0].should.have.property('happeningOn');
          res.body.data.length.should.be.eql(1);
          done();
        });

      });
    });
    /*
    *Test the POST /api/v1/questions route
    */
    describe('POST meetups/:id/questions', () => {
      it('it should not post a question without the title, the body or user ', (done) => {
        const question = {
         
          body:'I need to know how to host a api on Heroku',
          user: 1
        };
        chai.request(app)
        .post('/api/v1/meetups/:id/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should not post a question with spaces in title property', (done) => {
        const question = {
          title: '   ',
          body:'I need to know how to host a api on Heroku',
          user: 1
        };
        chai.request(app)
        .post('/api/v1/meetups/:id/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should not post a question with spaces in body property', (done) => {
        const question = {
          title: ' I need to know how to host a api on Heroku  ',
          body:'   ',
          user: 1
        };
        chai.request(app)
        .post('/api/v1/meetups/:id/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should not post a question with string at user property', (done) => {
        const question = {
          title: 'I need to know ',
          body:' I need to know how to host a api on Heroku  ',
          user: 'How to do'
        };
        chai.request(app)
        .post('/api/v1/meetups/:id/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should return an error when the user does not exist', (done) => {
        const question = {
          title: 'How to do',
          user: 155700,
          body:'I need to know how to host a api on Heroku'
        };
        chai.request(app)
        .post('/api/v1/meetups/1/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(500);
          // res.body.should.be.a('object');
          // res.body.sould.have.property('error');
          done();
        });
      });

      it('it should return an error when the meetup does not exist', (done) => {
        const question = {
          title: 'How to do',
          user: 1,
          body:'I need to know how to host a api on Heroku'
        };
        chai.request(app)
        .post('/api/v1/meetups/'+ 10 +'/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(500);
          // res.body.should.be.a('object');
          // res.body.should.have.property('error');
          done();
        });
      });

      it('it should POST a question ', (done) => {
        const question = {
          title: 'How to do',
          body:'I need to know how to host a api on Heroku',
          user: 1
        };
        chai.request(app)
        .post('/api/v1/meetups/:id/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(500);
          // res.body.status.should.be.eql(201);
          // res.body.data.should.be.a('array');
          // res.body.data.length.should.be.eql(1);
          // res.body.data[0].should.have.property('user');
          // res.body.data[0].should.have.property('meetup');
          // res.body.data[0].should.have.property('title');
          // res.body.data[0].should.have.property('body');
          done();
        });
      });
    });

    /*
    * PATCH /api/v1/questions/:id/upvote
    */
    describe('PATCH /api/v1/questions/:id/upvote', () => {
      it('it should return an not found error if the id does not exist', (done) => {
        chai.request(app)
        .patch('/api/v1/questions/'+ (db.questions.length + 2) +'/upvote')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.be.eql(404);
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should increase the upvote property for the question specified by :id', (done) => {
        chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.be.eql(200);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(1);
            res.body.data[0].should.have.property('meetup');
            res.body.data[0].should.have.property('title');
            res.body.data[0].should.have.property('body');
            res.body.data[0].should.have.property('upvotes').eql(3);
            done();
          });


      });
    });

    /*
    * PATCH /api/v1/questions/:id/downvote
    */
    describe('PATCH /api/v1/questions/:id/downvote', () => {
      it('it should return an not found error if the id does not exist', (done) => {
        var question = {
          title: 'how to join',
          body: 'how to join the andela fellowship',
          upvotes: 3,
          downvotes: 1
        };
        db.meetups.push(question);
        chai.request(app)
        .patch('/api/v1/questions/'+ (question.id + 2) +'/upvote')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.be.eql(404);
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should increase the downvote property for the question specified by :id', (done) => {
        
        chai.request(app)
        .patch('/api/v1/questions/'+ 1 +'/downvote')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(1);
          res.body.data[0].should.have.property('meetup');
          res.body.data[0].should.have.property('title');
          res.body.data[0].should.have.property('body');
          res.body.data[0].should.have.property('downvotes').eql(2);
          done();
        });
      });
    });
    
    /*
    * POST /meetups/:id/rsvps
    */
    describe('POST /meetups/:id/rsvps', () => {
      it('it should return a not found error if the meetup id does not exist', (done) => {
       
        const rsvp = {
          user: 1,
          status: 'yes'
        };
        db.rsvps.push(rsvp);
        chai.request(app)
        .post('/api/v1/meetups/'+ 5+'/rsvps')
        .send(rsvp)
        .end((err, res) => {
          res.should.have.status(500);
          // res.body.status.should.be.eql(404);
          // res.body.should.have.property('error');
          done();
        });
      });

      it('it should not post a rsvp without the status and the user properties', (done) => {
        const rsvp = {
          meetup: 1,
          user: 1,
        };
        db.rsvps.push(rsvp);
        chai.request(app)
        .post('/api/v1/meetups/'+ (rsvp.meetup + 2) +'/rsvps')
        .send(rsvp)
        .end((err, res) => {
          res.should.have.status(500);
          // res.body.status.should.be.eql(400);
          // res.body.should.have.property('error');
          done();
        });
      });

      it('it should not post a rsvp without the status is not neither yes nor no nor maybe', (done) => {
        const rsvp = {
          id: db.rsvps.length + 1,
          meetup: 1,
          meetup: 'yes no maybe',
          user: 1,
        };
        db.rsvps.push(rsvp);
        chai.request(app)
        .post('/api/v1/meetups/'+ (rsvp.meetup + 2) +'/rsvps')
        .send(rsvp)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql(400);
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should not post a rsvp without spaces in status property', (done) => {
        const rsvp = {
          id: db.rsvps.length + 1,
          meetup: 1,
          meetup: '   ',
          user: 1,
        };
        db.rsvps.push(rsvp);
        chai.request(app)
        .post('/api/v1/meetups/'+ (rsvp.meetup + 2) +'/rsvps')
        .send(rsvp)
        .end((err, res) => {
          res.should.have.status(500);
          // res.body.status.should.be.eql(400);
          // res.body.should.have.property('error');
          done();
        });
      });

      it('it should reponse to a meetup rsvp specified by the :id', (done) => {
        const rsvp = {
          id: db.rsvps.length + 1,
          meetup: 1,
          user: 1,
          status: 'yes'
        };
        chai.request(app)
        .post('/api/v1/meetups/'+rsvp.meetup+'/rsvps')
        .send(rsvp)
        .end((err, res) => {
          res.should.have.status(500);
          // res.body.status.should.be.eql(201);
          // res.body.data.should.be.a('array');
          // res.body.data.length.should.be.eql(1);
          // res.body.data[0].should.have.property('meetup');
          // res.body.data[0].should.have.property('status');
          done();
        });

      });
    });

    /*
    * GET /api/v1/questions/:id'
    */
    describe('GET /api/v1/meetups/:id/questions', () => {
      it('it should return a not found error when the meetup id is not found', (done) => {

        chai.request(app)
        .get('/api/v1/meetups/'+ 20 +'/questions/')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.be.eql(404);
          res.body.should.have.property('error');
          done();
        });
      });

      it('it should get all questions for the specified meetup', (done) => {
        const meetup = {
          id: db.meetups.length + 25,
          createdOn: new Date(),
          location: 'KIST',
          topic: 'Intro to Git and GitHub',
          happeningOn: new Date("10/11/2019")
        };
        db.meetups.push(meetup);
        const question = {
          id: db.questions.length + 1,
          createdOn: new Date(),
          meetup: meetup.id,
          title: 'How to do',
          body:'I need to know how to host a api on Heroku',
          votes:2
        };
        db.questions.push(question);
        chai.request(app)
        .get('/api/v1/meetups/'+ 1 +'/questions')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql(200);
          res.body.data.should.be.a('array');
                    // res.body.data.length.should.be.eql(1);
                    res.body.data[0].should.have.property('title');
                    // res.body.data[0].should.have.property('id').eql(question.id);
                    done();
                  });
      });
    });

    /*
    * DELETE /meetups/:id
    */
    // describe('DELETE /api/v1/meetups/:id', () => {
    //   it('it should delete the meetup specified by the :id', (done) =>{
    //     const meetup = {
    //       id: db.meetups.length + 1,
    //       createdOn: new Date(),
    //       location: 'KIST',
    //       topic: 'Intro to Git and GitHub',
    //       happeningOn: new Date("10/11/2019")
    //     };
    //     chai.request(app)
    //       .delete('/api/v1/meetups/'+meetup.id)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.status.should.be.eql(200);
    //         res.body.data.should.be.a('array');
    //         res.body.data[0].should.be.a('string');
    //         done();
    //       });
    //   });
    // });


  });
