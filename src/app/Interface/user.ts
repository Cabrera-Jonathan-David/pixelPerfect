export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string | null; 
    codigoArea: string;
    telefono: number | null;
    direccion: string;
    altura: number | null;
    piso?: string; 
    codigoPostal: string;
    ciudad: string;
    provincia: string;
    pais: string;
  }