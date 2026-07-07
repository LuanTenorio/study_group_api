export enum AreaQuery{
    FIND_ALL="SELECT * FROM tb_knowledge_area;",
    FIND_BY_GROUP="SELECT ka.id, ka.name FROM tb_knowledge_area ka join tb_group_area ga on ka.id = ga.area_id where ga.group_id = $1"
}