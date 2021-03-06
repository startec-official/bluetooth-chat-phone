import { Injectable } from '@angular/core';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import { from, Observable } from "rxjs";
import { catchError, concatMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BluetoothSerialService {
  constructor(private bluetoothSerial: BluetoothSerial) { }

  activateBluetooth(macAddress: string): Observable<any> {
    return this.enableBluetooth().pipe(
      concatMap(_ => this.bluetoothConnect(macAddress)),
      catchError(err => {
        throw `BluetoothConnectError: ${JSON.stringify(err)}`;
      })
    );
  }

  getDataListener(delimiter: string) {
    return this.bluetoothSerial.subscribe(delimiter);
  }

  bluetoothConnect(macAddress: string) {
    return this.bluetoothSerial.connect(macAddress);
  }

  getBondedDevices() {
    this.bluetoothSerial.list().then(data => {
      console.log('bonded devices: ' + JSON.stringify(data));
    }).catch(error => {
      console.log('RetrieveBondedDevicesError: ' + JSON.stringify(error));
    });
  }

  isConnected() {
    return from(this.bluetoothSerial.isConnected());
  }

  enableBluetooth() {
    return from(this.bluetoothSerial.enable());
  }

  writeString(inputString: string): Observable<any> {
    return from(this.bluetoothSerial.write(inputString)).pipe(
      catchError(err => {
        throw `WriteStringError: ${JSON.stringify(err)}`;
      })
    );
  }
}
