CREATE TABLE IF NOT EXISTS reviews(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    review VARCHAR(1000) NOT NULL,
    review_date DATE
);