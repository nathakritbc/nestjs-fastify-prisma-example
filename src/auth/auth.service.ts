import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    user_username: string,
    user_password: string,
  ): Promise<any> {
    const user = await this.usersService.findByUsername(user_username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const payload = { user_username: user.user_username, sub: user.user_id };
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(data: any) {
    try {
      const { user_password }: any = data;
      // console.log('createUserDto', createUserDto);
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(user_password, saltOrRounds);
      const payload = {
        ...data,
        user_password: hash,
      };

      const createdUser = this.prisma.users.create({
        data: { ...payload },
      });
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn(user: any) {
    const payload = { user_username: user.user_username, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
