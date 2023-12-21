const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../database/database-access");
const router = express.Router();

// Créer un nouveau user
router.post("/", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [username, email, hashedPassword, role], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch {
    res.status(500).send();
  }
});

// Réccupérer TOUS les users
router.get("/", (req, res) => {
  const sql = "SELECT username, email, password, role FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Récupérer UN user via son id
router.get("/:id", (req, res) => {
  const sql = "SELECT username, email, password, role FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(404).send("Utilisateur non trouvé");
    }
  });
});

// Modifier UN user
router.patch("/:id", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "UPDATE users SET username = ?, email = ?, password = ? , role = ?  = ? WHERE id = ?";
    db.query(
      sql,
      [username, email, hashedPassword, role, req.params.id],
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch {
    res.status(500).send();
  }
});

// Supprimer UN user
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
