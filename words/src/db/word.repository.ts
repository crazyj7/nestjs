import { Repository } from "typeorm";
import { CustomRepository } from "typeorm-ex.decorator";
import Word from "./word.entity";


@CustomRepository(Word)
export class WordRepository extends Repository<Word> {
	
	
}