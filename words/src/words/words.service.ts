import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import Words from 'src/db/words.entity';
import { WordsRepository } from 'src/db/words.repository';
import { CreateWordDto } from 'src/dto/word.dto';
import { CreateWordsDto } from 'src/dto/words.dto';
import { Repository } from 'typeorm';

@Injectable()
export class WordsService {
	constructor(
		//@InjectRepository(Words)
		//private wordsRepository: Repository<Words>
		private wordsRepository: WordsRepository
	) {
	}

	findAll(): Promise<Words[]> {
		return this.wordsRepository.find() ;
	}

	async createWords(cwd : CreateWordsDto) : Promise<Words> {
		const w = await this.wordsRepository.create(cwd) ;
		try {
			await this.wordsRepository.insert( w ) ;
		} catch (error) {
			console.log(error) ;
			throw new InternalServerErrorException() ;
		}
		return w ;
	}

	async find(id:string) : Promise<Words> {
		const w  = await this.wordsRepository.findOne( { where: { id : id }}) ;
		if ( w ) {
			return w ;
		}
		return null ;
	}

	async delete(id:string) : Promise<boolean> {
		const f = await this.find(id) ;
		if ( !f )
			return false ;
		const result =await  this.wordsRepository.delete( { id }) ;
		if ( result.affected===0 )
			return false ;
		return true ;
	}
	
	async update(id:string, cwd:CreateWordsDto) : Promise<Words> {
		const f = await this.find(id) ;
		if ( !f )
			return null ;

		// 필드가 null 없으면 알아서 빼고 나머지 필드만 업데이트한다.
		const result = await this.wordsRepository.update( {
			id
		}, { title: cwd.title, description: cwd.description } ) ;
		
		if (cwd.title)  f.title = cwd.title ;
		if (cwd.description) f.description = cwd.description ;

		return f ;
	}

}
