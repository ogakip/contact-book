import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

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

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: "agent_id" })
  user: User;
}