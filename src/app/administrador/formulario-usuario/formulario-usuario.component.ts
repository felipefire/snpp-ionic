import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Usuarios } from 'src/app/interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'],
})
export class FormularioUsuarioComponent implements OnInit {


  public listaUsuarios: Usuarios[] = [];

  public id: number | null = null;
  public titulo: string | null = null;
  public idautor: number| null = null;
  public paginas: number | null = null;

  public idValidado: boolean = true;
  public tituloValidado: boolean = true;
  public idautorValidado: boolean = true;
  public paginasValidado: boolean = true;


  constructor(
    private servicioUsuarios: UsuariosService,
    private servicioToast: ToastController 
  ) { }

  private cargarUsuarios(){
  this.servicioUsuarios.get().subscribe({
    next: (usuarios) => {
      this.listaUsuarios = usuarios;
    },
    error: (e) => {
      console.error('Error al cargar el Usuario', e);
      this.servicioToast.create({
        header: 'Error al cargar el Usuario',
        message: e.error,
        color:'danger'
      })
    }
  });
  }

  ngOnInit() {
    this.cargarUsuarios();
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
