import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SingleChatDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsEmail()
  sender: string;

  @IsString()
  @IsEmail()
  receiver: string;
}
