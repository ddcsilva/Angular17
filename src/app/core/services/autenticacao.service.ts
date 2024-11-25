import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracaoAmbienteService } from './configuracao-ambiente.service';
import { TokenService } from './token.service';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Login } from '../models/login.model';
import { RespostaGenerica } from '../models/resposta-generica.model';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private _urlApi = `${this.configuracaoAmbienteService.urlApi}/Seguranca`;
  private estadoUsuario = new BehaviorSubject<Usuario | null>(null);

  public readonly usuario$ = this.estadoUsuario.asObservable();

  constructor(
    private http: HttpClient,
    private configuracaoAmbienteService: ConfiguracaoAmbienteService,
    private tokenService: TokenService
  ) {}

  autenticar(login: Login): Observable<RespostaGenerica> {
    return this.http
      .post<RespostaGenerica>(`${this._urlApi}/Logon`, login)
      .pipe(
        tap((resposta) => this.definirSessao(resposta)),
        catchError((erro) => {
          console.error('Erro ao tentar efetuar login:', erro);
          throw erro;
        })
      );
  }

  efetuarLogoff(): void {
    this.limparSessao();
  }

  estaAutenticado(): boolean {
    const expiracao = this.obterExpiracao();
    return expiracao ? expiracao > new Date().getTime() / 1000 : false;
  }

  possuiToken(): boolean {
    return this.tokenService.obterToken() !== null;
  }

  private obterExpiracao(): number | null {
    const tokenDecodificado = this.tokenService.obterTokenDecodificado();
    return tokenDecodificado ? tokenDecodificado[Token.exp] : null;
  }

  private obterUsuarioDoToken(): Usuario | null {
    const tokenDecodificado = this.tokenService.obterTokenDecodificado();

    if (!tokenDecodificado) {
      return null;
    }

    const usuario: Usuario = {
      estaAutenticado: true,
      login: tokenDecodificado[Token.login] || '',
      nome: tokenDecodificado[Token.nome] || '',
      recursos: tokenDecodificado[Token.recursos] || [],
      papeis: tokenDecodificado[Token.papeis] || [],
      ehGestor: tokenDecodificado[Token.ehGestor]
        ? JSON.parse(tokenDecodificado[Token.ehGestor].toLowerCase())
        : false,
      avatar: tokenDecodificado[Token.linkAvatar]
        ? `http://${tokenDecodificado[Token.linkAvatar]}`
        : '',
    };

    return usuario.login ? usuario : null;
  }

  definirUsuarioDoToken(): void {
    const usuario = this.obterUsuarioDoToken();
    this.estadoUsuario.next(usuario);
  }

  private definirSessao(resposta: RespostaGenerica): void {
    this.tokenService.definirToken(resposta.data.jwtToken);
    this.definirUsuarioDoToken();
  }

  private limparSessao(): void {
    this.tokenService.removerToken();
    this.estadoUsuario.next(null);
  }
}
