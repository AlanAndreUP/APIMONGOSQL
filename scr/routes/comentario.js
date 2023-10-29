const express = require('express');
const router = express.Router();
const Comentarios = require('../models/ComentarioModel');

router.post('/', async (req, res) => {
  const newItemData = req.body;

  router.delete('/:fecha', async (req, res) => {
    const fechaComentario = req.params.fecha;
  
    try {
      // Utiliza el método adecuado para borrar comentarios por fecha
      const result = await Comentarios.deleteMany({ fecha: fechaComentario });
  
      if (result.deletedCount > 0) {
        res.json({ message: 'Comentarios eliminados por fecha' });
      } else {
        res.status(404).json({ error: 'No se encontraron comentarios para la fecha dada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/:publicacion_id', async (req, res) => {
    const publicacionId = req.params.publicacion_id;
  
    try {
      const result = await Comentarios.deleteMany({ IDPublicacion: publicacionId });
  
      if (result.deletedCount > 0) {
        res.json({ message: 'Comentarios eliminados por ID de publicación' });
      } else {
        res.status(404).json({ error: 'No se encontraron comentarios para la publicación dada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  try {
    const newItem = new Comentarios(newItemData);
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
    const items = await Comentarios.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Comentarios.findOne({ IDCliente: itemId });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:publicacion_id', async (req, res) => {
  const itemId = req.params.publicacion_id;

  try{
    const item = await Comentarios.find({IDPublicacion: itemId});
    if(item){
      res.json(item);
    } else{
      res.status(404).json({error: "lista no encontrada"});
    }
  } catch (err){
    res.status(500).json({ error: err.message});
  }
})

router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  const updatedItemData = req.body;

  try {
    const result = await Comentarios.findOneAndUpdate({ id: itemId }, updatedItemData, { new: true });

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
    const result = await Comentarios.findOneAndRemove({ IDCliente: itemId });

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
