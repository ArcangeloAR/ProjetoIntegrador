import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupos } from '../model/Grupos';
import { Postagens } from '../model/Postagens';
import { Usuarios } from '../model/Usuarios';
import { AlertasService } from '../service/alertas.service';
import { GruposService } from '../service/grupos.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postagens: Postagens = new Postagens()
  grupos: Grupos = new Grupos()
  usuarios: Usuarios = new Usuarios()
  listaGrupos: Grupos[]
  listaPostagens: Postagens[]
  idUsuario = environment.idUserLogin

  constructor(
    private router: Router,
    private gruposService: GruposService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.router.navigate(['/home'])
      this.alertas.showAertInfo('É necessário logar novamente')
    }
    this.gruposService.refreshToken()
    this.findAllGrupos()
    this.findAllPostagens()
  }


  findAllGrupos() {
    this.gruposService.getAllGrupos().subscribe((resp: Grupos[]) => {
      this.listaGrupos = resp
    })
  }

  findAllPostagens() {
    this.gruposService.getAllPostagens().subscribe((resp: Postagens[]) => {
      this.listaPostagens = resp
    })
  }


  cadastrar() {
    console.log(environment.idUserLogin)
    this.gruposService.postGrupos(this.grupos, environment.idUserLogin).subscribe((resp: Grupos) => {
      this.grupos = resp
      this.alertas.showAlertSuccess('Grupo cadastrado com sucesso!')
      this.grupos = new Grupos()
    })
    this.findAllGrupos()
  }

  postar() {
    this.gruposService.postPostagem(this.postagens, environment.idUserLogin).subscribe((resp: Postagens) => {
      this.postagens = resp
      this.alertas.showAlertSuccess("Postagem cadastrada com sucesso!")
      this.postagens = new Postagens()
    })
    this.listaPostagens
  }

  entrarGrupo(grupo: Grupos) {
    console.log(grupo.idGrupo)
    this.gruposService.addGrupo(environment.idUserLogin, grupo.idGrupo).subscribe((resp: Usuarios) => {
      this.usuarios = resp
      this.alertas.showAlertSuccess('Adicionado com sucesso')
    })
  }

  verificarUser() {

    let ok: boolean = false
    if (this.usuarios.tipo == "adm") {
      ok = true
    } else {
      ok = false
    }
    return ok
  }

  verificaUsuarioGrupo(grupo: Grupos) {
    let ok: boolean = true
    //console.log(this.usuarios.listaGrupos.includes(grupo))
    //return this.usuarios.listaGrupos.includes(grupo)
    for (let i = 0; i < this.usuarios.listaGrupos.length; i++) {
      if (this.usuarios.listaGrupos[i].idGrupo == grupo.idGrupo) {
        ok = false
        return ok
      }
    }
    return ok
  }

  verificaNull(postagem: Postagens){
    let ok: boolean = false
    if (postagem.grupoPertencente == null) {
      ok = true
    }
    return ok
  }

  deleteGrupo(grupo: Grupos) {

    if (grupo.listaParticipantes.length == 0) {
      this.gruposService.deleteGrupos(grupo.idGrupo).subscribe(()=>{
        this.alertas.showAlertSuccess("Grupo apagado com sucesso")
        console.log("Grupo apagado com sucesso")
        //this.findAllGrupos()
        this.router.navigate(['/feed'])
      })
    } else {
      this.alertas.showAlertDanger("Não é possível excluir um grupo com membros ativos")
    }
  }

  findUsuarioId() {
    return this.gruposService.findByIdUsuario(this.idUsuario).subscribe((resp: Usuarios) => {
      this.usuarios = resp
    })
  }
}




