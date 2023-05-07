import express from 'express';
import sqlCon from '../db/sqlCon.js'
import verifyToken from '../middlewares/accessControl.js';
const conn = sqlCon();
const router = express.Router();


/* GET users listing. */
router.get('/', verifyToken, async (req, res, next) => {

  try {
    const queryResult = await conn.execute('SELECT * FROM user_auth_info');
    console.log(queryResult[0]);
    return res.status(200).json(
      {
        qR : queryResult[0]
      }
    )
  
  } catch(err) {
    console.log(err);
    return res.status(406).json(
			{
				error : "Not Acceptable", 
				message: "올바르지 않은 회원 정보입니다."
			}
		);
  }
  
});

export default router;
