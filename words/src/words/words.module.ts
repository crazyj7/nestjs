import { Module } from '@nestjs/common';
import { WordsRepository } from 'src/db/words.repository';
import { TypeOrmExModule } from 'typeorm-ex.module';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
	imports: [
		// TypeOrmModule.forFeature([WordsRepository])
		TypeOrmExModule.forCustomRepository([WordsRepository])
	],
  controllers: [
	WordsController],
  providers: [WordsService]
})
export class WordsModule {}
