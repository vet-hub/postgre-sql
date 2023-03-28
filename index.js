const app = require("./server")
const port = 8000
require('dotenv').config();

// console.log('env-test', process.env.PGCONNECTIONSTRING);    


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});