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

INSERT INTO tb_institution (id, name, state, acronym) VALUES
(1, 'Universidade de Brasilia', 'DF', 'UnB'),
(2, 'Universidade de Sao Paulo', 'SP', 'USP'),
(3, 'Universidade Federal de Minas Gerais', 'MG', 'UFMG'),
(4, 'Universidade Federal do Rio de Janeiro', 'RJ', 'UFRJ');

INSERT INTO tb_knowledge_area (id, name) VALUES
(1, 'Banco de Dados'),
(2, 'Inteligencia Artificial'),
(3, 'Engenharia de Software'),
(4, 'Redes de Computadores'),
(5, 'Matematica Discreta'),
(6, 'Sistemas Operacionais');

INSERT INTO tb_user (id, institution_id, name, email, password_hash) VALUES
(1, 1, 'Ana Clara Martins', 'ana.martins@unb.br', '$2b$10$mockhashana'),
(2, 1, 'Bruno Ferreira', 'bruno.ferreira@unb.br', '$2b$10$mockhashbruno'),
(3, 2, 'Carla Souza', 'carla.souza@usp.br', '$2b$10$mockhashcarla'),
(4, 3, 'Diego Almeida', 'diego.almeida@ufmg.br', '$2b$10$mockhashdiego'),
(5, 4, 'Elisa Ribeiro', 'elisa.ribeiro@ufrj.br', '$2b$10$mockhashelisa'),
(6, 1, 'Felipe Nunes', 'felipe.nunes@unb.br', '$2b$10$mockhashfelipe');

INSERT INTO tb_group (id, name, creation_date) VALUES
(1, 'Estudos de SQL Avancado', '2026-03-04'),
(2, 'Leitura de Artigos em IA', '2026-03-12'),
(3, 'Projeto de Engenharia de Software', '2026-04-01'),
(4, 'Monitoria de Redes', '2026-04-15');

INSERT INTO tb_group_area (group_id, area_id) VALUES
(1, 1),
(1, 5),
(2, 2),
(2, 5),
(3, 3),
(3, 1),
(4, 4),
(4, 6);

INSERT INTO tb_enrollment (user_id, group_id, status, role, enrolled_at) VALUES
(1, 1, 'active', 'owner', '2026-03-04'),
(2, 1, 'active', 'member', '2026-03-05'),
(3, 1, 'pending', 'member', '2026-03-08'),
(3, 2, 'active', 'owner', '2026-03-12'),
(4, 2, 'active', 'member', '2026-03-13'),
(5, 2, 'active', 'member', '2026-03-14'),
(2, 3, 'active', 'owner', '2026-04-01'),
(6, 3, 'active', 'member', '2026-04-02'),
(1, 3, 'inactive', 'member', '2026-04-04'),
(4, 4, 'active', 'owner', '2026-04-15'),
(5, 4, 'active', 'member', '2026-04-16'),
(6, 4, 'pending', 'member', '2026-04-18');

INSERT INTO tb_meeting (id, group_id, date_time, description, location) VALUES
(1, 1, '2026-06-20 14:00:00', 'Revisao de joins, subconsultas e indices', 'Sala BSA N-102'),
(2, 1, '2026-06-27 14:00:00', 'Modelagem e normalizacao do projeto final', 'Laboratorio CIC 08'),
(3, 2, '2026-06-21 10:00:00', 'Discussao sobre transformers e aplicacoes', 'Google Meet'),
(4, 2, '2026-06-28 10:00:00', 'Apresentacao de artigos recentes', 'Google Meet'),
(5, 3, '2026-06-22 16:30:00', 'Planejamento do sprint e divisao de tarefas', 'Biblioteca Central'),
(6, 4, '2026-06-23 18:00:00', 'Exercicios de roteamento e subnetting', 'Laboratorio de Redes');

INSERT INTO tb_material (id, user_id, group_id, file_size, file_content, file_type, uploaded_at, description) VALUES
(1, 1, 1, 2048, decode('255044462d53514c2d4d4f434b', 'hex'), 'application/pdf', '2026-06-10 09:30:00', 'Resumo de SQL avancado em PDF'),
(2, 2, 1, 1024, decode('4353562d45584552434943494f53', 'hex'), 'text/csv', '2026-06-11 15:10:00', 'Base de exercicios para consultas'),
(3, 3, 2, 4096, decode('255044462d49412d41525449474f', 'hex'), 'application/pdf', '2026-06-12 11:45:00', 'Artigo introdutorio sobre transformers'),
(4, 6, 3, 1536, decode('4d41524b444f574e2d535052494e54', 'hex'), 'text/markdown', '2026-06-13 17:20:00', 'Backlog do sprint em markdown'),
(5, 4, 4, 3072, decode('504e472d4449414752414d412d5245444553', 'hex'), 'image/png', '2026-06-14 19:00:00', 'Diagrama de topologia de rede');

INSERT INTO tb_notice (id, user_id, group_id, expiration_date, created_at, description) VALUES
(1, 1, 1, '2026-06-21 23:59:00', '2026-06-15 08:00:00', 'Leiam o capitulo sobre otimizacao antes do encontro.'),
(2, 3, 2, '2026-06-22 23:59:00', '2026-06-15 09:15:00', 'Cada participante deve trazer uma pergunta sobre o artigo.'),
(3, 2, 3, '2026-06-23 23:59:00', '2026-06-16 12:30:00', 'Atualizem suas tarefas no quadro antes da reuniao.'),
(4, 4, 4, '2026-06-24 23:59:00', '2026-06-16 18:40:00', 'Instalem o simulador de redes para a pratica.');

INSERT INTO tb_comment (id, user_id, group_id, created_at, description) VALUES
(1, 2, 1, '2026-06-15 10:05:00', 'Preparei algumas consultas com GROUP BY para treinarmos.'),
(2, 1, 1, '2026-06-15 10:20:00', 'Otimo, vou complementar com exemplos de EXPLAIN.'),
(3, 4, 2, '2026-06-15 14:00:00', 'Posso apresentar a parte de atencao multi-cabeca.'),
(4, 5, 2, '2026-06-15 14:25:00', 'Vou separar referencias extras para a discussao.'),
(5, 6, 3, '2026-06-16 08:50:00', 'Subi uma proposta inicial de backlog.'),
(6, 5, 4, '2026-06-16 20:10:00', 'Tenho duvidas sobre calculo de mascara, podemos revisar?');
