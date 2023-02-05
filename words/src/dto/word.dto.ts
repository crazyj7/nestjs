import { WordsDto } from "./words.dto";

export class WordDto {
	id: string ;
	en: string ;
	ko: string ;
	// 암기여부
	memo: boolean ;
	// words: WordsDto ;
	// words_id: string ;
	
	// foreign key
	wordsId : string ; 
}

export class CreateWordDto {
//	id: string ;
	en: string ;
	ko: string ;
	// 암기여부
	memo: boolean ;
	words_id: string ;
}


