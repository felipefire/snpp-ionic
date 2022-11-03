import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ToastController } from '@ionic/angular';

import { Proyecto } from '../interfaces/proyecto.interface';
import { ProyectosService } from '../servicios/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;

   public listaProyectos: Proyecto[]=[]; 
   public cargandoProyectos: boolean = false;
   public modalVisible: boolean = false;

  constructor(
    private servicioProyectos: ProyectosService,
    private servicioToast: ToastController
  ) { }

  ngOnInit() {
    this.cargarLibros();
  }
  public cargarLibros(){
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
    this.modalVisible = true;
  }

}