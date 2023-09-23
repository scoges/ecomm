const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  await Category.findAll({
    attributes: ["id", "category_name"],
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  })
  .then((categories) => {
    res.json(categories);
  })
});

router.get('/:id', async (req, res) => {
  await Category.findByPk(req.params.id, {
    attributes: ["id", "category_name"],
		include: [
			{
				model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
			}
		],
	})
  .then((category) => {
    res.json(category);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create(req.body)
		.then((newCategory) => res.status(200).json(newCategory))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
  .then(cat => Category.findByPk(req.params.id))
  .then((updatedCategory) => res.status(200).json(updatedCategory))
  .catch((err) => {res.json(err);});
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
	await Category.destroy({
		where: {
			id: req.params.id,
		},
	})
	.then((rmvdCategory) => {
		res.json(`Category has been removed`);
	})
	.catch((err) => {
		res.json(err);
	});
});