import { ArrayNotEmpty, IsArray, IsOptional, IsString } from "class-validator";

export class ConversationDto {
    @IsOptional()
    @IsString()
    name?: string;
    //isGroup?: boolean;

    @IsArray()
    @ArrayNotEmpty()
    users: number[];
  }
  