DROP TABLE IF EXISTS tb_group_area, tb_comment, tb_notice, tb_material, tb_enrollment, tb_meeting, tb_group, tb_user, tb_institution, tb_knowledge_area;

CREATE TABLE tb_user 
( 
 id INT PRIMARY KEY,  
 institution_id INT,  
 name VARCHAR(255),  
 email VARCHAR(255),  
 password_hash VARCHAR(255) 
); 

CREATE TABLE tb_group 
( 
 id INT PRIMARY KEY,  
 name VARCHAR(255),  
 creation_date DATE 
); 

CREATE TABLE tb_meeting 
( 
 id INT PRIMARY KEY,  
 group_id INT,  
 date_time TIMESTAMP,  
 description VARCHAR(255),  
 location VARCHAR(255) 
); 

CREATE TABLE tb_enrollment 
( 
 user_id INT,  
 group_id INT,  
 status VARCHAR(50),  
 role VARCHAR(50),  
 enrolled_at DATE,
 PRIMARY KEY (user_id, group_id)
); 

CREATE TABLE tb_institution 
( 
 id INT PRIMARY KEY,  
 name VARCHAR(255),  
 state VARCHAR(2),  
 acronym VARCHAR(50) 
); 

CREATE TABLE tb_knowledge_area 
( 
 id INT PRIMARY KEY,  
 name VARCHAR(255) 
); 

CREATE TABLE tb_material 
( 
 id INT PRIMARY KEY,  
 user_id INT,  
 group_id INT,  
 file_size INT,  
 file_content BYTEA,  
 file_type VARCHAR(50),  
 uploaded_at TIMESTAMP,  
 description VARCHAR(255) 
); 

CREATE TABLE tb_notice 
( 
 id INT PRIMARY KEY,  
 user_id INT,  
 group_id INT,  
 expiration_date TIMESTAMP,  
 created_at TIMESTAMP,  
 description VARCHAR(255) 
); 

CREATE TABLE tb_comment 
( 
 id INT PRIMARY KEY,  
 user_id INT,  
 group_id INT,  
 created_at TIMESTAMP,  
 description VARCHAR(255) 
); 

CREATE TABLE tb_group_area 
( 
 group_id INT,  
 area_id INT,
 PRIMARY KEY (group_id, area_id)
); 

ALTER TABLE tb_user ADD FOREIGN KEY(institution_id) REFERENCES tb_institution (id);
ALTER TABLE tb_meeting ADD FOREIGN KEY(group_id) REFERENCES tb_group (id);
ALTER TABLE tb_enrollment ADD FOREIGN KEY(user_id) REFERENCES tb_user (id);
ALTER TABLE tb_enrollment ADD FOREIGN KEY(group_id) REFERENCES tb_group (id);
ALTER TABLE tb_material ADD FOREIGN KEY(user_id) REFERENCES tb_user (id);
ALTER TABLE tb_material ADD FOREIGN KEY(group_id) REFERENCES tb_group (id);
ALTER TABLE tb_notice ADD FOREIGN KEY(user_id) REFERENCES tb_user (id);
ALTER TABLE tb_notice ADD FOREIGN KEY(group_id) REFERENCES tb_group (id);
ALTER TABLE tb_comment ADD FOREIGN KEY(user_id) REFERENCES tb_user (id);
ALTER TABLE tb_comment ADD FOREIGN KEY(group_id) REFERENCES tb_group (id);
ALTER TABLE tb_group_area ADD FOREIGN KEY(group_id) REFERENCES tb_group (id);
ALTER TABLE tb_group_area ADD FOREIGN KEY(area_id) REFERENCES tb_knowledge_area (id);