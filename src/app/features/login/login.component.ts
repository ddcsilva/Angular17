import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { FormularioLoginService } from './services/formulario-login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  esconderSenha = true;

  constructor(
    public formularioLoginService: FormularioLoginService,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.autenticacaoService.possuiToken() && this.autenticacaoService.estaAutenticado()) {
      this.router.navigate(['/home']);
    }
  }

  aoEfetuarLogin(): void {
    if (this.formularioLoginService.formularioValido()) {
      const credenciais = this.formularioLoginService.obterValores();
      this.autenticacaoService.autenticar(credenciais).subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => console.error('Erro ao tentar efetuar login')
      });
    }
  }
}
