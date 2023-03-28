
const { Router } = require("express");
const pool = require("./db");

/* 
	https://expressjs.com/en/guide/routing.html
	Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
*/

const router = Router();

router.get("/", async (req, res) => {
	try {
	   res.send('Hallo root /api')
	} catch (err) {
	  res.sendStatus(500);
	}
 });

router.get("/test", async (req, res) => {
	try {
	  res.send('Hallo test /api/test')
	} catch (err) {
	  res.sendStatus(err);
	}
 });
 
//  GET  /  : To get all the users 
router.get("/user", async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * from users');
    res.json({ data: rows });
  } catch (err) {
    res.sendStatus(500);
  }
});

//  GET  /:id :  To get one user (with the id) 
router.get("/user/:id", async (req, res) => {
	const { id } = req.params;
	try {
	  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1;", [id]);
	  res.json({ data: rows });
	} catch (e) {
	  res.sendStatus(404);
	}
 });

//  POST / -> To create a new user 
router.post("/user", async (req, res) => {
	const { firstname, lastname, age } = req.body;
	try {
	  const { rows } = await pool.query(
		 "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
		 [firstname, lastname, age]
	  );
	  res.json({ data: rows });
	} catch (e) {
	  res.sendStatus(403);
	}
 });

//  PUT /:id  :  To edit one user (with the id) 
router.put("/user/:id", async (req, res) => {
	const { id } = req.params;
	const { firstname } = req.body;
	try {
	  const { rows } = await pool.query(
		 "UPDATE users SET first_name=$1 WHERE id=$2 RETURNING *",
		 [firstname, id]
	  );
	  res.json({ data: rows });
	} catch (e) {
	  res.sendStatus(403);
	}
 });

//  DELETE  /:id : To delete one user (with the id)
router.delete("/user/:id", async (req, res) => {
	const { id } = req.params;
	try {
	  const { rows } = await pool.query("DELETE FROM users WHERE id=$1", [id]);
	  res.json({ message: `user with id${id} deleted` });
	} catch (err) {
	  res.sendStatus(404);
	}
 });

module.exports = router;