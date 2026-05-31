import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaErrorCode } from '../common/prisma-error-codes';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: createUserDto });
    } catch (e) {
      this.handlePrismaError(e);
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (e) {
      this.handlePrismaError(e, id);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      this.handlePrismaError(e, id);
    }
  }

  private handlePrismaError(e: unknown, id?: number): never {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === PrismaErrorCode.UniqueConstraintViolation) {
        const target = e.meta?.target;
        const fields = Array.isArray(target) ? target.join(', ') : 'email';
        throw new ConflictException(`User with this ${fields} already exists`);
      }
      if (e.code === PrismaErrorCode.RecordNotFound) {
        throw new NotFoundException(`User #${id} not found`);
      }
    }
    throw e;
  }
}
