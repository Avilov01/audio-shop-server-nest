import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: '2026-05-31T12:00:00.000Z' })
  createdAt: Date;
}
