const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../utils/database");
const logger = require("../utils/logger");

const router = express.Router();

// Regisztráció
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Hiányzó adatok." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) {
        logger.error("DB hiba regisztrációnál:", err);
        return res.status(500).json({ error: "Adatbázis hiba." });
      }
      logger.info(`Új felhasználó: ${email}`);
      res.status(201).json({
        message: "Felhasználó regisztrálva.",
        id: result.insertId,
      });
    }
  );
});

// Bejelentkezés
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Hiányzó adatok." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      logger.error("DB hiba bejelentkezésnél:", err);
      return res.status(500).json({ error: "Adatbázis hiba." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Hibás email vagy jelszó." });
    }

    const user = results[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Hibás email vagy jelszó." });
    }

    logger.info(`Bejelentkezett: ${email}`);
    res.status(200).json({
      message: "Bejelentkezés sikeres.",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

module.exports = router;
