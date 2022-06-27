import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { CreateUserOutput } from './dto/create-user.output';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    const { email, password, role } = createUserInput;

    try {
      const userAlreadyExists = await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });

      if (userAlreadyExists) {
        return {
          error: 'Email already taken',
          ok: false,
        };
      }

      const user = this.usersRepository.create({ email, password, role });
      await this.usersRepository.save(user);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        error: error.message ?? 'Error creating account',
        ok: false,
      };
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    try {
      const userToRemove = await this.usersRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!userToRemove) {
        return {
          error: `Could not find user with the id ${id}`,
          ok: false,
        };
      }
      await this.usersRepository.remove(userToRemove);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        error: error.message ?? 'Error removing user',
        ok: false,
      };
    }
  }
}
