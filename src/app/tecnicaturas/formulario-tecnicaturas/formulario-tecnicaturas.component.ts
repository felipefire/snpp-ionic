import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Tecnicaturas } from 'src/app/interfaces/tecnicaturas.interface';
import { TecnicaturasService } from 'src/app/servicios/tecnicaturas.service';
@Component({
  selector: 'app-formulario-tecnicaturas',
  templateUrl: './formulario-tecnicaturas.component.html',
  styleUrls: ['./formulario-tecnicaturas.component.scss'],
})
export class FormularioTecnicaturasComponent implements OnInit {

  public listaTecnicaturas: Tecnicaturas[] = [];

  public id: number | null = null;
  public titulo: string | null = null;
  public idautor: number| null = null;
  public paginas: number | null = null;

  public idValidado: boolean = true;
  public tituloValidado: boolean = true;
  public idautorValidado: boolean = true;
  public paginasValidado: boolean = true;


  constructor(
    private servicioTecnicaturas: TecnicaturasService,
    private servicioToast: ToastController 
  ) { }

  private cargarTecnicaturas(){
  this.servicioTecnicaturas.get().subscribe({
    next: (tecnicaturas) => {
      this.listaTecnicaturas = tecnicaturas;
    },
    error: (e) => {
      console.error('Error al cargar la Tecnicatura', e);
      this.servicioToast.create({
        header: 'Error al cargar la Tecnicatura',
        message: e.error,
        color:'danger'
      })
    }
  });
  }

  ngOnInit() {
    this.cargarTecnicaturas();
  }

  guardar(){
    this.validar();
  }

  private validar(): boolean{
    this.idValidado = this.id !== null;
    this.tituloValidado = this.titulo !== null && this.titulo.length > 0;
    this.idautorValidado = this.idautor !== null;
    this.paginasValidado = this.paginas !== null && this.paginas > 0;
    return this.idValidado && this.tituloValidado && this.idValidado && this.paginasValidado;

  }

}







