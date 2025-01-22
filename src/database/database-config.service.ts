import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfigService {
  get DB_HOST(): string {
    console.log('DB_HOST:', process.env.DB_HOST); // Log for debugging
    return process.env.DB_HOST || 'localhost';
  }

  get DB_PORT(): number {
    console.log('DB_PORT:', process.env.DB_PORT); // Log for debugging
    return Number(process.env.DB_PORT) || 5432;
  }

  get DB_USERNAME(): string {
    console.log('DB_USERNAME:', process.env.DB_USERNAME); // Log for debugging
    return process.env.DB_USERNAME || 'postgres';
  }

  get DB_PASSWORD(): string {
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // Log for debugging
    return process.env.DB_PASSWORD || 'password';
  }

  get DB_NAME(): string {
    console.log('DB_NAME:', process.env.DB_NAME); // Log for debugging
    return process.env.DB_NAME || 'postgres';
  }

  get DB_TIMEZONE(): string {
    console.log('DB_TIMEZONE:', process.env.DB_TIMEZONE); // Log for debugging
    return process.env.DB_TIMEZONE || 'UTC';
  }
}
