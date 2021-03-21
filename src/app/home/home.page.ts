import { Component } from '@angular/core';
import { BluetoothSerialService } from '../utils/bluetooth-serial.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private btSerial: BluetoothSerialService) {}

  connect() {
    this.btSerial.bluetoothConnect('B8:27:EB:3C:63:B4');
  }

  writeString() {
    this.btSerial.writeString();
  }
}
