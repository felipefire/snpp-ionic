import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { FormularioProyectoComponent } from './formulario-proyecto/formulario-proyecto.component';
import { Proyecto } from '../interfaces/proyectos.interface';
import { ProyectosService } from '../servicios/proyectos.service';
import { SesionService } from '../servicios/sesion.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})


export class ProyectosPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(FormularioProyectoComponent) formularioProyecto!: FormularioProyectoComponent;

   public listaProyectos: Proyecto[]=[]; 
   public cargandoProyectos: boolean = false;
   public modalVisible: boolean = false;

   private proyectoSeleccionado: Proyecto | null = null;
   public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioProyectos: ProyectosService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController,
    public servicioSesion: SesionService
  ) { }

  ngOnInit() {
    this.cargarProyectos();
  }

  public cargarProyectos(){
    this.refresher?.complete();
    this.cargandoProyectos = true;
    this.servicioProyectos.get().subscribe({
      next: (proyectos) => {
        this.listaProyectos = proyectos;
        this.cargandoProyectos = false;
      } ,
      error: (e) => {
        console.error("Error al consultar el Proyecto", e);
        this.cargandoProyectos=false;
        this.servicioToast.create({
          header: 'Error al cargar el Proyecto',
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
    this.proyectoSeleccionado = null;
    this.modalVisible = true;
  }

  public editar(proyecto: Proyecto){
    this.proyectoSeleccionado = proyecto;
    this.modoFormulario = 'Editar';
    if(this.servicioSesion.token != null){
      this.modalVisible = true;
    }
    
  }

  public cargarDatosEditar(){
    console.log(this.proyectoSeleccionado);
  if(this.modoFormulario === 'Editar') {
    this.formularioProyecto.modo = this.modoFormulario;
    this.formularioProyecto.form.controls.idproyectoCtrl.setValue(this.proyectoSeleccionado.idproyecto);
    this.formularioProyecto.form.controls.tituloCtrl.setValue(this.proyectoSeleccionado.titulo);
    this.formularioProyecto.form.controls.idAutoresCtrl.setValue(this.proyectoSeleccionado.idAutores);
    this.formularioProyecto.form.controls.paginasCtrl.setValue(this.proyectoSeleccionado.paginas);
    this.formularioProyecto.form.controls.idCohorteCtrl.setValue(this.proyectoSeleccionado.idCohorte);
    this.formularioProyecto.form.controls.idtecnicaturasCtrl.setValue(this.proyectoSeleccionado.idtecnicaturas);


    }  
  }

  public confirmarEliminacion(proyecto: Proyecto){
    this.servicioAlert.create({
      header: 'Confirmar eliminación',
      subHeader: '¿Realmente desea eliminar el Proyecto?',
      message: `${proyecto.idproyecto} - ${proyecto.titulo} (${proyecto.idAutores})`,
      buttons:[
        {
          text: 'Cancelar',          
        },
        {
          text: 'Eliminar',       
          handler: () => this.eliminar(proyecto)           
        }
      ]
    }).then(a =>a.present());
  }

  private eliminar (proyecto: Proyecto){
    this.servicioProyectos.delete(proyecto).subscribe({
      next: () => {
        this.cargarProyectos();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El Proyecto se eliminó correctamente',
          duration: 2000,
          position: 'bottom',
          color:'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar el Proyecto', e);
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