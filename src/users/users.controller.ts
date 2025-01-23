import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('seed')
  async seedUsers(): Promise<string> {
    await this.usersService.seedUsers();
    return '100 users have been added to the database.';
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user with username and password' })
  @ApiBody({
    type: UserLoginDto,
  })
  async login(
    @Body() loginDto: { username: string; password: string },
  ): Promise<{ message: string; user: any }> {
    const { username, password } = loginDto;

    try {
      const user = await this.usersService.validateUser(username, password);
      return {
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
