import { Injectable } from '@angular/core';
import { BackEndService } from '../../services/back-end/back-end.service';
import { Arquivo } from '../../interfaces/arquivo';

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
    const sub = this.backEnd.listarVideos().subscribe({
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
    } else {
      this.resetar();
    }
  }

  private _formatarTimesTamp(arquivos: Arquivo[]): void {
    for (const arquivo of arquivos) {

      const date = new Date(arquivo.timestampInicio);

      const dia = String(date.getDate()).padStart(2, '0');
      const mes = String(date.getMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
      const ano = date.getFullYear();

      const hora = String(date.getHours()).padStart(2, '0');
      const minuto = String(date.getMinutes()).padStart(2, '0');
      const segundo = String(date.getSeconds()).padStart(2, '0');

      arquivo.timestampInicio = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
    }
  }
}
