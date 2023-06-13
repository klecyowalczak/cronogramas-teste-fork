import { Router } from "express"
import CursoController from "../controllers/controllerCurso"
import TurmaController from "../controllers/controllerTurma"
import UnidadeController from "../controllers/controllerUnidade"
import AulaController from "../controllers/controllerAula"

const rotas = Router()

rotas.get("/", (request, response) => {
    return response.json("home page")
})

//Curso
rotas.post("/cursos", new CursoController().create)
rotas.get("/cursos", new CursoController().readAll)
rotas.get("/cursos/:id", new CursoController().readOne)
rotas.put("/cursos/:id", new CursoController().update)
rotas.delete("/cursos/:id", new CursoController().delete)

//Turma
rotas.post("/turmas", new TurmaController().create)
rotas.get("/turmas", new TurmaController().readAll)
rotas.get("/turmas/:id", new TurmaController().readOne)
rotas.put("/turmas/:id", new TurmaController().update)
rotas.delete("/turmas/:id", new TurmaController().delete)

//Unidade
rotas.post("/unidades", new UnidadeController().create)
rotas.get("/unidades", new UnidadeController().readAll)
rotas.get("/unidades/:id", new UnidadeController().readOne)
rotas.put("/unidades/:id", new UnidadeController().update)
rotas.delete("/unidades/:id", new UnidadeController().delete)

//Aula
rotas.post("/aulas", new AulaController().create)
rotas.get("/aulas", new AulaController().readAll)
rotas.get("/aulas/:id", new AulaController().readOne)
rotas.put("/aulas/:id", new AulaController().update)
rotas.delete("/aulas/:id", new AulaController().delete)

export default rotas
