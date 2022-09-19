import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
