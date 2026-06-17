export enum MeetQuery{
    SELECT_BY_GROUP_ID="SELECT * FROM tb_meeting WHERE group_id = $1 order by date_time",
}