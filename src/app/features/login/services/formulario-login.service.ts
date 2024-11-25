import { Injectable } from '@angular/core';
import { FormularioServiceBase } from '../../../shared/services/formulario-service-base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../../core/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class FormularioLoginService extends FormularioServiceBase {
  constructor(private fb: FormBuilder) {
    super();
    this.formulario = this.definirFormulario();
  }

  protected definirFormulario(): FormGroup {
    return this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  obterValores(): Login {
    return this.formulario.value as Login;
  }

  get obterFormulario(): FormGroup {
    return this.formulario;
  }
}
