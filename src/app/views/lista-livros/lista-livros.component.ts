import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInf';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca: string = ''
  subscriptions: Subscription
  livro: Livro

  constructor(private service: LivroService) { }

  buscarlivros() {
    this.subscriptions = this.service.buscar(this.campoBusca).subscribe(
      {
        next: (items) => {
          this.listaLivros = this.livroResultadoParaLivros(items)
        },
        error: erro => console.error(erro),
      }
    )
  }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}



