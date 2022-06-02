require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

//Morgan token is used to log HTTP requests to the console
morgan.token('content', function getContentToken(req) {
  if (Object.keys(req.body === 0)) {
    return null;
  }
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] :content'));
//---------------------------------------------------




//api/persons routes
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      if (result) response.json(result);
      else {
        const error = { name: 'IdNotFound' };
        return next(error);
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  if (Object.keys(body).length === 0 || body === undefined) {
    const err = { name: 'ContentMissing' };
    return next(err);
  }
  if (!body.name) {
    const err = { name: 'NameMissing' };

    return next(err);
  }
  if (!body.number) {
    const err = { name: 'NumberMissing' };

    return next(err);
  }

  const person = new Person({ ...body });
  person
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const object = request.body.newPersonObject;
  Person.findByIdAndUpdate(request.params.id, object, { new: true }).then((updatedPerson) => {
    response.json(updatedPerson);
  }).catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result != null) response.sendStatus(204).end();
      else {
        const err = { name: 'IdNotFound' };
        return next(err);
      }
    })
    .catch((error) => next(error));
});
//---------------------------------------------------




//Info route required in the task
app.get('/info', (request, response, next) => {
  Person.count({})
    .then(result => {
      const string = `Phonebook has info on ${result} people`;
      response.send(string).end();
    })
    .catch((error) => next(error));
});
//---------------------------------------------------




//Error handler required in the task (I really have no way of confirming did I use this right)
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'IdNotFound') {
    return response
      .status(404)
      .send({ error: 'Person with that id doesn\'t exist' });
  }

  if (error.name === 'ContentMissing') {
    return response.status(400).send({ error: 'malformatted object' });
  }

  if (error.name === 'NameMissing') {
    return response
      .status(400)
      .send({ error: 'malformatted object', reason: 'name missing' });
  }
  if (error.name === 'NumberMissing') {
    return response
      .status(400)
      .send({ error: 'malformatted object', reason: 'number missing' });
  }

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({error: 'Check the number input!'});
  }

  next(error);
};


//This has to be the last loaded in order for the next functions to work
app.use(errorHandler);

app.listen(process.env.PORT || 3001);
