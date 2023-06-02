import { AppDataSource } from "../databases/connections/data-source"
import Turma from "../databases/models/turma"

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor

const cursor = AppDataSource.getRepository(Turma)

// 2) Recebe dados da Requisição HTTP lá do FRONTEND

type newTurmaRequest = {
  fk_curso: string
  data_inicio: Date
  data_fim: Date
  horas_aula_dia: number
}

type updateTurmaRequest = {
  id_turma: string
  fk_curso: string
  data_inicio: Date
  data_fim: Date
  horas_aula_dia: number
}

type findOneTurmaRequest = {
  id_turma: string
}

// 3) Funções CRUD

export class TurmaService {
  async create({
    fk_curso,
    data_inicio,
    data_fim,
    horas_aula_dia,
  }: newTurmaRequest): Promise<Turma | Error> {
    if (await cursor.findOne({ where: { fk_curso } })) {
      return new Error("Turma já cadastrada!")
    }

    const turma = cursor.create({
      fk_curso,
      data_inicio,
      data_fim,
      horas_aula_dia,
    })

    await cursor.save(turma)

    return turma
  }

  async readAll() {
    const turmas = await cursor.find()
    return turmas
  }

  async readOne({ id_turma }: findOneTurmaRequest): Promise<Turma | Error> {
    const turma = await cursor.findOne({ where: { id_turma } })
    if (!turma) {
      return new Error("Turma não encontrada!")
    }
    return turma
  }

  async update({
    fk_curso,
    data_inicio,
    data_fim,
    horas_aula_dia,
  }: updateTurmaRequest): Promise<Turma | Error> {
    const turma = await cursor.findOne({ where: { fk_curso } })
    if (!turma) {
      return new Error("Turma não encontrada!")
    }

    turma.fk_curso = fk_curso
      ? fk_curso
      : turma.fk_curso
    turma.data_inicio = data_inicio
      ? data_inicio
      : turma.data_inicio
    turma.data_fim = data_fim 
      ? data_fim 
      : turma.data_fim
    turma.horas_aula_dia = horas_aula_dia 
      ? horas_aula_dia 
      : turma.horas_aula_dia

    await cursor.save(turma)

    return turma
  }

  async delete({ id_turma }: findOneTurmaRequest): Promise<string | Error> {
    const turma = await cursor.findOne({ where: { id_turma } })
    if (!turma) {
      return new Error("Turma não encontrada!")
    }
    await cursor.delete(turma.id_turma)
    return "Turma deletada com sucesso!"
  }
}
