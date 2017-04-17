CREATE TABLE players (
  id INTEGER PRIMARY KEY,
  playerName TEXT UNIQUE,
  cryptedPassword TEXT,
  salt TEXT,
  wins INTEGER,
  losses INTEGER
)
