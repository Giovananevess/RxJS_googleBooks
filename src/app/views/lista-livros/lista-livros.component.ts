import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Livro } from 'src/app/models/interfaces';

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



  livroResultadoParaLivros(items): Livro[] {
    const livros: Livro[] = []

    items.forEach(item => {
      livros.push(this.livro = {
        title: item.VolumeInfo?.title,
        authors: item.VolumeInfo?.authors,
        publisher: item.VolumeInfo?.publisher,
        publishedDate: item.VolumeInfo?.publishedDate,
        description: item.VolumeInfo?.description,
        previewLink: item.VolumeInfo?.previewLink,
        thumbnail: item.VolumeInfo?.ImageLinks?.thumbnail
      })
    })
    return livros
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}



