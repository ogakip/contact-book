import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn } from "typeorm";

@Entity("clients")
@Unique(["email"])
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 158 })
  first_name: string;

  @Column({ length: 158 })
  last_name: string;

  @Column({ length: 158 })
  email: string;

  @CreateDateColumn()
  created_at: Date;
}