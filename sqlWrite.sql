create database HIGHBALLY default character set utf8 collate utf8_general_ci;

CREATE TABLE user_auth_info (
 id        INT NOT NULL AUTO_INCREMENT,
 user_id     VARCHAR(20),
 user_pw    VARCHAR(20),
 nick_name VARCHAR(40), 
  PRIMARY KEY(id)
);

INSERT INTO user_auth_info (id, user_id, user_pw, nick_name)
	   	    VALUE(NULL, 'admin',  'admin', 'admin');