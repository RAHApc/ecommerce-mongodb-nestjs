import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CartService } from './cart.service';
import { ItemDto } from './dtos/item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('/')
  async addItemToCart(@Request() req, @Body() itemDto: ItemDto) {
    const userId = req.user.userId;
    const cart = await this.cartService.addItemToCart(userId, itemDto);
    return cart;
  }

  @UseGuards(JWTAuthGuard,RolesGuard)
  @Roles(Role.User)
  @Delete('/')
  async removeItemFromCart(@Request() req,@Body() {productId}){
    const userId=req.user.userId
    const cart=await this.cartService.removeItemFormCart(userId,productId)
    if(!cart) throw new NotFoundException('Item does not exist')
    return cart
  }

  @UseGuards(JWTAuthGuard,RolesGuard)
  @Roles(Role.User)
  @Delete('/:id')
  async deleteCart(@Param('id') userId:string){
    const cart=await this.cartService.deleteCart(userId)
    if(!cart) throw new NotFoundException('Item does not exist')
    return cart
  }
}
