import { IsIn, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    subject:string;
    @IsString()
    @IsNotEmpty()
    description:string;
    @IsIn(['low','medium','high'])
    priority:'high' | "low" | "medium";
}
