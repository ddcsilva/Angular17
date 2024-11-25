export interface Usuario {
  login: string;
  nome: string;
  recursos: string[];
  ehGestor: boolean;
  papeis: string[];
  avatar: string;
  estaAutenticado: boolean;
}
