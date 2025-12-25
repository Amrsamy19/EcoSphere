import { inject, injectable } from "tsyringe";
import { type IOrderService } from "./order.service";
import { CreateOrderDTO, OrderStatus } from "./order.types";
import Stripe from "stripe";

@injectable()
export class OrderController {
  constructor(
    @inject("OrderService") private readonly orderService: IOrderService
  ) {}

  async createOrder(order: CreateOrderDTO) {
    if (!order) return;
    const savedOrder = await this.orderService.createOrder(order.userId, order);
    if (!savedOrder) return;
    return savedOrder;
  }

  async handleStripeEvent(event: Stripe.Event) {
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("✅ Payment succeeded:", paymentIntent.id);

      // Extract metadata
      const userId = paymentIntent.metadata.userId;
      const restaurantId = paymentIntent.metadata.restaurantId;
      const items = JSON.parse(paymentIntent.metadata.items || "[]");

      if (!userId || !items || items.length === 0) {
        console.error("❌ Missing metadata in payment intent");
        return;
      }

      try {
        // Create order
        await this.orderService.createOrder(userId, {
          items,
          userId,
          paymentMethod: "stripe",
        });

        // Decrease stock for each item
        await this.orderService.decreaseStockForOrder(items, restaurantId);

        console.log("✅ Order created and stock decreased successfully");
      } catch (error) {
        console.error("❌ Error processing payment success:", error);
      }
    }
  }

  async getUserOrders(userId: string) {
    if (!userId) return;
    const orders = await this.orderService.getUserOrders(userId);
    return orders;
  }

  async getOrderById(orderId: string) {
    if (!orderId) return;
    const order = await this.orderService.getOrderById(orderId);
    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    if (!orderId || !status) return;
    const updatedOrder = await this.orderService.updateOrderStatus(
      orderId,
      status
    );
    return updatedOrder;
  }

  async deleteOrder(orderId: string) {
    if (!orderId) return;
    const deletedOrder = await this.orderService.deleteOrder(orderId);
    return deletedOrder;
  }

  async getRestaurantRevenue(restaurantId: string) {
    return await this.orderService.getRestaurantRevenue(restaurantId);
  }

  async getBestSellingProducts() {
    return await this.orderService.getBestSellingProducts();
  }

  async getTopCustomers() {
    return await this.orderService.getTopCustomers();
  }

  async getDailySales() {
    return await this.orderService.getDailySales();
  }

  async getActiveRestaurantOrders(restaurantId: string) {
    return await this.orderService.getActiveRestaurantOrders(restaurantId);
  }
  async getRevenueByDateRange(startDate: string, endDate: string) {
    return await this.orderService.getRevenueByDateRange(startDate, endDate);
  }
}
