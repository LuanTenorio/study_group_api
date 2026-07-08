export enum MeetQuery{
    SELECT_BY_GROUP_ID="SELECT * FROM tb_meeting WHERE group_id = $1 order by date_time",
    SELECT_BY_ID= "SELECT * FROM tb_meeting WHERE id = $1",
    CREATE = 
    `INSERT INTO tb_meeting (user_id, group_id, description, date_time, location) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
    UPDATE = "UPDATE tb_meeting SET description = $1, date_time = $2, location = $3 WHERE id = $4 RETURNING *",
    DELETE = "DELETE FROM tb_meeting WHERE id = $1 and group_id = $2 RETURNING *"
}