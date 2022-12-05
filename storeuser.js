const http = require('http');
const express = require('express');
const app = express();
const port = 1000;
app.use(express.json());

const users = [
  {
    id: 1,
    name: 'Harish Kumar',
    age: 22,
    place: 'Chennai',
  },
  {
    id: 2,
    name: 'Gowtham Prabhu',
    age: 22,
    place: 'CBE',

  },
  {
    id: 3,
    name: 'Arun Kumar',
    age: 22,
    place: 'Salem',
  },
];

app.get('/users', (req, res) => {
  try {
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve all users',
    });
  }
});

app.get('/users/:userID', (req, res) => {
  const id = parseInt(req.params.userID);
  try {
    let user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve user',
    });
  }
});


app.post('/create', (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: 'Request body cannot be empty',
    });
  }
  const { name, age, place } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    age,
    place,

  };
  try {
    users.push(newUser);
    res.status(201).json({
      message: 'Successfully created a new user',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create user',
    });
  }
});

app.put('/users/:userID', (req, res) => {
  try {
    const id = parseInt(req.params.userID);
    let user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    const userIDX = users.indexOf(user);
    users[userIDX].name = req.body.name || users[userIDX].name;
    users[userIDX].place = req.body.place || users[userIDX].place;
    res.status(200).json({
      message: 'Successfully updated user',
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve user',
    });
  }
});

app.delete('/users', (req, res) => {
  try {
    users.splice(0, users.length);
    res.status(200).json({
      message: 'Successfully deleted all users',
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete users',
      x,
    });
  }
});

app.delete('/users/:userID', (req, res) => {
  try {
    const id = req.params.userID;
    let userIDX = users.findIndex((user) => user.id === id);
    if (!userIDX) {
      res.status(404).json({
        message: 'User not found',
      });
    }
    users.splice(userIDX, 1);
    res.status(200).json({
      message: 'Successfully deleted user',
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete user',
    });
  }
});

app.get('/cred', (res, res) => {
  res.cred
})

app.post('/creds', (res, res) => {
  const user = { username: req.body.name, passsword: req.body.password}
})

app.listen(port);