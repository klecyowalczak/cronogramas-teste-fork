import { Entity, PrimaryColumn, Column } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("aula")
export default class Aula {
  //chave primária
  @PrimaryColumn()
  id_aula: string

  //atributos
  @Column({ nullable: true })
  data_aula: Date

  @Column({ nullable: true })
  status_aula: string

  @Column({ nullable: true })
  fk_turma: string

  @Column()
  fk_unidade: string

  constructor() {
    this.id_aula = uuid()
  }
}