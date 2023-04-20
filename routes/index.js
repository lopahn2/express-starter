import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index.html'); 
});

export default router;
