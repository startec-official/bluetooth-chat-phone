import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BluetoothSerialService } from '../utils/bluetooth-serial.service';
import { UiService } from '../utils/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  sendData: string;
  public messages: { msg: string, self: boolean }[];

  constructor(private btSerial: BluetoothSerialService, private uiService: UiService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sendData = "";
    this.messages = [];
  }

  addMessage(newMessage: string, _self?: boolean) {
    if (!!_self)
      _self = true;
    this.messages.push({ msg: newMessage, self: _self });
  }

  activateBluetooth() {
    this.btSerial.activateBluetooth('DC:A6:32:69:90:FE').subscribe(_ => {
      this.uiService.presentToast('connected to Raspberry Pi!', 500);
      // listen to incoming data, parse data once the newline character is encountered
      this.btSerial.getDataListener('\n').subscribe(data => {
        this.addMessage(data, false);
        this.ref.detectChanges(); // force the system to detect data changes
      });
    },
      error => {
        this.uiService.presentToast(`activate bluetooth encountered an error: ${error}`, 1000);
      });
  }

  writeString() {
    this.btSerial.writeString(this.sendData).subscribe(_ => {
      this.addMessage(this.sendData, true);
    }, error => {
      this.uiService.presentToast(`sending message encountered an error: ${error}`, 500);
    });
  }
}
