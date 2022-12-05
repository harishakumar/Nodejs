const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const cred = {
  name: 'harishakumar',
  password: 'qwerty123',
};

app.get('/cred', (req, res) => {
  res.json(cred);
});

app.post('/creds', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    cred.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post('/cred/login', async (req, res) => {
  const user = cred.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(8000);
