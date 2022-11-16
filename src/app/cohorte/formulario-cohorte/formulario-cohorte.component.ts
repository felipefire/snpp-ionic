import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Cohorte } from 'src/app/interfaces/cohorte.interface';
import{CohortesService} from 'src/app/servicios/cohortes.service';
import { Proyecto } from 'src/app/interfaces/proyectos.interface';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
@Component({
  selector: 'app-formulario-cohorte',
  templateUrl: './formulario-cohorte.component.html',
  styleUrls: ['./formulario-cohorte.component.scss'],
})
export class FormularioCohorteComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaCohortes: Cohorte[] = [];

  public form: FormGroup = new FormGroup({
    idcohorteCtrl: new FormControl<number>(null, Validators.required),
    idtecnicaturaCtrl: new FormControl<number>(null, Validators.required),
    añosCtrl: new FormControl<number>(null, Validators.required)
  });

  constructor(
    private servicioCohortes: CohortesService,
    private servicioToast: ToastController,
    private servicioProyecto: ProyectosService,
  ) { }
 
  private cargarCohortes(){
  this.servicioCohortes.get().subscribe({
    next: (cohortes) => {
      this.listaCohortes = cohortes;
    },
    error: (e) => {
      console.error('Error al cargar Cohorte', e);
      this.servicioToast.create({
        header: 'Error al cargar Cohorte',
        message: e.error,
        color:'danger'
      })
    }
  });
  }

  ngOnInit() {
    this.cargarCohortes();
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