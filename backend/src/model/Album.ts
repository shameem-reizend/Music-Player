import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "./Song";

@Entity()
export class Album{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    image_url: string

    @Column()
    desc: string

    @Column()
    bgColor: string

    @OneToMany(() => Song, (song) => song.album)
    songs: Song[];
    
}