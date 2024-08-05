import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  // Initialize a logger instance for the PostService class
  private readonly logger = new Logger(PostService.name);

  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  // Method to create a new post
  async create(createPostInput: CreatePostInput) {
    try {
      this.logger.log('Creating a new post');
      return await this.prisma.post.create({
        data: createPostInput,
      });
    } catch (error) {
      this.logger.error('Error creating a post', error);
      throw new BadRequestException('Failed to create post');
    }
  }

  // Method to fetch all posts
  async feeds(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    try {
      this.logger.log('Fetching random posts for the home feed ');

      // Execute raw SQL query to fetch a random set of posts with pagination

      const posts = await this.prisma.$queryRaw<Post[]>`
      SELECT * FROM "Post"
      ORDER BY RANDOM()
      LIMIT ${take}
      OFFSET ${skip};
    `;

      return posts;
    } catch (error) {
      this.logger.error('Error fetching posts', error);
      throw new BadRequestException('Failed to fetch posts');
    }
  }

  // Method to fetch all posts by a specific user
  async findAll(userId: string, page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    try {
      this.logger.log(`Fetching all posts for user with ID ${userId}`);

      // Check if the user exists before fetching their posts
      await this.userService.findOne(userId);

      return await this.prisma.post.findMany({
        where: { userId },
        skip,
        take,
      });
    } catch (error) {
      this.logger.error(
        `Error fetching posts for user with ID ${userId}`,
        error,
      );
      throw new BadRequestException('Failed to fetch posts for the user');
    }
  }

  // Method to fetch a single post by its ID
  async findOne(id: string) {
    try {
      this.logger.log(`Fetching post with ID ${id}`);
      const post = await this.prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    } catch (error) {
      this.logger.error(`Error fetching post with ID ${id}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch the post');
    }
  }

  // Method to update an existing post
  async update(id: string, updatePostInput: UpdatePostInput) {
    try {
      this.logger.log(`Updating post with ID ${id}`);
      const post = await this.prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return await this.prisma.post.update({
        where: { id },
        data: updatePostInput,
      });
    } catch (error) {
      this.logger.error(`Error updating post with ID ${id}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update the post');
    }
  }

  // Method to delete a post
  async remove(id: string) {
    try {
      this.logger.log(`Deleting post with ID ${id}`);
      const post = await this.prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return await this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting post with ID ${id}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete the post');
    }
  }
}
