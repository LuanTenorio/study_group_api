CREATE OR REPLACE PROCEDURE create_group_study (
    p_nome_grupo VARCHAR,
    p_area_id INT,
    p_user_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_group_id INT; 
BEGIN
    INSERT INTO tb_group (name) 
    VALUES (p_nome_grupo)
    RETURNING id INTO v_group_id;

    INSERT INTO tb_group_area (group_id, area_id) 
    VALUES (v_group_id, p_area_id);

    INSERT INTO tb_enrollment (user_id, group_id, status, role, enrolled_at) 
    VALUES (p_user_id, v_group_id, 'active', 'owner', NOW());

    INSERT INTO tb_notice (user_id, group_id, expiration_date, created_at, description) 
    VALUES (
        p_user_id, 
        v_group_id, 
        NOW() + INTERVAL '1 month',
        NOW(), 
        'Olá, Seja bem vindo ao grupo de estudos de ' || p_nome_grupo 
    );
    COMMIT;
END;
$$;