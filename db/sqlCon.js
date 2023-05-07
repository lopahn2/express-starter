import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({ path: '../.env' });

export default () => {
	const connection = mysql.createPool(
		{
			host: process.env.HOST, 
			user: process.env.DBUSER, 
			database: process.env.DATABASE, 
			//Promise: bluebird
		});	
	return connection
}