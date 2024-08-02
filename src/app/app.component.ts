import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product-order-list';
  products: string[] = [
    'Pen',
    'Pencil',
    'Rubber',
    'Notebook',
    'Book',
    'Marker',
    'Highlighter',
    'BlackBoard',
  ];
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  orders: any[] = [];
  showOrdersFlag: boolean = false;
  availableProducts: string[] = [...this.products];

  constructor(private http: HttpClient) {}

  onProductSelect(event: any) {
    const selectedProduct = event.target.value;
    this.orders.push({ product: selectedProduct, quantity: null });
    this.availableProducts = this.availableProducts.filter(
      (p) => p !== selectedProduct
    );
    this.products = this.products.filter((p) => p !== selectedProduct);
    event.target.value = '';
    this.showOrdersFlag = false;
  }
  deleteFromOrderList(product: string) {
    const selectedProduct = product;
    this.availableProducts.push(selectedProduct);
    this.availableProducts.sort((a, b) => a.localeCompare(b));
    this.orders = this.orders.filter(
      (order) => order.product !== selectedProduct
    );
    this.showOrdersFlag = false;
  }
  addQuantity(index: number) {
    if (this.orders[index].quantity !== null) {
      this.orders[index].quantity++;
    }
    this.showOrdersFlag = false;
  }
  showOrders() {
    this.orders = this.orders.filter((order) => {
      if (order.quantity === null) {
        this.availableProducts.push(order.product);
        return false;
      }
      return true;
    });
    this.availableProducts.sort((a, b) => a.localeCompare(b));
    this.showOrdersFlag = true;
  }
  // speakOrders() {
  //   this.showOrders();
  //   if (this.orders.length === 0) {
  //     return; // Or show a message indicating no orders to speak
  //   }

  //   // Initialize SpeechSynthesis
  //   const synth = window.speechSynthesis;

  //   // Loop through each order and create speech
  //   this.orders.forEach((order) => {
  //     const product = order.product;
  //     const quantity =
  //       order.quantity !== null ? order.quantity : 'not specified';

  //     // Create the speech text
  //     const speechText = `${quantity} ${product}`;

  //     // Create a new SpeechSynthesisUtterance instance
  //     const utterance = new SpeechSynthesisUtterance(speechText);

  //     // Optional: Set voice, pitch, rate, etc.
  //     utterance.voice =
  //       synth
  //         .getVoices()
  //         .find((voice) => voice.name === 'Google UK English Male') || null;
  //     utterance.pitch = 1.2;
  //     utterance.rate = 0.9;

  //     // Speak the text
  //     synth.speak(utterance);
  //   });
  // }
  speakOrders() {
    if (this.orders.length === 0) {
      alert('Order list is empty');
      return;
    }

    const synth = window.speechSynthesis;
    this.orders.forEach((order) => {
      const text = `Product: ${order.product}. Quantity: ${order.quantity}.`;
      const utterThis = new SpeechSynthesisUtterance(text);
      synth.speak(utterThis);
    });
  }
}

// 2f97023adddf4865a304d4ac703fe81f
