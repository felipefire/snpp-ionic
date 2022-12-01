import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Autores } from 'src/app/interfaces/autores.interface';
import { Proyecto } from 'src/app/interfaces/proyectos.interface';
import { Tecnicaturas } from 'src/app/interfaces/tecnicaturas.interface';
import { AutoresService } from 'src/app/servicios/autores.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { Cohorte } from 'src/app/interfaces/cohorte.interface';
import { TecnicaturasService } from 'src/app/servicios/tecnicaturas.service';
import { CohortesService } from 'src/app/servicios/cohortes.service';

@Component({
  selector: 'app-formulario-proyecto',
  templateUrl: './formulario-proyecto.component.html',
  styleUrls: ['./formulario-proyecto.component.scss'],
})
export class FormularioProyectoComponent implements OnInit {

  @Output()
  recargar = new EventEmitter<boolean>();

  public modo: "Registrar" | "Editar" = "Registrar";

  public listaAutores: Autores[] = [];
  public listaTecnicaturas: Tecnicaturas[] = []
  public listaCohorte: Cohorte[] = []

  public form: FormGroup = new FormGroup({
    idproyectoCtrl: new FormControl<number>(null, Validators.required),
    tituloCtrl: new FormControl<string>(null, Validators.required),
    idCohorteCtrl: new FormControl<number>(null, Validators.required),
    idAutoresCtrl: new FormControl<number>(null, Validators.required),
    idtecnicaturasCtrl: new FormControl<number>(null, Validators.required),
    paginasCtrl: new FormControl<number>(null, Validators.required),
    documentoCtrl: new FormControl(null, Validators.required),
  });

  constructor(
    private servicioAutores: AutoresService,
    private servicioToast: ToastController,
    private servicioProyecto: ProyectosService,
    private servicioTecnicaturas: TecnicaturasService,
    private servicioCohortes: CohortesService,
  ) { }
 
  private cargarAutores(){ // seguir el mismo proceso para tecnicaturas y cohorte
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

  private cargarTecnicaturas(){ 
    this.servicioTecnicaturas.get().subscribe({
      next: (tecnicaturas) => {
        this.listaTecnicaturas = tecnicaturas;
      },
      error: (e) => {
        console.error('Error al cargar Tecnicatura', e);
        this.servicioToast.create({
          header: 'Error al cargar Tecnicatura',
          message: e.error,
          color:'danger'
        })
      }
    });
    }


    private cargarCohortes(){ 
      this.servicioCohortes.get().subscribe({
        next: (cohorte) => {
          this.listaCohorte = cohorte;
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
    this.cargarAutores();// agregar los metodos de carga de tecnicaturas y cohorte
  this.cargarTecnicaturas();
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
      idproyecto: this.form.controls.idproyectoCtrl.value,
      titulo: this.form.controls.tituloCtrl.value,
      idCohorte: this.form.controls.idCohorteCtrl.value,
      idautores: this.form.controls.idAutoresCtrl.value,
      idtecnicatura: this.form.controls.idtecnicaturasCtrl.value,
      paginas: this.form.controls.paginasCtrl.value,
     
     
     
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
    const archivo = this.form.controls.documentoCtrl.value;
    this.servicioProyecto.subirArchivo(proyecto.idproyecto, archivo).subscribe({
      next: ()=>{
        console.log("Se subio el archivo");
      },
      error: (e) =>{
        console.error("error al subir archivo", e);
      }
    })
  }

  private editar(){
    const proyecto: Proyecto = {
      idproyecto: this.form.controls.idproyectoCtrl.value,
      titulo: this.form.controls.tituloCtrl.value,
      idCohorte: this.form.controls.idCohorteCtrl.value,
      idautores: this.form.controls.idAutoresCtrl.value,
      idtecnicatura: this.form.controls.idtecnicaturasCtrl.value,
      paginas: this.form.controls.paginasCtrl.value,
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