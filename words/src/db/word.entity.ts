import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Words from "./words.entity";


@Entity()
export default class Word extends BaseEntity {
	@PrimaryColumn()
	@PrimaryGeneratedColumn('uuid')
	id: string ;

	@Column()
	en: string ;
	
	@Column()
	ko: string ;

	// 암기여부
	@Column()
	memo: boolean ;


	// eager가 true이면 words 객체도 가져온다. 
	// property + ref.name 이로 생성. 즉, wordsId 가 된다. 
	@ManyToOne(type=>Words, words=>words.word, {eager:false})
	@JoinColumn()
	words: Words ;

	// 위 이름과 같게 아래와 같이 하면. foreign key도 가져오게 된다. 
	// insert 시에 이 값만 사용하면 될 듯. 
	@Column()
	wordsId: string ;
}

