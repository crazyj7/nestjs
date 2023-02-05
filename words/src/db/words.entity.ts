import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Word from "./word.entity";


@Entity()
export default class Words extends BaseEntity {
	@PrimaryColumn()
	@PrimaryGeneratedColumn('uuid')
	id: string ;

	@Column()
	title: string ;

	@Column({
		nullable: true
	})
	description: string ;

	@OneToMany(type=>Word, word=>word.words, {eager:false})
	word: Word[] ;

}
