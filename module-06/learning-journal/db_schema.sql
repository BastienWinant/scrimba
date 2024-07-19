
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)

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

-- Insert default data (if necessary here)

-- Set up three users
INSERT INTO users ('user_name') VALUES ('Simon Star');
INSERT INTO users ('user_name') VALUES ('Dianne Dean');
INSERT INTO users ('user_name') VALUES ('Harry Hilbert');

-- Give Simon two email addresses and Diane one, but Harry has none
INSERT INTO email_accounts ('email_address', 'user_id') VALUES ('simon@gmail.com', 1); 
INSERT INTO email_accounts ('email_address', 'user_id') VALUES ('simon@hotmail.com', 1); 
INSERT INTO email_accounts ('email_address', 'user_id') VALUES ('dianne@yahoo.co.uk', 2); 

COMMIT;

