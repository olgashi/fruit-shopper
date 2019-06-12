const router = require('express').Router()
const {Product} = require('../db/models/product')
module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product.dataValues).end()
  } catch (err) {
    next(err)
  }
})
