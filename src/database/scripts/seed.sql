INSERT INTO tb_institution (name, state, acronym) VALUES
('Universidade de Brasilia', 'DF', 'UnB'),
('Universidade de Sao Paulo', 'SP', 'USP'),
('Universidade Federal de Minas Gerais', 'MG', 'UFMG'),
('Universidade Federal do Rio de Janeiro', 'RJ', 'UFRJ'),
('Universidade Federal do Amazonas', 'AM', 'UFAM');

INSERT INTO tb_knowledge_area (name, icon) VALUES
('Banco de Dados', 'pi-database'),
('Inteligencia Artificial', 'pi-bolt'),
('Engenharia de Software', 'pi-code'),
('Redes de Computadores', 'pi-sitemap'),
('Matematica Discreta', 'pi-calculator'),
('Sistemas Operacionais', 'pi-desktop'),
('Segurança da Informação', 'pi-shield'),
('Ciência de Dados', 'pi-chart-line');

INSERT INTO tb_user (institution_id, name, email, password_hash) VALUES
(1, 'Ana Clara Martins', 'ana.martins@unb.br', '$2b$10$4FD1DOdEqKq6uXkMQHUGzuO3Cu2bILxuWAn3leAPfhnK7Kwed8Tga'),
(1, 'Bruno Ferreira', 'bruno.ferreira@unb.br', '$2b$10$41hWkNRg./RFRzT4p4wNMOLSaVorbeSOvdGOuEBI3YhIItDsuk.1K'),
(2, 'Carla Souza', 'carla.souza@usp.br', '$2b$10$R1Qcw6CwWsQZkxawCsAmu.PsEy7ghwet1YH1A2yiOAYdtzgp06U6m'),
(3, 'Diego Almeida', 'diego.almeida@ufmg.br', '$2b$10$DkiajfHZMtHxM0XV9HHgNu2uUgQ.C/euooIeNMK3TBevtATS2s9ji'),
(4, 'Elisa Ribeiro', 'elisa.ribeiro@ufrj.br', '$2b$10$jlxPPDpwhLq2Pnt8o7x9N./y3kwU79g6meD73v50zKyAeJqBaA19u'),
(1, 'Felipe Nunes', 'felipe.nunes@unb.br', '$2b$10$qXV10aFWKV.Fm5hR62fhtOi4OUmoGmGKe.zAlOSU/sGey0E4GoHgu');

INSERT INTO tb_group (name) VALUES
('Estudos de SQL Avancado'),
('Leitura de Artigos em IA'),
('Projeto de Engenharia de Software'),
('Monitoria de Redes'),
('Leitura de Artigos em Redes');

INSERT INTO tb_group_area (group_id, area_id) VALUES
(1, 1),
(1, 5),
(2, 2),
(2, 5),
(3, 3),
(3, 1),
(4, 4),
(4, 6),
(5, 4);

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

INSERT INTO tb_meeting (user_id, group_id, title, date_time, description, location) VALUES
(1, 1, 'Revisao', '2026-07-20 14:00:00', 'Revisao de joins, subconsultas e indices', 'Sala BSA N-102'),
(2, 1, 'Projeto final', '2026-07-27 14:00:00', 'Modelagem e normalizacao do projeto final', 'Laboratorio CIC 08'),
(3, 2, 'Discussao', '2026-07-21 10:00:00', 'Discussao sobre transformers e aplicacoes', 'Google Meet'),
(3, 2, 'Apresentacao', '2026-07-28 10:00:00', 'Apresentacao de artigos recentes', 'Google Meet'),
(6, 3, 'Sprint', '2026-07-22 16:30:00', 'Planejamento do sprint e divisao de tarefas', 'Biblioteca Central'),
(4, 4, 'Exercicios', '2026-07-23 18:00:00', 'Exercicios de roteamento e subnetting', 'Laboratorio de Redes');

INSERT INTO tb_material (user_id, title, group_id, file_size, file_content, file_type, uploaded_at, description) VALUES
(1, 'Resumo SQL', 1, 2048, decode('255044462d53514c2d4d4f434b', 'hex'), 'application/pdf', '2026-06-10 09:30:00', 'Resumo de SQL avancado em PDF'),
(2, 'Exercicios', 1, 1024, decode('4353562d45584552434943494f53', 'hex'), 'text/csv', '2026-06-11 15:10:00', 'Base de exercicios para consultas'),
(3, 'Artigo transformers', 2, 4096, decode('255044462d49412d41525449474f', 'hex'), 'application/pdf', '2026-06-12 11:45:00', 'Artigo introdutorio sobre transformers'),
(6, 'Backlog', 3, 1536, decode('4d41524b444f574e2d535052494e54', 'hex'), 'text/markdown', '2026-06-13 17:20:00', 'Backlog do sprint em markdown'),
(4, 'Diagrama Redes', 4, 3072, decode('504e472d4449414752414d412d5245444553', 'hex'), 'image/png', '2026-06-14 19:00:00', 'Diagrama de topologia de rede');

INSERT INTO tb_notice (user_id, group_id, title, expiration_date, created_at, description) VALUES
(1, 1, 'Tarefa antes da aula', '2026-06-21 23:59:00', '2026-06-15 08:00:00', 'Leiam o capitulo sobre otimizacao antes do encontro.'),
(3, 2, 'Perguntas sobre artigo', '2026-06-22 23:59:00', '2026-06-15 09:15:00', 'Cada participante deve trazer uma pergunta sobre o artigo.'),
(2, 3, 'Para antes da reuniao', '2026-06-23 23:59:00', '2026-06-16 12:30:00', 'Atualizem suas tarefas no quadro antes da reuniao.'),
(4, 4, 'Preparacao para aula do dia 23', '2026-06-24 23:59:00', '2026-06-16 18:40:00', 'Instalem o simulador de redes para a pratica.');

INSERT INTO tb_comment (user_id, group_id, created_at, description) VALUES
(2, 1, '2026-06-15 10:05:00', 'Preparei algumas consultas com GROUP BY para treinarmos.'),
(1, 1, '2026-06-15 10:20:00', 'Otimo, vou complementar com exemplos de EXPLAIN.'),
(4, 2, '2026-06-15 14:00:00', 'Posso apresentar a parte de atencao multi-cabeca.'),
(5, 2, '2026-06-15 14:25:00', 'Vou separar referencias extras para a discussao.'),
(6, 3, '2026-06-16 08:50:00', 'Subi uma proposta inicial de backlog.'),
(5, 4, '2026-06-16 20:10:00', 'Tenho duvidas sobre calculo de mascara, podemos revisar?');