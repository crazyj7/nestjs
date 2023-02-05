import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Word from 'src/db/word.entity';
import { WordRepository } from 'src/db/word.repository';
import { CreateWordDto } from 'src/dto/word.dto';

@Injectable()
export class WordService {
	constructor(
		private wordRepository: WordRepository
	) {
	}

	findAll(): Promise<Word[]> {
		return this.wordRepository.find() ;
	}

	async createWord(cwd : CreateWordDto) : Promise<Word> {
		const w = this.wordRepository.create(cwd) ;
		try {
			await this.wordRepository.insert( w ) ;
		} catch (error) {
			console.log(error) ;
			throw new InternalServerErrorException() ;
		}
		return w ;
	}

	async find(id:string) : Promise<Word> {
		const w  = await this.wordRepository.findOne( { where: { id : id }}) ;
		if ( w ) {
			return w ;
		}
		return null ;
	}

	async findByWords(id:string) : Promise<Word[]> {
		const w  = await this.wordRepository.find( {
			where: { wordsId : id }
		})
		if ( w ) {
			return w ;
		}
		return null ;
	}

	async delete(id:string) : Promise<boolean> {
		const f = await this.find(id) ;
		if ( !f )
			return false ;
		const result =await  this.wordRepository.delete( { id }) ;
		if ( result.affected===0 )
			return false ;
		return true ;
	}
	
	async update(id:string, cwd:CreateWordDto) : Promise<Word> {
		const f = await this.find(id) ;
		if ( !f )
			return null ;

		// 필드가 null 없으면 알아서 빼고 나머지 필드만 업데이트한다.
		const result = await this.wordRepository.update( {
			id
		}, { ko: cwd.ko, en: cwd.en, memo: cwd.memo } ) ;
		
		if (cwd.ko)  f.ko = cwd.ko ;
		if (cwd.en) f.en = cwd.en ;
		if (cwd.memo) f.memo = cwd.memo ;

		return f ;
	}

}
