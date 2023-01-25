import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  desription: string;

  @Prop()
  price: number;

  @Prop()
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
