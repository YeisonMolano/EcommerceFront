import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../modells/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private rutaGlobal = 'http://localhost:8080/persona/'

  constructor(private http: HttpClient) { }

  getAllPersonas(){
    return this.http.get<Persona[]>(this.rutaGlobal + 'get-all')
  }

  newPersona(persona: Persona){
    return this.http.post<Persona>(this.rutaGlobal + 'new-persona', persona, {
      observe: 'response'
    })
  }

  updatePersona(persona: Persona){
    return this.http.put<Persona>(this.rutaGlobal + persona.numIdentificacion, persona, {
      observe: 'response'
    })
  }

  deletePersona(idPersona : number){
    return this.http.delete(this.rutaGlobal + idPersona)
  }
}
