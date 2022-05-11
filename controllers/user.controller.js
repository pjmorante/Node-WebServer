const { response } = require('express');

const getUsers = (req, res = response) => {
  res.status(200).json({ msg: 'get API' });
};

const updateUser = (req, res = response) => {

  const { id } = req.params;
  res.status(200).json({ 
    msg: 'put API',
    id  
  });
};

const createUser = (req, res = response) => {

  const { name, age } = req.body;
  res.status(201).json({ 
    msg: 'post API',
    name,
    age
 });
};

const deleteUser = (req, res = response) => {
  res.json({ msg: 'delete API' });
};

module.exports = {
  getUsers,
  updateUser,
  createUser,
  deleteUser
}