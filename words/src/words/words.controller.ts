import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import Words from 'src/db/words.entity';
import { CreateWordsDto, WordsDto } from 'src/dto/words.dto';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {

	constructor (private wordsService: WordsService) {} ;
	
	@Get()
	findAll(): Promise<Words[]> {
		return this.wordsService.findAll() ;
	}

	@Post('create')
	createWords(@Body() cwd: CreateWordsDto) : Promise<Words> {
		return this.wordsService.createWords(cwd) ;
	}
	@Get(':id')
	find(@Param('id') id:string) : Promise<Words> {
		return this.wordsService.find(id) ;
	}

	@Delete(':id')
	async delete(@Param('id') id:string) : Promise<boolean> {
		const found = await this.wordsService.delete(id) ;
		if ( !found ) {
			throw new NotFoundException(`can't find id=${id}`) ;
		}
		return found ;
	}

	// @Put(':id/description')
	@Put(':id')
	async update(@Param('id') id:string, @Body() cwd: CreateWordsDto) 
	:Promise<Words> {
		const found = await this.wordsService.update(id, cwd) ;
		if ( !found )
		{
			throw new NotFoundException(`can't find id=${id}`) ;
		}
		return found ;
	}

}
