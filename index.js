const express = require('express');
const bodyParser = require('body-parser');
const { user } = require('./models');
var router = express.Router()
var birds = require('./controllers/birds');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/users', async (req, res) => {
  try{
    const users = await user.findAll({where: "x"});
    res.send(users);
  }catch(e){
    res.statusCode = 500;
    res.send({error: "error"});
  }
});

app.get('/users/(:id)', (req, res) => {
  console.log(JSON.stringify(req.params));
  user.findOne({where: req.params}).then(user => {
    res.send(user);
  });
});

app.post('/users', (req, res) => {
  user.create(req.body);
  res.send();
});

app.delete('/users/(:id)', (req, res) => {
  user.destroy({
    where: req.params
  });
  res.send({deleted: req.params.id})
});

app.put('/users/(:id)', (req, res) => {
  user.update(req.body, {
    where: req.params
  }).then( rec => {
    res.send({updated: rec});
  })
});

app.listen(3000);
