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
    // if (this.ShId) this.populateAddress(this.ShId);
  }

  handleEditModalOpen() {
    this.duplicateShippingAddressData = { ...this.address };
  }

  handleAddressUpdate() {
    console.log('Address Update', this.duplicateShippingAddressData);
    this.addressService
      .updateShippingAddress(
        this.duplicateShippingAddressData,
        this.duplicateShippingAddressData.UId
      )
      .subscribe((res: any) => {
        console.log('Address Update', res);
        if (res) {
          this.isUpdated = true;
        }
      });
  }
}
