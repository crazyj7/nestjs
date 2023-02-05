import { Repository } from "typeorm";
import { CustomRepository } from "typeorm-ex.decorator";
import Words from "./words.entity";


@CustomRepository(Words)
export class WordsRepository extends Repository<Words> {
	
	
}