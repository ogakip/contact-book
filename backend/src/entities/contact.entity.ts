import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from "typeorm";
import { Client } from "./client.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 158 })
  name: string;

  @Column({ length: 158 })
  email: string;

  @Column()
  telephone: string

  @ManyToOne(() => Client, {
    eager: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "client_id" })
  client: Client;
}