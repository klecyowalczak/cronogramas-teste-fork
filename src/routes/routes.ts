import { Router } from "express"
import CursoController from "../controllers/controllerCurso"
import TurmaController from "../controllers/controllerTurma"
import UnidadeController from "../controllers/controllerUnidade"
import AulaController from "../controllers/controllerAula"
import RecessoController from "../controllers/controllerRecesso"

const rotas = Router()

rotas.get("/", (request, response) => {
    return response.json("home page")
})

//Curso
rotas.post("/cursos", new CursoController().create)
rotas.get("/cursos", new CursoController().readAll)
rotas.get("/cursos/:id_curso", new CursoController().readOne)
rotas.get("/cursos/eixo", new CursoController().readByEixo)
rotas.get("/cursos/modalidade", new CursoController().readByModalidade)
rotas.put("/cursos/:id_curso", new CursoController().update)
rotas.delete("/cursos/:id_curso", new CursoController().delete)

//Turma
rotas.post("/turmas", new TurmaController().create)
rotas.get("/turmas", new TurmaController().readAll)
rotas.get("/turmas/:id_turma", new TurmaController().readOne)
rotas.get("/turmas/turno", new TurmaController().readByTurno)
rotas.put("/turmas/:idid_turma", new TurmaController().update)
rotas.delete("/turmas/:id_turma", new TurmaController().delete)

//Unidade
rotas.post("/unidades", new UnidadeController().create)
rotas.get("/unidades", new UnidadeController().readAll)
rotas.get("/unidades/:id_unidade", new UnidadeController().readOne)
rotas.get("/unidades/fk_curso", new UnidadeController().readByCurso)
rotas.put("/unidades/:id_unidade", new UnidadeController().update)
rotas.delete("/unidades/:id_unidade", new UnidadeController().delete)

//Aula
rotas.post("/aulas", new AulaController().create)
rotas.get("/aulas", new AulaController().readAll)
rotas.get("/aulas/:id_aula", new AulaController().readOne)
rotas.put("/aulas/:id_aula", new AulaController().update)
rotas.delete("/aulas/:id_aula", new AulaController().delete)

rotas.post("/recessos", new RecessoController().create)
rotas.get("/recessos", new RecessoController().readAll)
rotas.get("/recessos/:id_aula", new RecessoController().readOne)
rotas.put("/recessos/:id_aula", new RecessoController().update)
rotas.delete("/recessos/:id_aula", new RecessoController().delete)


export default rotas
