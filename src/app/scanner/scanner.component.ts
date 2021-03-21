import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit, Output } from '@angular/core';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { BehaviorSubject } from 'rxjs';
import { UiService } from '../utils/ui.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  @Output('qr-data') qrData: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private barcodeScanner: BarcodeScanner, private uiService: UiService) { }

  ngOnInit() {
  }

  scanQrCode(): void {
    this.barcodeScanner.scan({
      prompt: "Aim the box at the QR Code to scan...."
    }).then((barcodeData: BarcodeScanResult) => {
      if (barcodeData.cancelled) {
        this.uiService.presentToast('scan cancelled...', 500);
      }
      else {
        this.onQRCodeRead(barcodeData.text);
      }
    }).catch(error => {
      this.uiService.presentToast('this scanner encountered an error. restart your app...', 1000);
    });
  }

  onQRCodeRead(barcodeData: string) {
    this.qrData.next(barcodeData);
  }

}
