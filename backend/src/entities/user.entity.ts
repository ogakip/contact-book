import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import { Client } from "./client.entity";

@Entity("users")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 158 })
  name: string;

  @Column({ length: 158 })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Client, (Client) => Client.user)
  clients: Client[];
}
