export interface Proyecto{
    idproyecto: number | null;
    titulo: string | null;
    idCohorte: number| null;
    idAutores: number | null;
    paginas: number | null;
    idtecnicaturas: number | null;
    nombreAutores?: string;
    ApellidoAutores?: string;
    anhosdesde?: number;
    anhoshasta?: number;
    especialidades?: string;
}