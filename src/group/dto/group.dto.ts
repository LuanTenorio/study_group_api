import { CommentDto } from "src/comment/dto/comment.dto"
import { MaterialDto } from "src/material/dto/materia.dto"
import { MeetDto } from "src/meet/dto/meet.dto"
import { NoticeDto } from "src/notice/dto/notice.dto"
import { GroupPgDto } from "./group_pg.dto"
import { AreaDto } from "src/area/dto/area.dto"

export class GroupDto extends GroupPgDto {
    comments: CommentDto[]
    notices: NoticeDto[]
    meets: MeetDto[]
    materials: MaterialDto[]
    role: string
    areas: AreaDto[]
}