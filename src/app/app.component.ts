import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { ListarVideosComponent } from "./components/listar-videos/listar-videos.component";
import { LoginComponent } from "./components/login/login.component";
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterOutlet, 
    LoginComponent, 
    FileUploadComponent, 
    ListarVideosComponent, 
    MatProgressSpinnerModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'f5-estatico';

  constructor(private readonly service: SpinnerService) {}

  public get loading(): boolean {
    return this.service.loading;
  }
}
