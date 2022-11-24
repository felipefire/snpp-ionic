import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { FormularioAutorComponent } from './formulario-autor/formulario-autor.component';
import { Autores } from '../interfaces/autores.interface';
import { AutoresService } from '../servicios/autores.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autor.page.html',
  styleUrls: ['./autor.page.scss'],
})

export class AutoresPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(FormularioAutorComponent) formularioAutor!: FormularioAutorComponent;

   public listaAutor: Autores[]=[]; 
   public cargandoAutor: boolean = false;
   public modalVisible: boolean = false;

   private autorSeleccionado: Autores | null = null;
   public modoFormulario: 'Registrar' | 'Editar' = 'Registrar';

  constructor(
    private servicioAutores: AutoresService,
    private servicioToast: ToastController,
    private servicioAlert: AlertController
  ) { }

  ngOnInit() {
    this.cargarAutores();
  }
  public cargarAutores(){
    this.refresher?.complete();
    this.cargandoAutor = true;
    this.servicioAutores.get().subscribe({
      next: (autores) => {
        this.listaAutor = autores;
        this.cargandoAutor = false;
      } ,
      error: (e) => {
        console.error("Error al consultar el Autor", e);
        this.cargandoAutor=false;
        this.servicioToast.create({
          header: 'Error al cargar Autor',
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
    this.autorSeleccionado = null;
    this.modalVisible = true;
  }

  public editar(autor: Autores){
    this.autorSeleccionado = autor
    this.modoFormulario = 'Editar';
    this.modalVisible = true;
  }

  public cargarDatosEditar(){
  if(this.modoFormulario === 'Editar') {
    this.formularioAutor.modo = this.modoFormulario;
    this.formularioAutor.form.controls.idCtrl.setValue(this.autorSeleccionado.idAutores);
    this.formularioAutor.form.controls.ciAutoresCtrl.setValue(this.autorSeleccionado.ciAutores);
    this.formularioAutor.form.controls.ApellidoAutoresCtrl.setValue(this.autorSeleccionado.ApellidoAutores);
    this.formularioAutor.form.controls.añosCtrl.setValue(this.autorSeleccionado.años);
    this.formularioAutor.form.controls.nombreAutoresCtrl.setValue(this.autorSeleccionado.nombreAutores);
  


    }  
  }

  public confirmarEliminacion(autor: Autores){
    this.servicioAlert.create({
      header: 'Confirmar eliminación',
      subHeader: '¿Realmente desea eliminar el Autor?',
      message: `${autor.idAutores} - ${autor.nombreAutores} (${autor.ciAutores})`,
      buttons:[
        {
          text: 'Cancelar',          
        },
        {
          text: 'Eliminar',       
          handler: () => this.eliminar(autor)           
        }
      ]
    }).then(a =>a.present());
  }

  private eliminar (autor: Autores){
    this.servicioAutores.delete(autor).subscribe({
      next: () => {
        this.cargarAutores();
        this.servicioToast.create({
          header: 'Exito',
          message: 'El Autor fue  eliminado correctamente',
          duration: 2000,
          position: 'bottom',
          color:'success'
        }).then(t => t.present());
      },
      error: (e) => {
        console.error('Error al eliminar el Autor', e);
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