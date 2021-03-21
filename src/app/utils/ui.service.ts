import { EventEmitter, Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {


  constructor(private toastCtl: ToastController) { }

  async presentToast(_message: string, _duration: number) {
    const toast = await this.toastCtl.create({
      message: _message,
      duration: _duration
    });
    toast.present();
  }
}
