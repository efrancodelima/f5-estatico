import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Arquivo } from '../../interfaces/arquivo';
import { ListarVideosService } from '../../services/listar-videos/listar-videos.service';

@Component({
  selector: 'app-listar-videos',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './listar-videos.component.html',
  styleUrl: './listar-videos.component.css'
})
export class ListarVideosComponent {

  // Construtor
  constructor(private readonly listarService: ListarVideosService) {}

  // Getters
  public get arquivos() {
    return this.listarService.arquivos;
  }
}
