export enum MaterialQuery{
    SELECT_BY_GROUP_ID="SELECT m.id, m.title, m.user_id, m.group_id, m.file_size, m.file_content, m.file_type, m.uploaded_at, m.description, u.name, u.email FROM tb_material m JOIN tb_user u on m.group_id = $1 and m.user_id = u.id",
    SELECT_BY_ID= "SELECT * FROM tb_material WHERE id = $1",
    CREATE = "INSERT INTO tb_material (title, user_id, group_id, file_size, file_content, file_type, uploaded_at, description) VALUES ($1, $2, $3, $4, $5, $6, now(), $7) RETURNING *",
    UPDATE = "UPDATE tb_material SET title = $1, file_size = $2, file_content = $3, file_type = $4, description = $5 WHERE id = $6 RETURNING *",
    DELETE = "DELETE FROM tb_material WHERE id = $1 and group_id = $2 RETURNING *"
}