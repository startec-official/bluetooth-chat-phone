import { Component, OnInit } from '@angular/core';
import { BluetoothSerialService } from '../utils/bluetooth-serial.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  sendData: string;

  constructor(private btSerial: BluetoothSerialService) {}
  
  ngOnInit(): void {
    this.sendData = "";
    this.activateBluetooth();
  }

  activateBluetooth() {
    this.btSerial.activateBluetooth('B8:27:EB:3C:63:B4').subscribe(_ => {
      console.log('connected to bluetooth!');
    },
    error => {
      console.log(`activate bluetooth encountered an error: ${error}`);
    });
  }

  writeString() {
    this.btSerial.writeString(this.sendData).subscribe(_ => {
      console.log('message sent');
    }, error => {
      console.log(`sending message encountered an error: ${error}`);
    });
  }
}
