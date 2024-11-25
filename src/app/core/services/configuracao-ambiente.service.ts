import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Configuracao } from '../models/configuracao.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracaoAmbienteService {
  private _urlApi = '';
  private _configuracaoCarregada = false;

  constructor(private http: HttpClient) {}

  get urlApi(): string {
    return this.urlApi;
  }

  carregarConfiguracao(): Observable<void> {
    if (this._configuracaoCarregada) {
      return of();
    }

    const caminhoArquivo = '/assets/settings.json';

    return this.http.get<Configuracao>(caminhoArquivo).pipe(
      map((configuracao: Configuracao) => {
        this._urlApi = configuracao.urlApi;
        this._configuracaoCarregada = true;
      }),
      catchError((erro) => {
        const mensagemErro = `Erro ao carregar o arquivo de configuração: ${caminhoArquivo}: ${erro}`;
        console.error(mensagemErro);
        return throwError(() => new Error(mensagemErro));
      })
    );
  }
}
