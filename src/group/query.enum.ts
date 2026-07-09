export enum GroupQuery{
    SELECT_BY_ID="SELECT g.id, g.name, g.creation_date, ka.id area_id, ka.name area_name FROM tb_group g join tb_group_area ga on g.id = ga.group_id join tb_knowledge_area ka on ga.area_id = ka.id WHERE g.id = $1 limit 1;",
    CHECK_IF_OWNER="SELECT e.role from tb_group g join tb_enrollment e on e.group_id = g.id  where g.id = $1 and e.user_id = $2 limit 1",
    CREATE="CALL create_group_study($1, $2, $3)", // nome do grupo, id da area e id do usuario
    DELETE="DELETE FROM tb_group where id = $1",
    UPDATE="CALL update_group_areas($1, $2, $3)",


    FIND_ALL = `SELECT * FROM group_feed_card;`,

   
    FIND_MY_GROUPS = `
    SELECT gfc.*
    FROM group_feed_card gfc
    INNER JOIN tb_enrollment my_enrollment ON my_enrollment.group_id = gfc.id
    WHERE my_enrollment.user_id = $1 AND my_enrollment.status = 'active';
  `,

    FIND_PREVIEW_BY_ID = `SELECT * FROM group_feed_card WHERE id = $1;`,

    ENROLL = `CALL enroll_user_group($1, $2);`,
    UNENROLL = "DELETE FROM tb_enrollment e WHERE e.user_id = $1 AND e.group_id = $2"
}