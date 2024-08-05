import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    try {
      this.logger.log('Creating a new user');

      // Check for existing user with the same username or email

      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { username: createUserInput.username },
            { email: createUserInput.email },
          ],
        },
      });

      if (existingUser) {
        if (existingUser.username === createUserInput.username) {
          throw new ConflictException(
            `User with username ${createUserInput.username} already exists`,
          );
        } else {
          throw new ConflictException(
            `User with email ${createUserInput.email} already exists`,
          );
        }
      }

      // Create new user if no conflict

      return await this.prisma.user.create({
        data: createUserInput,
      });
    } catch (error) {
      this.logger.error('Error creating a user', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  // Method to fetch all users
  async findAll(page: number, perPage: number) {
    try {
      const skip = (page - 1) * perPage;
      const take = perPage;
      this.logger.log('Fetching all users');
      return await this.prisma.user.findMany({
        skip,
        take,
      });
    } catch (error) {
      this.logger.error('Error fetching users', error);
      throw new BadRequestException('Failed to fetch users');
    }
  }

  // Method to fetch a single user by its ID
  async findOne(id: string) {
    try {
      this.logger.log(`Fetching user with ID ${id}`);
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(`Error fetching user with ID ${id}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch the user');
    }
  }

  // Method to update an existing user

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      this.logger.log(`Updating user with ID ${id}`);
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return await this.prisma.user.update({
        where: { id },
        data: updateUserInput,
      });
    } catch (error) {
      this.logger.error(`Error updating user with ID ${id}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update the user');
    }
  }

  // Method to delete a user
  async remove(id: string) {
    try {
      this.logger.log(`Deleting user with ID ${id}`);
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting user with ID ${id}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete the user');
    }
  }
}
