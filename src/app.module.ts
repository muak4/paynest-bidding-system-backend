// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { EpisodesModule } from './episodes/episodes.module';
// import { UsersModule } from './users/users.module';
// import { ItemsModule } from './items/items.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { BidsModule } from './bids/bids.module';

// @Module({
//   // imports: [EpisodesModule, UsersModule, ItemsModule],
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'password',
//       database: 'postgres',
//       autoLoadEntities: true,
//       synchronize: true, // Disable in production
//     }),
//     ItemsModule,
//     UsersModule,
//     BidsModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidsModule } from './bids/bids.module';
import { DatabaseConfigModule } from './database/database-config.module'; // Import DatabaseConfigModule
import { DatabaseConfigService } from './database/database-config.service'; // Import DatabaseConfigService
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (databaseConfigService: DatabaseConfigService) => ({
        type: 'postgres',
        host: databaseConfigService.DB_HOST,
        port: databaseConfigService.DB_PORT,
        username: databaseConfigService.DB_USERNAME,
        password: databaseConfigService.DB_PASSWORD,
        database: databaseConfigService.DB_NAME,
        timezone: databaseConfigService.DB_TIMEZONE,
        logging: false,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [DatabaseConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    ItemsModule,
    UsersModule,
    BidsModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
