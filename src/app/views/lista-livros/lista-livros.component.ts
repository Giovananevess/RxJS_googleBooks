import { catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInf';
import { FormControl } from '@angular/forms';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl()
  mensagemErro = ''

  constructor(private service: LivroService) { }


  livroEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      tap(() => console.log('Fluxo inicial')),
      switchMap((valorDigitado) => this.service.buscar
        (valorDigitado)),
      tap((retornoAPI) => console.log(retornoAPI)),
      map((items) => this.livrosResultadoParaLivros(items)),
      catchError(erro => {
        console.log(erro)
        return throwError(() => new Error(this.mensagemErro = 'Ocorreu um erro, recarregue a aplicação'))
      })
    )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}



function valorDigitado(value: any, index: number): value is any {
  throw new Error('Function not implemented.');
}

