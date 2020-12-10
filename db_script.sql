DROP TABLE reviews;
CREATE TABLE IF NOT EXISTS reviews(
    id SERIAL PRIMARY KEY,
    book_title VARCHAR(200) NOT NULL,
    review VARCHAR(1000) NOT NULL,
    review_date TIMESTAMP
);

SELECT * FROM reviews;

INSERT INTO reviews(book_title, review, review_date)
    VALUES('book title','review message',now());

DELETE FROM reviews WHERE id > 1;