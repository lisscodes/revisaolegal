import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  entrar(){
    this.auth.logar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;
        environment.id = this.usuarioLogin.id
        environment.foto = this.usuarioLogin.foto
        environment.nome = this.usuarioLogin.nome
        environment.usuario = this.usuarioLogin.usuario
        environment.token = this.usuarioLogin.token


        this.router.navigate(['/inicio'])
      },
      error: erro => {
        if(erro.status == 401) {
          alert('Usuário ou senha inválido')
        }
      }
    })
  }

}
