import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Tecnicaturas } from 'src/app/interfaces/tecnicaturas.interface';
import { TecnicaturasService } from 'src/app/servicios/tecnicaturas.service';
import { FormControl, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-formulario-tecnicaturas',
  templateUrl: './formulario-tecnicaturas.component.html',
  styleUrls: ['./formulario-tecnicaturas.component.scss'],
})
export class FormularioTecnicaturasComponent implements OnInit {



  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";


  public listaTecnicaturas: Tecnicaturas[] = []


  public form: FormGroup = new FormGroup({
    idtecnicaturasCtrl: new FormControl<number>(null, Validators.required),
    especialidadesCtrl: new FormControl<string>(null, Validators.required),
  });


  constructor(
    private servicioTecnicaturas: TecnicaturasService,
    private servicioToast: ToastController,

  ) { }
  private cargarTecnicaturas() {
    this.servicioTecnicaturas.get().subscribe({
      next: (tecnicaturas) => {
        this.listaTecnicaturas = tecnicaturas;
      },
      error: (e) => {
        console.error('Error al cargar Autor', e);
        this.servicioToast.create({
          header: 'Error al cargar Autor',
          message: e.error,
          color: 'danger'
        })
      }
    });
  }

  ngOnInit() {
    this.cargarTecnicaturas();
  }

  guardar() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.modo === 'Registrar') {
        this.registrar();
      } else {
        this.editar();
      }
    }
  }

  private registrar() {
    const tecnicaturas: Tecnicaturas = {


      idtecnicaturas: this.form.controls.idtecnicaturaCtrl.value,
      
      especialidades: this.form.controls.especialidadesCtrl.value
    }
    this.servicioTecnicaturas.post(tecnicaturas).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se registró correctamente la Tecnicatura',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al registrar la Tecnicatura', e);
        this.servicioToast.create({
          header: 'Error al registrar',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present())
      }
    })
  }

  private editar() {
    const tecnicaturas: Tecnicaturas = {
      idtecnicaturas: this.form.controls.idtecnicaturaCtrl.value,
      
      especialidades: this.form.controls.especialidadesCtrl.value

    }
    this.servicioTecnicaturas.put(tecnicaturas).subscribe({
      next: () => {
        this.recargar.emit(true);
        this.servicioToast.create({
          header: 'Éxito',
          message: 'Se editó correctamente la Tecnicatura',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al editar la Tecnicatura', e);
        this.servicioToast.create({
          header: 'Error al editar',
          message: e.message,
          duration: 3500,
          color: 'danger'
        }).then(t => t.present())
      }
    })
  }
}