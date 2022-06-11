import { AuthService } from './../service/auth.service';
import { PostagemService } from './../service/postagem.service';
import { TemaService } from './../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  temaId: number

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private auth: AuthService
  ) { }

  ngOnInit(){
    this.auth.refreshToken()
    this.buscarTemas()
    this.buscarPostagens()
  }

  buscarTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  temaById(){
    this.temaService.getTemaById(this.temaId).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  publicar() {
    this.tema.id = this.temaId
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem feita com sucesso')
      this.postagem = new Postagem()
      this.buscarPostagens()
    })
  }

  buscarPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  getUsuarioById() {
    this.auth.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      console.log(this.usuario)
    })
  }

}
