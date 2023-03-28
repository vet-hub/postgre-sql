const express = require('express')
const app = express()

app.use(express.json())				
app.use(express.urlencoded({extended: true}))

// Basic routing
app.get('/', (req, res) => {
  res.send('Hello World!')
})


/* 
	express.Router  vs 	Basic routing
	https://expressjs.com/en/guide/routing.html
	Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

	The app will now be able to handle requests to /api and /api/user, as well as call the timeLog middleware function that is specific to the route. 
*/
const router = require("./router")			// my router.js
app.use("/api", router)

module.exports = app;				// CommonJS modules format





/*  default

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


*/