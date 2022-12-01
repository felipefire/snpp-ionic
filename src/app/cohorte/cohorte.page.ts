import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController,IonRefresher, ToastController } from '@ionic/angular';
import { FormularioCohorteComponent } from './formulario-cohorte/formulario-cohorte.component';
import { Cohorte } from '../interfaces/cohorte.interface';
import { CohortesService } from '../servicios/cohortes.service';


@Component({
  selector: 'app-cohorte',
  templateUrl: './cohorte.page.html',
  styleUrls: ['./cohorte.page.scss'],
})
export class CohortePage implements OnInit {


  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(FormularioCohorteComponent) formularioCohorte!: FormularioCohorteComponent;

   public listaCohorte: Cohorte[]=[]; 
   public cargandoCohorte: boolean = false;
   public modalVisible: boolean = false;

   private cohorteSeleccionado: Cohorte | null = null;
   public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioCohorte: CohortesService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarCohorte();
  }
  public cargarCohorte(){
    this.refresher?.complete();
    this.cargandoCohorte = true;
    this.servicioCohorte.get().subscribe({
      next: (cohorte) => {
        this.listaCohorte = cohorte;
        this.cargandoCohorte = false;
      } ,
      error: (e) => {
        console.error("Error al consultar Cohorte", e);
        this.cargandoCohorte=false;
        this.servicioToast.create({
          header: 'Error al cargar Cohorte',
          message: e.message,
          duration:3000,
          position:'bottom',
          color:'danger'
        }).then(toast => toast.present());
      }
    });
  }

  public nuevo(){
    this.modoFormulario = "Registrar";
    this.cohorteSeleccionado = null;
    this.modalVisible = true;
  }

  public editar(cohorte: Cohorte){
    this.cohorteSeleccionado = cohorte
    this.modoFormulario = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar(){
  if(this.modoFormulario === 'Editar') {
    this.formularioCohorte.modo = this.modoFormulario;
    this.formularioCohorte.form.controls.idCohorteCtrl.setValue(this.cohorteSeleccionado.idCohorte);
    this.formularioCohorte.form.controls.añosdesdeCtrl.setValue(this.cohorteSeleccionado.añosdesde);
    this.formularioCohorte.form.controls.añoshastaCtrl.setValue(this.cohorteSeleccionado.añoshasta);
    
  


    }  
  }

  public confirmarEliminacion(cohorte: Cohorte){
    this.servicioAlert.create({
      header: 'Confirmar eliminación',
      subHeader: '¿Realmente desea eliminar Cohorte?',
      message: `${cohorte.idCohorte} - ${cohorte.añosdesde} (${cohorte.añoshasta})`,
      buttons:[
        {
          text: 'Cancelar',          
        },
        {
          text: 'Eliminar',       
          handler: () => this.eliminar(cohorte)           
        }
      ]
    }).then(a =>a.present());
  }

  private eliminar (cohorte: Cohorte){
    this.servicioCohorte.delete(cohorte).subscribe({
      next: () => {
        this.cargarCohorte();
        this.servicioToast.create({
          header: 'Exito',
          message: 'La Cohorte fue  eliminado correctamente',
          duration: 2000,
          position: 'bottom',
          color:'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar la Cohorte', e);
        this.servicioToast.create({
          header: 'Error al eliminar',
          message: e.message,
          duration:3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());            
       }
    });
  }
}