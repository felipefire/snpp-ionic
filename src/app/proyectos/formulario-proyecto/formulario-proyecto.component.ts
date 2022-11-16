import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Autores } from 'src/app/interfaces/autores.interface';
import { Proyecto } from 'src/app/interfaces/proyectos.interface';
import { AutoresService } from 'src/app/servicios/autores.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-formulario-Proyecto',
  templateUrl: './formulario-proyecto.component.html',
  styleUrls: ['./formulario-proyecto.component.scss'],
})
export class FormularioProyectoComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaAutores: Autores[] = [];

  public form: FormGroup = new FormGroup({
    idCtrl: new FormControl<number>(null, Validators.required),
    tituloCtrl: new FormControl<string>(null, Validators.required),
    idautorCtrl: new FormControl<number>(null, Validators.required),
    paginasCtrl: new FormControl<number>(null, Validators.required)
  });

  constructor(
    private servicioAutores: AutoresService,
    private servicioToast: ToastController,
    private servicioProyecto: ProyectosService,
  ) { }
 
  private cargarAutores(){
  this.servicioAutores.get().subscribe({
    next: (autores) => {
      this.listaAutores = autores;
    },
    error: (e) => {
      console.error('Error al cargar Autores', e);
      this.servicioToast.create({
        header: 'Error al cargar Autores',
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
    const proyecto: Proyecto = {
      idproyecto: this.form.controls.idCtrl.value,
      titulo: this.form.controls.tituloCtrl.value,
      idautores: this.form.controls.idautorCtrl.value,
      paginas: this.form.controls.paginasCtrl.value,
      idautorCohorte: this.form.controls.idautorCohorteCtrl.value,
      idtecnicatura: this.form.controls.idtecnicaturaCtrl.value
     
    }
    this.servicioProyecto.post(proyecto).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se registró correctamente el Proyecto',
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
    const proyecto: Proyecto = {
      idproyecto: this.form.controls.idCtrl.value,
      titulo: this.form.controls.tituloCtrl.value,
      idautores: this.form.controls.idautorCtrl.value,
      paginas: this.form.controls.paginasCtrl.value,
      idautorCohorte: this.form.controls.idautorCohorteCtrl.value,
      idtecnicatura: this.form.controls.idtecnicaturaCtrl.value
    }
    this.servicioProyecto.put(proyecto).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se editó correctamente el Proyecto',
          duration: 2000,
          color: 'success'
        }).then (t => t.present());
      },
      error: (e) => {
        console.error('Error al editar el Proyecto', e);
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