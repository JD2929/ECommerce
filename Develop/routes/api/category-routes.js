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

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value
    // Be sure to include its associated Products
    const categoryIdData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });

    if (categoryIdData) {
      res.json(categoryIdData);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const {name} = req.body; 
console.log (name)
    const categoryCreated = await Category.create({
      category_name: name,
    });

    res.json(categoryCreated); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
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
