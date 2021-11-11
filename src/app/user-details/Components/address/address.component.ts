import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ShippingAddress } from '../../model/address.model';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  isUpdated = false;
  shippingAddress!: ShippingAddress;
  duplicateShippingAddressData!: ShippingAddress;
  @Input()
  ShId?: number;

  @Input() address: any;

  @Input() UId?: any;

  constructor(
    private addressService: AddressService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.ShId);
    if (this.ShId) this.populateAddress(this.ShId);
  }
  populateAddress(SHid: number) {
    this.authService.isAdmin().subscribe((res) => {
      if (res) {
        console.log('admin');
        console.log('admin');
        this.addressService
          .getShippingAddressByUserId(this.UId)
          .subscribe((res: any) => {
            this.shippingAddress = res;
            console.log(this.shippingAddress);
          });
      } else {
        console.log('not admin');
        this.addressService
          .getAllShippingAddressesByUser()
          .subscribe((res: any) => {
            this.shippingAddress = res;
            console.log(this.shippingAddress);
          });
      }
    });

    this.addressService.getShippingAddressById(SHid).subscribe((res: any) => {
      this.shippingAddress = res;
      console.log(this.shippingAddress);
    });
  }
  handleEditModalOpen() {
    this.duplicateShippingAddressData = this.address;
  }

  async handleAddressUpdate() {
    console.log('Address Upldate', this.duplicateShippingAddressData);
    let status = await this.addressService.updateShippingAddress(
      this.duplicateShippingAddressData
    );
    console.log(status);
    if (status && status.SHid) {
      this.isUpdated = true;
    }
  }
}
