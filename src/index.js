const express = require('express');
const app = express();
app.use(express.json());

let users = [];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);

  if (users.length === initialLength) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.status(200).json({ message: 'Usuário removido' });
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
