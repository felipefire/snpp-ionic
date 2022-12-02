import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Cohorte } from 'src/app/interfaces/cohorte.interface';
import{CohortesService} from 'src/app/servicios/cohortes.service';

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
    idCohorteCtrl: new FormControl<number>(null, Validators.required),
    anhosdesdeCtrl: new FormControl<number>(null, Validators.required),
    anhoshastaCtrl: new FormControl<number>(null, Validators.required)
  });

  constructor(
    private servicioCohorte: CohortesService,
    private servicioToast: ToastController,
  
  ) { }
 
  private cargarCohorte(){
  this.servicioCohorte.get().subscribe({
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
    this.cargarCohorte();
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
    const cohorte: Cohorte = {
      idCohorte: this.form.controls.idCohorteCtrl.value,
      anhosdesde: this.form.controls.anhosdesdeCtrl.value,
      anhoshasta: this.form.controls.anhoshastaCtrl.value,
     
     
    }
    this.servicioCohorte.post(cohorte).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se registró correctamente la Cohorte',
          duration: 2000,
          color: 'success'
        }).then (t => t.present());
      },
      error: (e) => {
        console.error('Error al registrar la Cohorte', e);
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
    const cohorte: Cohorte = {
      idCohorte: this.form.controls.idCohorteCtrl.value,
      anhosdesde: this.form.controls.anhosdesdeCtrl.value,
      anhoshasta: this.form.controls.anhoshastaCtrl.value,
     
    }
    this.servicioCohorte.put(cohorte).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se editó correctamente el Cohorte',
          duration: 2000,
          color: 'success'
        }).then (t => t.present());
      },
      error: (e) => {
        console.error('Error al editar el Cohorte', e);
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