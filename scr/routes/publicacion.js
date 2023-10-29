const express = require('express');
const router = express.Router();
const publicaciones = require('../models/PublicacionModel.js');

router.delete('/fecha/:fecha', async (req, res) => {
  const fechaPublicacion = req.params.fecha;

  try {
    const result = await publicaciones.deleteMany({ fecha: fechaPublicacion });

    if (result.deletedCount > 0) {
      res.json({ message: 'Publicaciones eliminadas por fecha' });
    } else {
      res.status(404).json({ error: 'No se encontraron publicaciones para la fecha dada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/usuario/:id', async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const publicaciones = await Publicacion.find({ IDCliente: usuarioId });

    if (publicaciones.length > 0) {
      res.json(publicaciones);
    } else {
      res.status(404).json({ error: 'No se encontraron publicaciones para este usuario' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const newItemData = req.body;

  try {
    const newItem = new publicaciones(newItemData);
    const result = await newItem.save();

    if (result) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ error: 'Error en la inserción de datos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const items = await publicaciones.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await publicaciones.findOne({ IDCliente: itemId });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  const updatedItemData = req.body;

  try {
    const result = await publicaciones.findOneAndUpdate({ IDCliente: itemId }, updatedItemData, { new: true });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const result = await publicaciones.findOneAndRemove({ IDCliente: itemId });

    if (result) {
      res.json({ message: 'El objeto fue eliminado' });
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
