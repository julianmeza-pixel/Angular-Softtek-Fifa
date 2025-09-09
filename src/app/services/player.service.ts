import { Injectable } from '@angular/core';
import { PlayerCard } from '../models/player-card.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PlayerService {
    private apiUrl = 'http://localhost:3000/players'; // tu API
    constructor(private http: HttpClient) { }
    
    getPlayers(): Observable<PlayerCard[]> {
    return this.http.get<PlayerCard[]>(this.apiUrl);
  }   
}