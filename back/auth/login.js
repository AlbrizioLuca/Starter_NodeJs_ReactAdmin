const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../database/database-access");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Vérifiez l'utilisateur dans la base de données
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
      if (err) throw err;
      console.log("results: ", results);
      if (results.length > 0) {
        const user = results[0];

        // Comparez le mot de passe avec le mot de passe haché dans la base de données
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.json({ token });
          console.log("token: ", token);
        } else {
          res.status(401).send("Mot de passe incorrect");
        }
      } else {
        res.status(404).send("Utilisateur non trouvé");
      }
    });
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
