import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ListarVideosService } from '../../services/listar-videos/listar-videos.service';
import { BackEndService } from '../../services/back-end/back-end.service';
import { ResponseError } from '../../interfaces/response-error';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatProgressSpinnerModule ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  form: FormGroup;
  loading = false;
  
  constructor(private readonly backEnd: BackEndService, private fb: FormBuilder,
      private readonly listarVideos: ListarVideosService) {

    this.form = this.fb.group({
      files: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.form.patchValue({
      files: files
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this._enviarVideos();
    } else {
      alert('Selecione o arquivo!');
    }
  }

  private _enviarVideos() {
    const requisicao = new FormData();
    const files: FileList = this.form.get('files')?.value;

    for (const file of Array.from(files)) {
      requisicao.append('file', file);
    }
    
    const sub = this.backEnd.enviarVideos(requisicao)
        .subscribe({
          next: () => this._processarResposta(),
          error: (erro: ResponseError) => this._processarErro(erro),
          complete: () => sub.unsubscribe()
        });
  }

  private _processarResposta() {
    this.loading = false;
    this.listarVideos.listar();
  }

  private _processarErro(erro: ResponseError) {
    this.loading = false;
              
    if (erro.status == 401) {
      alert('Acesso não autorizado!');
    } else {
      alert('Erro ao enviar o arquivo!');
    }
  }
}
