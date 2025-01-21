import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfigService {
  // Example: Retrieve these from environment variables or your configuration file
  get DB_HOST(): string {
    return process.env.DB_HOST || 'localhost';
  }

  get DB_PORT(): number {
    return Number(process.env.DB_PORT) || 5432;
  }

  get DB_USERNAME(): string {
    return process.env.DB_USERNAME || 'postgres';
  }

  get DB_PASSWORD(): string {
    return process.env.DB_PASSWORD || 'password';
  }

  get DB_NAME(): string {
    return process.env.DB_NAME || 'postgres';
  }

  get DB_TIMEZONE(): string {
    return process.env.DB_TIMEZONE || 'UTC'; // Default to UTC
  }
}
