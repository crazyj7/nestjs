import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import Word from 'src/db/word.entity';
import { CreateWordDto } from 'src/dto/word.dto';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
	constructor(private wordService : WordService) {
	}

	@Get()
	findAll(): Promise<Word[]> {
		return this.wordService.findAll() ;
	}

	@Post('create')
	createWords(@Body() cwd: CreateWordDto) : Promise<Word> {
		return this.wordService.createWord(cwd) ;
	}
	
	@Get('words/:id')
	findByWords(@Param('id') id:string) : Promise<Word[]> {
		console.log('words/:id  ; id=', id) ;

		return this.wordService.findByWords(id) ;
	}

	@Delete(':id')
	async delete(@Param('id') id:string) : Promise<boolean> {
		const found = await this.wordService.delete(id) ;
		if ( !found ) {
			throw new NotFoundException(`can't find id=${id}`) ;
		}
		return found ;
	}

	@Put(':id')
	async update(@Param('id') id:string, @Body() cwd: CreateWordDto) 
	:Promise<Word> {
		const found = await this.wordService.update(id, cwd) ;
		if ( !found )
		{
			throw new NotFoundException(`can't find id=${id}`) ;
		}
		return found ;
	}

}
