export enum UserQuery {
    SELECT_BY_EMAIL = "SELECT * FROM tb_user WHERE email = $1",
    INSERT = "INSERT INTO tb_user (institution_id, name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *"
}