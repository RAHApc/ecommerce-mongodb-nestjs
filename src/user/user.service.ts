import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  async findUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user; 
  }
}
