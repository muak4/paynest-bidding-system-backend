import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';

@Module({
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService], // Export the service to be used in other modules
})
export class DatabaseConfigModule {}
