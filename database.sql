CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(1000),
    "role" VARCHAR(24)
);

CREATE TABLE "character_stats" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT REFERENCES "users",
    "name" VARCHAR(75),
    "strength" INT,
    "agility" INT,
    "creativity" INT,
    "energy" INT,
    "speed" INT,
    "education" INT,
    "rejection" INT,
    "charisma" INT,
    "skills" JSONB,
    "background" INT
    );

CREATE TABLE "backgrounds" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(120),
    "description" VARCHAR(1500),
    "stats" JSONB 
    );



