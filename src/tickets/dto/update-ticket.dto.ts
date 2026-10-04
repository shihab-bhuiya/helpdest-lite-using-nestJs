import { IsEmpty, IsIn, IsOptional, IsString } from "class-validator";

export class UpdateTicketDto {

    @IsOptional()
    @IsString()
    @IsEmpty()
    subject?:string;

    @IsOptional()
    @IsString()
    @IsEmpty()
    description?:string;

    @IsOptional()
    @IsIn(['high','medium','low'])

    priority?:'high' | 'medium' | 'low';
}
