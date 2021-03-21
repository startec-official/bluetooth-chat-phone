import { Injectable } from '@angular/core';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import { from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BluetoothSerialService {
  constructor(private bluetoothSerial: BluetoothSerial) { }

  bluetoothConnect(macAddress: string) {
    this.bluetoothSerial.connect(macAddress).subscribe(_ => {
      console.log('connect success!');
    }, error => {
      console.log('ConnectError: ' + JSON.stringify(error));
    });
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

  writeString() {
    // Write a string
    from(this.bluetoothSerial.write('hello world')).subscribe(_ => {
      console.log('write success!');
    },
      error => {
        console.log('WriteError: ' + JSON.stringify(error));
      });
  }
}
