const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll ({
    include: [Product]
  })
  .then((category)=> res.json(category))
  .catch ((error) => res.status(500).json(error))
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne ({
    where: {
      id:req.params.id
    },
    include: [Product]
  })
  .then((category)=> res.json(category))
  .catch ((error) => res.status(500).json(error))
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create (req.body)
  .then((category)=> res.json(category))
  .catch ((error) => res.status(500).json(error))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update (req.body,{
    where: {
      id:req.params.id
    }
  })
  .then((category)=> res.json(category))
  .catch ((error) => res.status(500).json(error))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy ({
    where:{
      id:req.params.id
    }
  })
  .then((category)=> res.json(category))
  .catch ((error) => res.status(500).json(error))
});

module.exports = router;
