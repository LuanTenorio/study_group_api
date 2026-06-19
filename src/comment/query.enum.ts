export enum CommentQuery{
    SELECT_BY_GROUP_ID="select c.id, c.user_id, c.group_id, c.created_at, c.description, u.institution_id, u.name, u.email from tb_comment c join tb_user u on c.group_id = $1 and u.id = c.user_id"
}