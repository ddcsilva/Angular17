import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private static readonly CHAVE_TOKEN = 'token';
  private cacheTokenDecodificado: Readonly<{ [chave: string]: any } | null> =
    null;

  definirToken(token: string): void {
    localStorage.setItem(TokenService.CHAVE_TOKEN, token);
    this.cacheTokenDecodificado = null;
  }

  obterToken(): string | null {
    return localStorage.getItem(TokenService.CHAVE_TOKEN);
  }

  removerToken(): void {
    localStorage.removeItem(TokenService.CHAVE_TOKEN);
    this.cacheTokenDecodificado = null;
  }

  obterTokenDecodificado(): Readonly<{ [chave: string]: any }> | null {
    if (this.cacheTokenDecodificado) {
      return this.cacheTokenDecodificado;
    }

    const token = this.obterToken();
    if (!token) {
      return null;
    }

    try {
      this.cacheTokenDecodificado = jwtDecode<{ [chave: string]: any }>(token);
    } catch (erro) {
      console.error('Erro ao decodificar o token:', erro);
      this.cacheTokenDecodificado = null;
    }

    return this.cacheTokenDecodificado;
  }
}
