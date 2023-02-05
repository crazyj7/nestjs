import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmExModule } from 'typeorm-ex.module';
import { WordRepository } from 'src/db/word.repository';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([WordRepository])
	],
  providers: [WordService],
  controllers: [WordController]
})
export class WordModule {}
