const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { getAllShirts, createShirt, editShirt, deleteShirt, getCreateShirt, getEditShirt, getShirt } = require('../controllers/shirtControllers');

const router = express.Router();
router.route('/shirts').get(isLoggedIn, getAllShirts);
router.route('/shirts/new').post(isLoggedIn, createShirt);
router.route('/shirts/new').get(isLoggedIn, getCreateShirt);
router.route('/shirts/:id').get(isLoggedIn, getShirt);
router.route('/shirts/:id/edit').get(isLoggedIn, getEditShirt);
router.route('/shirts/:id/edit').patch(isLoggedIn, editShirt);
router.route('/shirts/:id/delete').delete(isLoggedIn, deleteShirt);
module.exports = router;