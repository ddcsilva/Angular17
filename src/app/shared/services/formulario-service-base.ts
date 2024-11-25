import { FormControl, FormGroup } from '@angular/forms';

export abstract class FormularioServiceBase {
  protected formulario!: FormGroup;

  protected abstract definirFormulario(): FormGroup;

  obterControle(nome: string): FormControl {
    const controle = this.formulario.get(nome);

    if (!controle) {
      throw new Error(`Controle ${nome} não encontrado no formulário`);
    }

    return controle as FormControl;
  }

  formularioValido(): boolean {
    return this.formulario?.valid || false;
  }

  limpar(): void {
    this.formulario?.reset();
  }
}
