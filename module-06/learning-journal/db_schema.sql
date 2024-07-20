
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create tables

CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL,
	email TEXT NOT NULL,
	hashed_password BLOB NOT NULL,
	salt BLOB NOT NULL
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
INSERT INTO users ('username', 'email', 'hashed_password', 'salt') VALUES ('Simon', 'simon@gmail.com', '$2a$10$q1Cym9bgIT.1GRqU8maHVedRnrtmf4bHOuM1UAos6cCV7SLJ1ZsGS', '10'); -- password: test_1, salt: 10
INSERT INTO users ('username', 'email', 'hashed_password', 'salt') VALUES ('Alex', 'alex@yahoo.com', '$2a$10$0WRJNK52UpkymSHgs0DOgOZgIj/B/hH1MiHEcJEy4v41wBuSBvwca', '10'); -- password: test_2, salt: 10
INSERT INTO users ('username', 'email', 'hashed_password', 'salt') VALUES ('Dianne', 'dianne@london.ac.uk', '$2a$10$dH6xdXeH9BdojS5qLhBhEu20S2VzdtjBgHolITgoYn1mJx6oXplsa', '10');  -- password: test_3, salt: 10

COMMIT;

