import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListarVideosService } from '../../services/listar-videos/listar-videos.service';

@Component({
  selector: 'app-listar-videos',
  standalone: true,
  imports: [ CommonModule, MatProgressSpinnerModule ],
  templateUrl: './listar-videos.component.html',
  styleUrl: './listar-videos.component.css'
})
export class ListarVideosComponent {

  // Construtor
  constructor(private readonly listarService: ListarVideosService) {}

  // Getters
  public get arquivos() {
    return this.listarService.getArquivos();
  }

  public get continuar() {
    return this.listarService.getContinuar();
  }

  public atualizarLista() {
    this.listarService.listar(true);
  }
}
