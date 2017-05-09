CREATE TABLE players (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE, 
  cryptedPassword TEXT,
  salt TEXT,
  wins INTEGER,
  losses INTEGER
)
