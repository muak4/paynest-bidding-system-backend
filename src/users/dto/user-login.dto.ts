import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'test_user_1',
  })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password1',
  })
  password: string;
}
