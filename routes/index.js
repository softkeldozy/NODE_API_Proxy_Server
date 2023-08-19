const url = require('url');
const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const needle = require('needle');

// env variables
// "----When you add/change env var's meke sure to restart the server" 
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// init cache
let cache =apicache.middleware

router.get('/', cache('3 minutes'), async (req, res) => {
  try {
    //including the API key to the data being queried
   /******************************************** */ 
    const params = new URLSearchParams({
      [API_KEY_NAME] : API_KEY_VALUE, //This enable the code to be dynamic. any city can be passed to the api through the params object
      ...url.parse(req.url,true).query  // For the city being passed in the query string
    })
    /******************************************** */
    const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
    const data = apiRes.body
    res.status(200).json(data)    
  } 
  catch (error) {
    res.status(500).json({error}) 
  }
  
});


module.exports = router;