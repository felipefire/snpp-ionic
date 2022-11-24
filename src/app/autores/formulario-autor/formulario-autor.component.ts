import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup,Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Autores } from 'src/app/interfaces/autores.interface';

import { AutoresService } from 'src/app/servicios/autores.service';

@Component({
  selector: 'app-formulario-autor',
  templateUrl: './formulario-autor.component.html',
  styleUrls: ['./formulario-autor.component.scss'],
})
export class FormularioAutorComponent implements OnInit {

  

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaAutores: Autores[] = [];

  public form: FormGroup = new FormGroup({
    idCtrl: new FormControl<number>(null, Validators.required),
    tituloCtrl: new FormControl<string>(null, Validators.required),
    idautorCtrl: new FormControl<number>(null, Validators.required),
    paginasCtrl: new FormControl<number>(null, Validators.required),
    nombreAutores: new FormControl<string>(null,Validators.required),
  });

  constructor(
    private servicioAutores: AutoresService,
    private servicioToast: ToastController,
  ) { }
 
  private cargarAutores(){
  this.servicioAutores.get().subscribe({
    next: (autores) => {
      this.listaAutores = autores;
    },
    error: (e) => {
      console.error('Error al cargar Autor', e);
      this.servicioToast.create({
        header: 'Error al cargar Autor',
        message: e.error,
        color:'danger'
      })
    }
  });
  }

  ngOnInit() {
    this.cargarAutores();
  }

  guardar(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      if(this.modo === 'Registrar'){
      this.registrar();
      }else{
        this.editar();
      }
    }
  }

  private registrar(){
    const autor: Autores = {
      
      
      idAutores: this.form.controls.idautorCtrl.value,
      años: this.form.controls.añosCtrl.value,
      ciAutores: this.form.controls.ciAutoresCtrl.value,
      ApellidoAutores: this.form.controls.apellidoAutoresCtrl.value,
     nombreAutores: this.form.controls.apellidoAutoresCtrl.value
     
    }
    this.servicioAutores.post(autor).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se registró correctamente el Autor',
          duration: 2000,
          color: 'success'
        }).then (t => t.present());
      },
      error: (e) => {
        console.error('Error al registrar el Proyecto', e);
        this.servicioToast.create({
          header: 'Error al registrar',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t=> t.present())
      }
    })
  }

  private editar(){
    const autor: Autores = {
      idAutores: this.form.controls.idautorCtrl.value,
      años: this.form.controls.añosCtrl.value,
      ciAutores: this.form.controls.ciAutoresCtrl.value,
      ApellidoAutores: this.form.controls.apellidoAutoresCtrl.value,
     nombreAutores: this.form.controls.apellidoAutoresCtrl.value
     
    }
    this.servicioAutores.put(autor).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se editó correctamente el Autor',
          duration: 2000,
          color: 'success'
        }).then (t => t.present());
      },
      error: (e) => {
        console.error('Error al editar el Autor', e);
        this.servicioToast.create({
          header: 'Error al editar',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t=> t.present())
      }
    })
  }
}