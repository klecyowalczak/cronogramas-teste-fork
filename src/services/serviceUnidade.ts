import { AppDataSource } from "../databases/connections/datasourceDev"
import Unidade from "../databases/models/unidade"

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor

const cursor = AppDataSource.getRepository(Unidade)

// 2) Recebe dados da Requisição HTTP lá do FRONTEND

type newUnidadeRequest = {
  descricao_unidade: string
  carga_horaria_unidade: number
  ordem: number
  fk_curso: string
}

type updateUnidadeRequest = {
  id_unidade: string
  descricao_unidade: string
  carga_horaria_unidade: number
  ordem: number
  fk_curso: string
}

type findOneUnidadeRequest = {
  id_unidade: string
}

type findByCursoRequest = {  
  fk_curso: string
}

// 3) Funções CRUD

export class UnidadeService {
  async create({
    descricao_unidade,
    carga_horaria_unidade,
    ordem,
    fk_curso,
  }: newUnidadeRequest): Promise<Unidade | Error> {
    if (await cursor.findOne({ where: { descricao_unidade } })) {
      return new Error("Unidade já cadastrada!")
    }

    const unidade = cursor.create({
      descricao_unidade,
      carga_horaria_unidade,
      ordem,
      fk_curso,
    })

    await cursor.save(unidade)

    return unidade
  }

  async readAll() {
    const unidades = await cursor.find()
    return unidades
  }

  async readOne({ id_unidade }: findOneUnidadeRequest): Promise<Unidade | Error> {
    const unidade = await cursor.findOne({ where: { id_unidade } })
    if (!unidade) {
      return new Error("Unidade não encontrada!")
    }
    return unidade
  }

  async readByCurso({ fk_curso }: findByCursoRequest): Promise<Unidade | Error> {
    const unidade = await cursor.findOne({ where: { fk_curso } })
    if (!unidade) {
      return new Error("Unidade não encontrada!")
    }
    return unidade
  }

  async update({
    id_unidade,
    descricao_unidade,
    carga_horaria_unidade,
    ordem,
  }: updateUnidadeRequest): Promise<Unidade | Error> {
    const unidade = await cursor.findOne({ where: { id_unidade } })
    if (!unidade) {
      return new Error("Unidade não encontrada!")
    }

    unidade.descricao_unidade = descricao_unidade
      ? descricao_unidade
      : unidade.descricao_unidade
    unidade.carga_horaria_unidade = carga_horaria_unidade
      ? carga_horaria_unidade
      : unidade.ordem
    unidade.ordem = ordem ? ordem : unidade.ordem

    await cursor.save(unidade)

    return unidade
  }

  async delete({
    id_unidade,
  }: findOneUnidadeRequest): Promise<String | Error> {
    const unidade = await cursor.findOne({ where: { id_unidade } })
    if (!unidade) {
      return new Error("Unidade não encontrada!")
    }
    await cursor.delete(unidade.id_unidade)
    return "Unidade excluída com sucesso!"
  }
}
