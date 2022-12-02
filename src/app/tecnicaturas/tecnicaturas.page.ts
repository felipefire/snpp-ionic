import { Component, OnInit, ViewChild} from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import {FormularioTecnicaturasComponent} from './formulario-tecnicaturas/formulario-tecnicaturas.component';
import { Tecnicaturas } from '../interfaces/tecnicaturas.interface';
import { TecnicaturasService } from '../servicios/tecnicaturas.service';

@Component({
  selector: 'app-tecnicaturas',
  templateUrl: './tecnicaturas.page.html',
  styleUrls: ['./tecnicaturas.page.scss'],
})
export class TecnicaturasPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(FormularioTecnicaturasComponent) formularioTecnicaturas!: FormularioTecnicaturasComponent;

  public listaTecnicaturas: Tecnicaturas[] = [];
  public cargarTecnicaturas: boolean = false;
  public modalVisible: boolean = false;

  private tecnicaturasSeleccionado: Tecnicaturas | null = null;
  public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioTecnicaturas: TecnicaturasService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargandoTecnicaturas();
  }

  public cargandoTecnicaturas() {
    this.refresher?.complete();
    this.cargarTecnicaturas = true;
    this.servicioTecnicaturas.get().subscribe({
      next: (tecnicaturas) => {
        this.listaTecnicaturas = tecnicaturas;
        this.cargarTecnicaturas = false;
      },
      error: (e) => {
        console.error("Error al consultar el Tecnicatura", e);
        this.cargarTecnicaturas = false;
        this.servicioToast.create({
          header: 'Error al cargar la Tecnicatura',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  public nuevo() {
    this.modoFormulario = "Registrar";
    this.tecnicaturasSeleccionado = null;
    this.modalVisible = true;
  }

  public editar(tecnicaturas: Tecnicaturas) {
    this.tecnicaturasSeleccionado = tecnicaturas;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar() {
    if (this.modoFormulario === 'Editar') {
      this.formularioTecnicaturas.modo = this.modoFormulario;
      this.formularioTecnicaturas.form.controls.idtecnicaturaCtrl.setValue(this.tecnicaturasSeleccionado.idtecnicatura);
      this.formularioTecnicaturas.form.controls.especialidadesCtrl.setValue(this.tecnicaturasSeleccionado.especialidades);


    }
  }

  public confirmarEliminacion(tecnicaturas: Tecnicaturas) {
    this.servicioAlert.create({
      header: 'Confirmar eliminación',
      subHeader: '¿Realmente desea eliminar la Tecnicatura?',
      message: `${tecnicaturas.idtecnicatura} - ${tecnicaturas.especialidades} `,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          handler: () => this.eliminar(tecnicaturas)
        }
      ]
    }).then(a => a.present());
  }

  private eliminar(tecnicaturas: Tecnicaturas) {
    this.servicioTecnicaturas.delete(tecnicaturas).subscribe({
      next: () => {
        this.cargandoTecnicaturas();
        this.servicioToast.create({
          header: 'Exito',
          message: 'La Tecnicatura se eliminó correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar la Tecnicatura', e);
        this.servicioToast.create({
          header: 'Error al eliminar',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }
}