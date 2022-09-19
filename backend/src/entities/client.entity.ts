import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn } from "typeorm";

@Entity("clients")
@Unique(["email"])
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 158 })
  name: string;

  @Column({ length: 158 })
  email: string;

  @Column()
  telephone: string

  @CreateDateColumn()
  created_at: Date;
}