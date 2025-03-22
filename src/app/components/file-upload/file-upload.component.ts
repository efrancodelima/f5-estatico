import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListarVideosService } from '../../services/listar-videos/listar-videos.service';
import { BackEndService } from '../../services/back-end/back-end.service';
import { ResponseError } from '../../interfaces/response-error';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  form: FormGroup;
  
  constructor(
      private readonly backEnd: BackEndService,
      private fb: FormBuilder,
      private readonly listarVideos: ListarVideosService,
      private readonly spinner: SpinnerService) {

    this.form = this.fb.group({
      files: [null, Validators.required]
    });
  }

  get loading(): boolean {
    return this.spinner.loading;
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.form.patchValue({
      files: files
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.spinner.loading = true;
      this.enviarVideos();
    } else {
      alert('Selecione o arquivo!');
    }
  }

  private enviarVideos() {
    const requisicao = new FormData();
    const files: FileList = this.form.get('files')?.value;

    for (const file of Array.from(files)) {
      requisicao.append('file', file);
    }
    
    const sub = this.backEnd.enviarVideos(requisicao)
        .subscribe({
          next: () => this.processarResposta(),
          error: (erro: ResponseError) => this.processarErro(erro),
          complete: () => sub.unsubscribe()
        });
  }

  private processarResposta() {
    this.spinner.loading = false;
    this.listarVideos.listar(true);
  }

  private processarErro(erro: ResponseError) {
    this.spinner.loading = false;
              
    if (erro.status == 401) {
      alert('Acesso não autorizado!');
    } else {
      alert('Erro ao enviar o arquivo!');
    }
  }
}
