export enum InstitutionQuery {
    SELECT_ALL = 'SELECT id, name FROM tb_institution ORDER BY name ASC',
    SELECT_BY_ID = 'SELECT id, name FROM tb_institution WHERE id=$1'
}