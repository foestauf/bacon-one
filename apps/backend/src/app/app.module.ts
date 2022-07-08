import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsModule } from '../actors/actors.module';
import { MoviesModule } from '../movies/movies.module';
import { TmdbModule } from '../tmdb/tmdb.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: false,
      logging: true,
      cache: {
        duration: 30000,
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'cache',
        port: 6379,
      },
      defaultJobOptions: {
        removeOnComplete: 1000,
        attempts: 3,
      },
      // limiter: {
      //   max: 100,
      //   duration: 500,
      //   bounceBack: true,
      // },
    }),
    ActorsModule,
    MoviesModule,
    TmdbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
