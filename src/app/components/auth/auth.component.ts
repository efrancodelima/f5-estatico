import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  
  private code = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.code = 'ecb64045-ab4e-4050-baeb-adf1c538a347';
    
    // const code = this.route.snapshot.queryParamMap.get('code');
    // if (this.code.trim().length > 0) {
    //   this.exchangeCodeForToken();
    // }
  }

  exchangeCodeForToken() {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', '5shs30foe4ih00m5dn1hv7ovva') 
      .set('code', this.code.trim())
      .set('redirect_uri', 'https://ljz1ut28p2.execute-api.us-east-1.amazonaws.com/dev');

    const cognitoDomain = '145023126233.auth.us-east-1.amazoncognito.com';
    this.http.post(`https://${cognitoDomain}/oauth2/token`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe(response => {
      console.log('Credenciais recebidas:', response);
      // Armazene as credenciais e redirecione o usuário conforme necessário
    }, error => {
      console.error('Erro ao trocar o código por credenciais:', error);
    });
  }
}
