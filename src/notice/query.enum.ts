export enum NoticeQuery{
    SELECT_BY_GROUP_ID="select n.id, n.user_id, n.group_id, n.description, n.created_at, n.expiration_date, u.institution_id, u.name, u.email from tb_notice n join tb_user u on n.group_id = $1 and u.id = n.user_id"
}