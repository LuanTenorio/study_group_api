CREATE OR REPLACE FUNCTION prevent_owner_user_deletion()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM tb_enrollment
        WHERE user_id = OLD.id
          AND role = 'owner'
    ) THEN
        RAISE EXCEPTION USING
            ERRCODE = 'P0001',
            MESSAGE = 'Não é possível excluir um usuário proprietário de grupo.',
            DETAIL = 'Transfira a propriedade ou exclua o grupo antes de excluir o usuário.';
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS trg_prevent_owner_user_deletion ON tb_user;

CREATE TRIGGER trg_prevent_owner_user_deletion
BEFORE DELETE ON tb_user
FOR EACH ROW
EXECUTE FUNCTION prevent_owner_user_deletion();