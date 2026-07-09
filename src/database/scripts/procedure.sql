DROP PROCEDURE IF EXISTS create_group_study(VARCHAR, INT, INT);
DROP PROCEDURE IF EXISTS create_group_study(VARCHAR, INT[], INT);
DROP PROCEDURE IF EXISTS update_group_areas(p_group_id INT, p_areas_id INT[]);

CREATE OR REPLACE PROCEDURE create_group_study(
    p_nome_grupo VARCHAR,
    p_areas_id INT[],
    p_user_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_group_id INT;
    v_area_id INT;
BEGIN
    INSERT INTO tb_group (name) 
    VALUES (p_nome_grupo)
    RETURNING id INTO v_group_id;

    FOREACH v_area_id IN ARRAY p_areas_id
    LOOP
        INSERT INTO tb_group_area (group_id, area_id) 
        VALUES (v_group_id, v_area_id);
    END LOOP;

    INSERT INTO tb_enrollment (user_id, group_id, status, role, enrolled_at) 
    VALUES (p_user_id, v_group_id, 'active', 'owner', NOW());

    INSERT INTO tb_notice (user_id, group_id, title, expiration_date, created_at, description) 
    VALUES (
        p_user_id, 
        v_group_id, 
        'Boas vindas!!',
        NOW() + INTERVAL '1 month',
        NOW(), 
        'Olá, Seja bem vindo ao grupo de estudos de ' || p_nome_grupo 
    );
END;
$$;

CREATE OR REPLACE PROCEDURE update_group_areas(
    p_group_id INT,
    p_nome_grupo VARCHAR,
    p_areas_id INT[]
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE tb_group 
    SET name = p_nome_grupo 
    WHERE id = p_group_id;

    DELETE FROM tb_group_area 
    WHERE group_id = p_group_id 
      AND area_id != ALL(p_areas_id);

    INSERT INTO tb_group_area (group_id, area_id) 
    SELECT p_group_id, unnest(p_areas_id)
    ON CONFLICT (group_id, area_id) DO NOTHING;

    COMMIT;
END;
$$;
DROP PROCEDURE IF EXISTS enroll_user_group(INT, INT);

CREATE OR REPLACE PROCEDURE enroll_user_group(
    p_user_id INT,
    p_group_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM tb_group WHERE id = p_group_id) THEN
        RAISE EXCEPTION USING
            ERRCODE = 'P0002',
            MESSAGE = 'Grupo não encontrado.',
            DETAIL = 'Não existe grupo de estudos com o id informado.';
    END IF;

    IF EXISTS (
        SELECT 1 FROM tb_enrollment
        WHERE user_id = p_user_id AND group_id = p_group_id
    ) THEN
        RAISE EXCEPTION USING
            ERRCODE = 'P0003',
            MESSAGE = 'Usuário já está inscrito nesse grupo.',
            DETAIL = 'Não é possível se inscrever duas vezes no mesmo grupo de estudos.';
    END IF;

    INSERT INTO tb_enrollment (user_id, group_id, status, role, enrolled_at)
    VALUES (p_user_id, p_group_id, 'active', 'member', NOW());

    COMMIT;
END;
$$;