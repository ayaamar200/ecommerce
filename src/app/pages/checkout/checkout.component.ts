import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavtabsComponent } from '../../shared/components/ui/navtabs/navtabs.component';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [NavtabsComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);

  cartId: string = '';

  checkOutForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  initForm(): void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: [null, [Validators.required]],
    });

    // this.checkoutForm = new FormGroup({
    //   details: new FormControl(null, [Validators.required]),
    //   phone: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern(/^01[0125][0-9]{8}$/),
    //   ]),
    //   city: new FormControl(null, [Validators.required]),
    // });
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('cartId')!;
      },
    });
  }

  onlinePayment(): void {
    this.ordersService
      .checkOutPayment(this.checkOutForm.value, this.cartId)
      .subscribe({
        next: (res) => {
          console.log(res);

          if (res.status === 'success') {
            open(res.session.url, '_self');
          }
        },
      });
  }
}
