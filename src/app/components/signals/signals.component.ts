import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from "@angular/core";
import { Product } from '../../models/product';
import { Cart } from '../../models/cart';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mt-4">
  <div class="card">
    <div class="card-header bg-primary text-white">Signals</div>
    <div class="card-body">
      <h1 class="card-title">Shop your favourite animal</h1>
      <h4>Get it at a discount</h4>
      <div class="mt-4">
        <h2><strong>Shopping Cart </strong></h2>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of cart(); let index = index">
              <td>{{ index + 1 }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price | currency : ' KES ' }}</td>
              <td>{{ product.qty }}</td>
              <td>
                <button (click)="deleteCartItem(index)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4">
          <h2>User Data</h2>
          <p *ngIf="user()">
            Name: {{ user()?.name }} <br>
            Email: {{ user()?.email }}
          </p>
          <button (click)="changeUserId(userId() + 1)" class="btn btn-primary">Next User</button>
        </div>
        <h2 class="text-dark mt-4">
          TOTAL QTY:
          <strong [style.color]="color()">{{ totalQuantity() }}</strong>
        </h2>
        <h2 class="text-dark">
          TOTAL PRICE:
          <strong [style.color]="color()">{{ totalPrice() | currency : ' KES ' }}</strong>
        </h2>
        <hr />
        <div class="mt-4">
          <h2>Kenyan Animals For Sale</h2>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>DESCRIPTION</th>
                <th>SELECT QUANTITY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of products(); let index = index">
                <td>{{ index + 1 }}</td>
                <td>{{ product.title }}</td>
                <td>{{ product.price | currency : ' KES ' }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.description }}</td>
                <td>
                  <select (change)="quantitySelected($any($event.target).value)" class="form-control">
                    <option disabled value="">Select a quantity</option>
                    <option *ngFor="let quantity of quantityList()">
                      {{ quantity }}
                    </option>
                  </select>
                </td>
                <td>
                  <button class="btn btn-success" (click)="addToCart(product, index)" [ngClass]="product.quantity ==  0 || product.quantity < 1 ? 'disabled': ''" [disabled] = "product.quantity ==  0 || product.quantity < 1">
                    Buy
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent {
  quantityList = signal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  quantity = signal<number>(0);
  totalQuantity = computed(() => this.cart().reduce((sum, item) => sum + item.qty, 0));
  totalPrice =  computed(() => this.cart().reduce((sum, item) => sum + item.qty * item.price, 0));
  products = signal<Product[]>([
    {
      id: 1,
      title: 'Elephant',
      quantity: 10,
      price: 1000000,
      description:
        'Elephants are the largest living land animals. ',
    },
    {
      id: 2,
      title: 'Giraffe',
      quantity: 15,
      price: 600000,
      description:
        'The giraffe is a large African hoofed mammal',
    },
  ]);
  cart = signal<Cart[]>([]);
  color = computed(() => (this.totalPrice() > 600000 ? 'green' : 'red'));

  userId = signal<number>(1); // Initial user ID
  user = signal<User | null>(null);



  constructor(private http: HttpClient) {
    // Used in Logging data being displayed and when it changes
    effect(() => {
      this.fetchUserData(this.userId());
    });


  }

  quantitySelected(qty: number) {
    this.quantity.set(Number(qty));
  }

  addToCart(product: Product, index: number): void {
    if (this.quantity() === 0) this.quantity.set(1);

    this.products.update(products => {
      products[index].quantity -= this.quantity();
      return products;
    });

    const newItem: Cart = {
      id: product.id,
      name: product.title,
      qty: this.quantity(),
      price: product.price,
    }
    this.cart.update(cartItem => [...cartItem, newItem]);
    this.quantity.set(0);
  }

  deleteCartItem(index: number) {
    const cartItem = this.cart()[index];
    this.products.update(products => {
      const product = products.find(p => p.id === cartItem.id);
      if (product) product.quantity += cartItem.qty;
      return products;
    });

    this.cart.update(cart => cart.filter((_, i) => i !== index));
  }

  fetchUserData(id: number) {
    this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe(data => this.user.set(data));
  }

  changeUserId(newId: number) {
    this.userId.set(newId);
  }
}
