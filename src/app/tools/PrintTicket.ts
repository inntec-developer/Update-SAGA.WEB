                  
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { Component } from '@angular/core';

// import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
// const escpos = require('escpos');  

// const device  = new escpos.USB();
// const printer = new escpos.Printer(device);

// var SerialPort = require('serialport').SerialPort,
//     serialPort = new SerialPort('/dev/ttyUSB0', {
//         baudrate: 19200
//     }),
//     Printer = require('thermalprinter');

@Component({
    selector: 'app-print-ticket',
    templateUrl: './print-ticket.html',
})
export class PrintTicket {
    status: boolean = false;
    usbPrintDriver: UsbDriver;
    // webPrintDriver: WebPrintDriver;
    ip: string = '';

    constructor(private printService : PrintService) {
      

        this.usbPrintDriver = new UsbDriver();
      
    }

    isConnected()
    {
        this.printService.isConnected.subscribe(result => {
            debugger;
            this.status = result;
            if (result) {
                console.log('Connected to printer!!!');
            } else {
            console.log('Not connected to printer.');
            }
        });
    }
    requestUsb() {
        debugger;
        this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
        this.print();
        // this.usbPrintDriver.requestUsb().subscribe(result => {

            
        // });
    }

    // connectToWebPrint() {
    //     this.webPrintDriver = new WebPrintDriver(this.ip);
    //     this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
    // }

    print() {
        this.printService.init()
            .setBold(true)
            .writeLine('Hello World!')
            .setBold(false)
            .feed(4)
            .cut('full')
            .flush();
    }
}