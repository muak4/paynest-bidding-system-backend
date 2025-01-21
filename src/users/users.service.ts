import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedUsers(): Promise<void> {
    const saltRounds = 10;

    const users = await Promise.all(
      Array.from({ length: 100 }, async (_, i) => ({
        username: `test_user_${i + 1}`,
        email: `test_user_${i + 1}@example.com`,
        password: await bcrypt.hash(`password${i + 1}`, saltRounds),
      })),
    );

    await this.userRepository.save(users);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user; // Return the user if valid
  }
}
