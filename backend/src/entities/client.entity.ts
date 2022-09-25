import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Contact } from "./contact.entity";

@Entity("clients")
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
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Contact, (Contact) => Contact.client, { onDelete: 'CASCADE' })
  contacts: Contact[];
}