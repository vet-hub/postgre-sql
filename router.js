
const { Router } = require("express");
const pool = require("./db");

/* 
	https://expressjs.com/en/guide/routing.html
	Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
*/

const router = Router();

router.get("/user", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from users");
    res.json({ data: rows });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;