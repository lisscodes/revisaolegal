import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/model/Tema';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    let id = this.route.snapshot.params['id']
    this.temaById(id)
  }

  temaById(id: number){
    this.temaService.getTemaById(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  editar() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema atualizado')
      this.router.navigate(['/temas'])
    })
  }

}
