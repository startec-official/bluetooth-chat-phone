import { Component, OnInit } from '@angular/core';
import { BluetoothSerialService } from '../utils/bluetooth-serial.service';
import { UiService } from '../utils/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  sendData: string;

  constructor(private btSerial: BluetoothSerialService, private uiService: UiService) {}
  
  ngOnInit(): void {
    this.sendData = "";
  }

  activateBluetooth() {
    this.btSerial.activateBluetooth('B8:27:EB:3C:63:B4').subscribe(_ => {
      console.log('connected to bluetooth!');
      this.uiService.presentToast('connected to Raspberry Pi!', 500);
    },
    error => {
      console.log(`activate bluetooth encountered an error: ${error}`);
      this.uiService.presentToast(`activate bluetooth encountered an error: ${error}`,1000);
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
