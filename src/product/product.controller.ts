import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { ProductService } from './product.service';

@Controller('store/products')
export class ProductController {
  constructor(private readonly productServic: ProductService) {}

  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filterProduct = await this.productServic.getFilteredProduct(
        filterProductDTO,
      );
      return filterProduct;
    } else {
      const products = await this.productServic.getAllProduct();
      return products;
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productServic.getProduct(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }

    return product;
  }

  @Post('/')
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productServic.addProduct(createProductDTO);
    return product;
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productServic.updateProduct(
      id,
      createProductDTO,
    );
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }
    return product;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productServic.deleteProduct(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }
    return product;
  }
}
