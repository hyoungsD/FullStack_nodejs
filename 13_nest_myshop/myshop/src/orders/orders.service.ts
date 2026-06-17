import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService){}

  async checkout(userId: number){
    // 1. 카트 아이템 목록을 조회
    const cart = await this.prisma.cartItem.findMany({
      where: {userId: userId},
      include: {product: {select: {id: true, name: true, price: true}}}
    })
    if(cart.length === 0) {
      throw new BadRequestException(`장바구니가 비어서 주문할 수 없습니다`)
    }
    // 2. transaction을 감싸서 작업할 준비
    return this.prisma.$transaction(async (tx) => {
      let total = 0;  // 주문 전체 가격을 업데이트
      // cartItem -> orderItem 으로 담을 박스
      const itemData : {
        productId: number;
        quantity: number;
        unitPrice: number;
      }[] = [];
      // cart에 있는 정보를 하나씩 돌면서 계산
      for(const item of cart){
        // 1. 재고를 차감한다. from Product
        const updated = await tx.product.updateMany({
          where: {id: item.productId, stock: {gte: item.quantity}},
          data: {stock: {decrement: item.quantity}}
        })  // UPDATE product SET stock = item.quantity WHERE id = item.productId AND stock = item.quantity

        // 2. updated = 0 -> 재고가 남지 않아서 못팔아
        if(updated.count === 0){
          throw new ConflictException(`재고가 부족합니다. ${item.product.id}`)
        }

        // order 총 주문 금액
        total += item.product.price * item.quantity;

        // orderItem에 담을 준비
        itemData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price
        })
      } // end of for

      // 3. create order
      const order = await tx.order.create({
        data: {
          buyerId: userId,
          totalPrice: total,
          items: {create: itemData} // create OrderItems를 자동으로 해준다. order가 생성될 때
        },
        include: {items: true}  // 주문을 생성한 다음에 주문 상세항목까지 같이 보여줘
      })

      // 4. 장바구니를 비운다
      await tx.cartItem.deleteMany({
        where: {userId}
      })
    });
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
