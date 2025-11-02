const express = require("express");
const db = require("../utils/database");
const logger = require("../utils/logger");

const router = express.Router();

const ALLOWED_TABLES = ["users", "wallets", "transactions", "categories"];

// Tábla validáció
function validateTable(req, res) {
  const table = req.params.table;
  if (!ALLOWED_TABLES.includes(table)) {
    res.status(400).json({ error: "Nem engedélyezett tábla." });
    return false;
  }
  return true;
}

// GET /:table
router.get("/:table", (req, res) => {
  if (!validateTable(req, res)) return;

  const table = req.params.table;
  db.query(`SELECT * FROM ${table}`, [], (err, results) => {
    if (err) {
      logger.error(`DB hiba (${table}):`, err);
      return res.status(500).json({ error: "Adatbázis hiba." });
    }
    res.json(results);
  });
});

// GET /:table/:id
router.get("/:table/:id", (req, res) => {
  if (!validateTable(req, res)) return;
  const { table, id } = req.params;

  db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results) => {
    if (err) {
      logger.error(`DB hiba (${table} id=${id}):`, err);
      return res.status(500).json({ error: "Adatbázis hiba." });
    }
    if (results.length === 0)
      return res.status(404).json({ error: "Nem található." });
    res.json(results[0]);
  });
});

// POST /:table
router.post("/:table", (req, res) => {
  if (!validateTable(req, res)) return;
  const table = req.params.table;
  const data = req.body;

  db.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
    if (err) {
      logger.error(`DB hiba beszúrásnál (${table}):`, err);
      return res.status(500).json({ error: "Adatbázis hiba." });
    }
    res.status(201).json({ id: result.insertId, ...data });
  });
});

// PATCH /:table/:id
router.patch("/:table/:id", (req, res) => {
  if (!validateTable(req, res)) return;
  const { table, id } = req.params;
  const data = req.body;

  db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err) => {
    if (err) {
      logger.error(`DB hiba frissítésnél (${table} id=${id}):`, err);
      return res.status(500).json({ error: "Adatbázis hiba." });
    }
    res.json({ message: "Frissítve." });
  });
});

// DELETE /:table/:id
router.delete("/:table/:id", (req, res) => {
  if (!validateTable(req, res)) return;
  const { table, id } = req.params;

  db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err) => {
    if (err) {
      logger.error(`DB hiba törlésnél (${table} id=${id}):`, err);
      return res.status(500).json({ error: "Adatbázis hiba." });
    }
    res.json({ message: "Törölve." });
  });
});

module.exports = router;
