import jwt from 'jsonwebtoken';
import sqlCon from '../db/sqlCon.js'
const conn = sqlCon();


const verifyToken = async (req, res, next) => {
	try {
		req.decoded = jwt.verify(req.headers.authorization.replace(/^Bearer\s/, ''), process.env.SECRET);
		if(req.decoded.allowResult) {
			return res.status(403).json({
				error : '403 Forbidden',
				message: 'Authorization 토큰이 아닙니다.'
			});
		}
	
		const queryResult = await conn.execute('SELECT * FROM user_auth_info WHERE id = ?', [req.decoded.id]);
    const DBSearchResult = queryResult[0][0]

		if (DBSearchResult !== null) {
			return next();	
		} else {
			throw new Error('TokenExpiredError');
		}
		
	} catch (err) {
		if (err.name == "TokenExpiredError") {
			return res.status(403).json({
					error : '403 Forbidden',
					message: '토큰이 만료됐습니다.'
				});
		}
		console.log(err);
		return res.status(403).json({
					error : '403 Forbidden',
					message: '유효하지 않은 토큰입니다.'
				});
	}
}

export default verifyToken