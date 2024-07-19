import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { StorageService } from '../../../services/storage.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../dto/User';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    NgFor
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private profiloService: ProfileService, private storageService: StorageService, private router: Router) { }

  utente: User = new User(0, "", "", "", "");

  ngOnInit(): void {
    this.profiloService.getProfilo(this.storageService.getProperty('user_email'))?.subscribe((res: User) => {
      this.utente = res;
      console.log(res)
    })
  }
  //subscribe(id: number) {
  //  let updateCorsi = this.utente.corsi;
  //  this.corsiService.getCorso(id).subscribe((res: Corso) => {
  //    updateCorsi.push(res)

  //    const utenteUpdate = new UtenteUpdate(
  //      this.utente.nome,
  //      this.utente.cognome,
  //      this.utente.email,
  //      this.utente.password,
  //      updateCorsi,
  //      this.utente.ruoli
  //    );
  //    this.profiloService.updateProfilo(utenteUpdate)?.subscribe((res) => {
  //      window.location.reload();
  //    })
  //  })
  //}

  //unsubscribe(id: number) {
  //  let updateCorsi = this.utente.corsi;
  //  updateCorsi = this.utente.corsi.filter(corso => corso.id !== id)
  //  const utenteUpdate = new UtenteUpdate(
  //    this.utente.nome,
  //    this.utente.cognome,
  //    this.utente.email,
  //    this.utente.password,
  //    updateCorsi,
  //    this.utente.ruoli
  //  );
  //  this.profiloService.updateProfilo(utenteUpdate)?.subscribe((res) => {
  //    window.location.reload();
  //  })
  //}
  logout() {
    this.storageService.deleteProperty('user_email');
    this.storageService.deleteLocalToken();
    this.router.navigate(["/"]);
  }
}
