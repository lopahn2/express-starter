import express from 'express';
import sqlCon from '../db/sqlCon.js'
import jwt from 'jsonwebtoken'
const conn = sqlCon();
const router = express.Router();


/* GET home page. */
router.post('/signup', async (req, res) => {
	const body = req.body;
  try {
		const [userSelectResult, fieldUser] = await conn.execute('SELECT * FROM user_auth_info WHERE id = ?', [body.id]);
		if (userSelectResult.length > 0) {
			return res.status(400).json({
				error : "Bad Request", 
				message: "이미 존재하는 아이디입니다."
			});
		}

		const userInfo = [null, body.id, body.pwd, body.nickName]; // 프론트 form 태그 내부 input의 name 속성과 같은 값
		await conn.execute('INSERT INTO user_auth_info VALUES (?,?,?,?)', userInfo);
		
		console.log("회원 DB 저장 성공");
		return res.status(201).json(
			{
				message : "회원가입에 성공했습니다. 회원의 비밀번호는 암호화 처리됩니다.",
				issue : "암호화 시간이 조금 소요될 수 있으니 기다려주세요."
			}
		);
	} catch (err) {
		console.error(err);
		return res.status(406).json(
			{
				error : "Not Acceptable", 
				message: "올바르지 않은 회원 정보입니다."
			}
		);
	}
});

router.post('/signin', async (req, res) => {
	const body = req.body;

	try {
		const queryResult = await conn.execute('SELECT * FROM user_auth_info WHERE user_id = ?', [body.id]);
    const userSelectResult = queryResult[0][0]
    console.log(userSelectResult);
		if (userSelectResult.user_pw === body.pwd) {
			const token = jwt.sign({
				id: userSelectResult.user_id,
        nick_name : userSelectResult.nick_name
			}, process.env.SECRET, {
				issuer: '@hwany9181'
			});
			
			//await redisLocalCon.set(recordedUserInfo.id, token);
			return res.status(200).json(
				{
					message : "로그인 성공! 토큰은 DB에 저장되어 관리됩니다.",
					issue : "암호화 시간이 조금 소요될 수 있으니 기다려주세요.",
					token
				}
			);	
			
		} else {
			return res.status(409).json(
				{
					error : "Conflict",
					message : "비밀번호가 일치하지 않습니다."
				}
			);
		}
		
	} catch (err) {
		console.log(err);
		return res.status(406).json(
			{
				error : "Not Acceptable",
				message : "회원 가입되지 않은 회원입니다."
			}
		);
	}
	
});


export default router;
