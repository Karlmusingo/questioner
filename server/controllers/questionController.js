const db = require('../models/db.js');

module.exports = {
	create:(req,res)=>{
		
		if(!req.body.title || req.body.title.trim() == ''){
			return res.status(400).send({
				status: 400,
				error: 'the title property is required >>'
			});
		} else if (!req.body.body || req.body.body.trim() == '') {
			return res.status(400).send({
				status: 400,
				error: 'the body property is required >>'
			});
		} else if (!req.body.user || req.body.user.trim() == '') {
			return res.status(400).send({
				status: 400,
				error: 'the user property is required >>'
			});
		} else if(isNaN(req.body.user)){
			return res.status(400).send({
				status: 400,
				error: 'invalid user >>'
			});

		} else if(!(db.users.find(u => u.id === parseInt(req.body.user))))  {
			return res.status(404).send({
				status: 404,
				error: 'the user  is not found'
			});
		} else if(!(db.meetups.find(m => m.id === parseInt(req.params.id)))){
			return res.status(404).send({
				status: 404,
				error: 'the meetup does not exist >>>'
			});
		}

		const question = {
			id: db.questions.length + 1,
			createdOn : new Date(),
			title: req.body.title.trim(),
			body: req.body.body.trim(),
			upvotes: 0,
			downvotes: 0,
			user: parseInt(req.body.user),
			meetup: parseInt(req.params.id)
		};

		db.questions.push(question);

		return res.status(201).send({
			status: 201,
			data:[{
				user: question.user,
				meetup: question.meetup,
				title: question.title,
				body: question.body
			}]
		});
	},

	upvote: (req, res) => {
		const id = parseInt(req.params.id, 10);
		let flag = false;
		db.questions.forEach(function (question) {
			if (question.id === id) {
				question.upvotes += 1;
				flag = true;
				return res.status(200).send({
					status: 200,
					data:[{
						meetup: question.meetup,
						title: question.title,
						body: question.body,
						upvotes: question.upvotes,
						downvotes: question.downvotes
					}]
				});
			}
		});
		if(!flag){
			return res.status(404).send({
				status: 404,
				error: 'the question id is not found'
			});
		}
		
	}, 

	downvote: (req, res) => {
		const id = parseInt(req.params.id, 10);
		let flag = false;
		db.questions.forEach(function (question) {
			if (question.id === id) {
				question.downvotes += 1;
				flag = true;
				return res.status(200).send({
					status: 200,
					data:[{
						meetup: question.meetup,
						title: question.title,
						body: question.body,
						upvotes: question.upvotes,
						downvotes: question.downvotes
					}]
				});
			}

		});
		if(!flag){
			return res.status(404).send({
				status: 404,
				error: 'the question id is not found'
			});
		}
	},

	getQuestionsForASpecificMeetup: (req, res) => {

		const id = parseInt(req.params.id, 10);
		let flag = false;
		db.meetups.forEach(function (meetup) {
			if(meetup.id === id){
				const data = [];
				flag = true;
				db.questions.forEach(function (question) {

					if(question.meetup === meetup.id){
						data.push(question);
					}
				});
				return res.status(200).send({
					status: 200,
					data: data
				});
			}
		});

		if (!flag) {
			return res.status(404).send({
				status: 404,
				error : 'the meetup is not found'
			});
		}
		
		
	}


}