export enum NoticeQuery{
    SELECT_BY_GROUP_ID="select n.id, n.title, n.user_id, n.group_id, n.description, n.created_at, n.expiration_date, u.institution_id, u.name, u.email from tb_notice n join tb_user u on n.group_id = $1 and u.id = n.user_id",
    SELECT_BY_ID= "SELECT * FROM tb_notice WHERE id = $1",
    CREATE = 
    `INSERT INTO tb_notice (title, user_id, group_id, description, created_at, expiration_date) VALUES ($1, $2, $3, $4, now(), $5) RETURNING *
    `,
    UPDATE = "UPDATE tb_notice SET title = $1, description = $2, expiration_date = $3 WHERE id = $4 RETURNING *",
    DELETE = "DELETE FROM tb_notice WHERE id = $1 and group_id = $2 RETURNING *"
}