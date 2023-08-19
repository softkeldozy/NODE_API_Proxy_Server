const express = require('express')
const cors = require ('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT =process.env.PORT || 5000
const app = express()
/*********************************************************/
// Rate Limiter=> reduces the number of requests made to the server for spaming 
const limiter = rateLimit({
  // windowMS: 10*60*1000, 10mins
  max: 10,
})
app.use(limiter)
app.set('trust proxy', 1)
/*********************************************************/

// static folder
app.use(express.static("public"))

// Routes
app.use('/api', require('./routes/index'))


// Enable cors support
app.use(cors())

app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`);})