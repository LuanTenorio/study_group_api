export enum UserQuery {
    SELECT_BY_EMAIL = "SELECT * FROM tb_user WHERE email = $1",
    SELECT_BY_ID = "SELECT * FROM tb_user WHERE id = $1",
    INSERT = "INSERT INTO tb_user (institution_id, name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
    UPDATE = "UPDATE tb_user SET institution_id=$1, name=$2, email=$3 WHERE id=$4 RETURNING id, institution_id, name, email",
    DELETE = "DELETE FROM tb_user WHERE id=$1 RETURNING id"
}