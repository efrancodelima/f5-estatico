import { Injectable } from '@angular/core';
import { BackEndService } from '../../services/back-end/back-end.service';
import { Arquivo } from '../../interfaces/arquivo';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListarVideosService {

  // Atributo
  private _arquivos: Arquivo[] = [];

  // Construtor
  constructor(private readonly backEnd: BackEndService) { }

  // Getter
  public get arquivos() {
    return this._arquivos;
  }

  // Setter
  private _setArquivos(arquivos: Arquivo[]) {
    this._arquivos = arquivos;
  }

  // Método público
  public listar(): void {

    // Não envia a requisição se o usuário não estiver logado
    if(!sessionStorage.getItem('tokenJWT')) return;

    const sub: Subscription = this.backEnd.listarVideos().subscribe({
      next: (resposta: Arquivo[]) => this._processarResposta(resposta),
      error: () => alert('Erro ao listar os vídeos do usuário!'),
      complete: () => sub.unsubscribe(),
    });
  }

  public resetar(): void {
    this._arquivos = [];
  }

  // Métodos privados
  private _processarResposta(resposta: Arquivo[]): void {
    if(resposta.length > 0) {
      this._formatarTimesTamp(resposta);
      this._setArquivos(resposta);
      this._novaListagem(resposta);
    } else {
      this.resetar();
    }
  }

  private _formatarTimesTamp(arquivos: Arquivo[]): void {
    for (const arquivo of arquivos) {

      const date = new Date(arquivo.timestampInicio);

      const dia = String(date.getDate()).padStart(2, '0');
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const ano = date.getFullYear();

      const hora = String(date.getHours()).padStart(2, '0');
      const minuto = String(date.getMinutes()).padStart(2, '0');
      const segundo = String(date.getSeconds()).padStart(2, '0');

      arquivo.timestampInicio = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
    }
  }

  // Caso haja algum vídeo não finalizado, refaz a consulta após 10 segundos
  private _novaListagem(arquivos: Arquivo[]): void {
    for (const arquivo of arquivos) {
      if (!arquivo.timestampConclusao) {
        setTimeout(() => this.listar(), 10000);
      }
    }
  }
}
