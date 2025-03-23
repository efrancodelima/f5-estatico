import { Component, inject, OnInit } from '@angular/core';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../constants/firebase';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListarVideosService } from '../../services/listar-videos/listar-videos.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  // Atributos
  public userName: string | null = null;

  // Construtor
  constructor(private readonly listarVideos: ListarVideosService) {}

  // Métodos
  ngOnInit(): void {
    const token = sessionStorage.getItem('tokenJWT');
    if (token) {
      this.setUserNameFromToken()
      this.listarVideos.listar(true);
    };
  }

  loginWithGoogle(): void {
    
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      
      const user = result.user;
      
      user.getIdToken().then((token) => {
        sessionStorage.setItem('tokenJWT', token);
        this.setUserNameFromToken();
        this.listarVideos.listar(true);
      });
      
    }).catch(() => undefined);
  }

  logout(): void {
    sessionStorage.removeItem('tokenJWT');
    this.userName = null;
    this.listarVideos.resetar();
  }

  setUserNameFromToken() {
    const token = sessionStorage.getItem('tokenJWT');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userName = decodedToken.name || decodedToken.email || null;
    } else {

    }
  }
}
