import { IsIn, IsOptional } from "class-validator";

export class FilterTicketsQueryDto {

    @IsOptional()
    @IsIn(['open','close'])
    status:"open" | "close";

    @IsOptional()
    @IsIn(['high', 'medium', 'low'])
    priority:"high" | "medium" | "low";
}
