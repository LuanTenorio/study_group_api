export enum UserQuery{
    GET_ALL="SELECT * FROM tb_user",

    REGISTER="INSERT INTO tb_user (institution_id, email, name, password_hash) VALUES ($1, $2, $3, $4)"
}