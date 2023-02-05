import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsModule } from './words/words.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    TypeOrmModule.forRoot( {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'crazyj700.',
      database: 'mywords',
      entities: [
          __dirname + '/**/*.entity{.ts,.js}',
      ],
      synchronize: true,
        }),    
    WordsModule, WordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
