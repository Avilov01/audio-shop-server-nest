import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(1, { message: 'The name field is required.'})
  @MinLength(2, { message: 'Name must be at least 2 characters long.'})
  name: string;
}
