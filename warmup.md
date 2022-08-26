// add strict
'use strict';

// single quotes on express
const express = require('express');

// parenthesis for the multiple parameters, slash to note endpoint
app.get('/username', (req, res) => {
  const userInfo = {};

// match request to req, change format
  userInfo.name = req.username;
  userInfo.password = req.password;


// change response to res, add semicolon
  res.send(info);
})

app.listen(PORT() => console.log(`Listening on ${PORT}`));