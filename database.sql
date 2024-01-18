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
    "life" INT,
    "alive" BOOLEAN,
    "basic_skills" JSONB,
    "thieving_skills" JSONB,
    "crime_skills" JSONB,
    "network_skills" JSONB,
    "corporate_skills" JSONB,
    "hardware_skills" JSONB,
    "cybernetic_skills" JSONB,
    "engineering_skills" JSONB,
    "background" INT,
    "coins" INT
    );

CREATE TABLE "backgrounds" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(120),
    "description" VARCHAR(1500),
    "stats" JSONB,
    "basic_skills" JSONB,
    "thieving_skills" JSONB,
    "crime_skills" JSONB,
    "network_skills" JSONB,
    "corporate_skills" JSONB,
    "hardware_skills" JSONB,
    "cybernetic_skills" JSONB,
    "engineering_skills" JSONB
    );

CREATE TABLE "locations" (
    "id" SERIAL PRIMARY KEY,
    "meta" VARCHAR(30),
    "title" VARCHAR(60),
    "description" VARCHAR(1500)
    );

CREATE TABLE "bank" (
    "id" SERIAL PRIMARY KEY,
    "userid" INT REFERENCES "character_stats",
    "account_total" INT,
    "interest" INT,
    "fees" INT
    );

CREATE TABLE "npc" (
    "id" SERIAL PRIMARY KEY,
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
    "background" INT,
    "inventory" JSONB,
    "coins" INT
    );

CREATE TABLE "weapons" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(75),
    "area_of_effect" VARCHAR(10),
    "to_hit" INT,
    "defense" INT,
    "damage" VARCHAR(20),
    "damage_bonus" INT,
    "weight" INT,
    "size" VARCHAR(5),
    "embedded" BOOLEAN,
    "body_location" VARCHAR(20),
    "replace_body_part" BOOLEAN,
    "avg_cost" INT,
    "cost_mod" INT,
    "required_skills" INTEGER[]
    );

CREATE TABLE "skills" (
    "id" SERIAL PRIMARY KEY,
    "category" VARCHAR(50),
    "skill" VARCHAR(50),
    "available_levels" INT,
    "points_per_level" INT
    );





