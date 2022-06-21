CREATE TABLE products
(
  id INT NOT NULL AUTO_INCREMENT,
  main_category VARCHAR(100) NOT NULL,
  sub_category VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  hashtags VARCHAR(300) NOT NULL,
  price INT NOT NULL,
  weight INT NOT NULL,
  sell_count INT NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (id)
);