import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Album } from "./Album";

@Entity()
export class Song{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    image_url!: string;

    @Column()
    song_url!: string;

    @Column({type: 'text'})
    desc!: string;

    @Column()
    duration!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => Album, (album) => album.songs, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'albumId' })
    album: Album | null;

}