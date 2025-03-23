import { Injectable } from '@angular/core';
import { BackEndService } from '../../services/back-end/back-end.service';
import { Arquivo } from '../../interfaces/arquivo';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ListarVideosService {

  // Atributo
  private arquivos: Arquivo[] = [];
  private continuar = false;
  private contador = 0;
  private readonly LIMIT = 18;
  
  // Construtor
  constructor(
    private readonly backEnd: BackEndService,
    private readonly spinner: SpinnerService) { }

  // Getter
  public getArquivos(): Arquivo[] {
    return this.arquivos;
  }

  public getContinuar(): boolean {
    return this.continuar;
  }

  // Setter
  private setArquivos(arquivos: Arquivo[]) {
    this.arquivos = arquivos;
  }

  // Método público
  public listar(spin: boolean): void {

    // Não envia a requisição se o usuário não estiver logado
    if(!sessionStorage.getItem('tokenJWT')) return;

    // Roda o spinner
    if(spin) this.spinner.loading = true;

    // Chama o back end
    const sub: Subscription = this.backEnd.listarVideos().subscribe({
      next: (resposta: Arquivo[]) => this.processarResposta(resposta),
      error: () => this.processarErro(),
      complete: () => sub.unsubscribe(),
    });
  }

  public resetar(): void {
    this.arquivos = [];
  }

  // Métodos privados
  private processarResposta(resposta: Arquivo[]): void {
    if(resposta.length > 0) {
      this.formatarTimesTamp(resposta);
      this.setArquivos(resposta);
    } else {
      this.resetar();
    }

    this.spinner.loading = false;

    this.setContinuar(resposta);
    if(this.continuar) setTimeout(() => this.listar(false), 10000);
  }

  private processarErro():void {
    this.spinner.loading = false;
    alert('Erro ao listar os vídeos do usuário!')
  }

  private formatarTimesTamp(arquivos: Arquivo[]): void {
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

  private setContinuar(arquivos: Arquivo[]): void {
    // Se o contador passou do limite, zera o contador e encerra
    if (this.contador > this.LIMIT) {
      this.continuar = false;
      this.contador = 0;
      return;
    } else {
      this.contador++;
    }
    
    // Se o contador está ok e tem arquivo processando, continua
    for (const arquivo of arquivos) {
      if (!arquivo.timestampConclusao) {
        this.continuar = true;
        return;
      }
    }

    // Se não tem arquivo processando, encerra
    this.continuar = false;
  }
}
