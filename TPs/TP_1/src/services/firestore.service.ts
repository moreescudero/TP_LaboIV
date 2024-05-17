import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc,collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  logUsuariosCollectionReference: any;
  resultadosCollectionReference: any;  

  constructor(public firestore: Firestore) {
    this.logUsuariosCollectionReference = collection(this.firestore, 'usuarios');
    this.resultadosCollectionReference = collection(this.firestore, 'resultados');
  }

  agregarLog(log: any) {
    return addDoc(this.logUsuariosCollectionReference, log);
  }

  agregarResultado(resultado: any) {
    return addDoc(this.resultadosCollectionReference, resultado);
  }

  listaUsuarios(): Observable<any[]> {
    return collectionData(this.logUsuariosCollectionReference, {idField: 'id'}) as Observable<any[]>;
  }

  listaResultados(): Observable<any[]> {
    return collectionData(this.resultadosCollectionReference, {idField: 'id'}) as Observable<any[]>;
  }
}
