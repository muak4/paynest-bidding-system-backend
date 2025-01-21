// src/seed.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './users/entities/user.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    console.log('Seeded 100 test users');
  }

  async onModuleInit() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      await this.seedUsers();
    } else {
      console.log('Users already exist, skipping seed.');
    }
  }
}
