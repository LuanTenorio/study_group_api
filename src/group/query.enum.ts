export enum GroupQuery{
    SELECT_BY_ID="SELECT * FROM tb_group WHERE id = $1",
    CREATE="INSERT INTO tb_group (name) VALUES ($1)",
    UPDATE="UPDATE tb_group SET name = $2 where id = $1",
    DELETE="DELETE FROM tb_group where id = $1"
}