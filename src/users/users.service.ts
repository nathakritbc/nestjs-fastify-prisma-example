import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly users = [
    {
      user_id: 1,
      user_username: 'john',
      user_password: 'changeme',
    },
    {
      user_id: 2,
      user_username: 'maria',
      user_password: 'guess',
    },
  ];

  async findOne(user_username: string): Promise<User | undefined> {
    return this.users.find((user) => user.user_username === user_username);
  }

  async findByUsername(user_username: string): Promise<User | undefined> {
    return this.prisma.users.findUnique({
      where: { user_username: user_username },
    });
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
