export enum MaterialQuery{
    SELECT_BY_GROUP_ID="SELECT m.id, m.user_id, m.group_id, m.file_size, m.file_content, m.file_type, m.uploaded_at, m.description, u.name, u.email FROM tb_material m JOIN tb_user u on m.group_id = $1 and m.user_id = u.id"
}