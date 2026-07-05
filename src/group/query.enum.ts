export enum GroupQuery{
    SELECT_BY_ID="SELECT * FROM tb_group WHERE id = $1",
    CREATE="INSERT INTO tb_group (name) VALUES ($1)",
    UPDATE="UPDATE tb_group SET name = $2 where id = $1",
    DELETE="DELETE FROM tb_group where id = $1",

    //retorna todos os grupos com o nome, instituição, área de conhecimento, quantidade de membros e data do próximo encontro
    FIND_ALL = 
    `SELECT
      g.id,
      g.name AS title,
      i.acronym AS institution,
      ( 
        SELECT ka.name 
        FROM tb_group_area ga 
        INNER JOIN tb_knowledge_area ka ON ga.area_id = ka.id 
        WHERE ga.group_id = g.id 
        LIMIT 1
      ) AS area,
      (
        SELECT COUNT(*)::int 
        FROM tb_enrollment e 
        WHERE e.group_id = g.id AND e.status = 'active'
      ) AS members,
      (
        SELECT m.date_time 
        FROM tb_meeting m 
        WHERE m.group_id = g.id AND m.date_time >= NOW() 
        ORDER BY m.date_time ASC 
        LIMIT 1
      ) AS next_meeting
    FROM tb_group g
    LEFT JOIN tb_enrollment e_owner ON e_owner.group_id = g.id AND e_owner.role = 'owner'
    LEFT JOIN tb_user u_owner ON u_owner.id = e_owner.user_id
    LEFT JOIN tb_institution i ON i.id = u_owner.institution_id;
  `
}