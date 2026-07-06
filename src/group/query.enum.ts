export enum GroupQuery{
    SELECT_BY_ID="SELECT g.id, g.name, g.creation_date, ka.id area_id, ka.name area_name FROM tb_group g join tb_group_area ga on g.id = ga.group_id join tb_knowledge_area ka on ga.area_id = ka.id WHERE g.id = $1 limit 1;",
    CHECK_IF_OWNER="SELECT e.role from tb_group g join tb_enrollment e on e.group_id = g.id  where g.id = $1 and e.user_id = $2 limit 1",
    CREATE="CALL create_group_study($1, $2, $3)", // nome do grupo, id da area e id do usuario
    DELETE="DELETE FROM tb_group where id = $1",
    UPDATE="CALL update_group_areas($1, $2, $3)",

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