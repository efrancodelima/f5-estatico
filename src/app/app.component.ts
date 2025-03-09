import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { ListarVideosComponent } from "./components/listar-videos/listar-videos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, FileUploadComponent, ListarVideosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'f5-estatico';
}
