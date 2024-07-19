
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create tables

CREATE TABLE IF NOT EXISTS users (
	user_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_name TEXT NOT NULL,
	email_address TEXT NOT NULL,
	password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
	article_id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT NOT NULL,
	image_url TEXT NOT NULL,
	author_id INTEGER NOT NULL,
	likes INTEGER DEFAULT 1,
	FOREIGN KEY (author_id) REFERENCES users(user_id)
);

-- Insert default data

-- Set up three users
INSERT INTO user ('user_name', 'email_address', 'password_hash') VALUES ('Simon', 'simon@gmail.com', '$2a$10$q1Cym9bgIT.1GRqU8maHVedRnrtmf4bHOuM1UAos6cCV7SLJ1ZsGS'); -- password: test_1 
INSERT INTO user ('user_name', 'email_address', 'password_hash') VALUES ('Alex', 'alex@hotmail.com', '$2a$10$0WRJNK52UpkymSHgs0DOgOZgIj/B/hH1MiHEcJEy4v41wBuSBvwca'); -- password: test_2
INSERT INTO user ('user_name', 'email_address', 'password_hash') VALUES ('Dianne', 'dianne@yahoo.co.uk', '$2a$10$dH6xdXeH9BdojS5qLhBhEu20S2VzdtjBgHolITgoYn1mJx6oXplsa');  -- password: test_3

COMMIT;

