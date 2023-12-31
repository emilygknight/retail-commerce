const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryAll = await Category.findAll();
    res.status(200).json(categoryAll);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
     
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCatagory = await Category.update(req.body,
    {
      // All the fields you can update and the data attached to the request body.
      where: {
        id: req.params.id,
      },

    });
    if (!updatedCatagory[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(updatedCatagory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
      // include: [{ model: Product }],
    }
  });
  
  if (!deletedCategory) {
    res.status(404).json({ message: 'No category found with this id!' });
    return;
  }

  res.status(200).json({ message: 'Category deleted successfully!' });
} catch (err) {
  res.status(500).json(err);
  console.log(err);
}
});


module.exports = router;

