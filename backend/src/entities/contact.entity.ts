import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("contacts")
@Unique(["email"])
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 158 })
  name: string;

  @Column({ length: 158 })
  email: string;

  @Column()
  telephone: string
}