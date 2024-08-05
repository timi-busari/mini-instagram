import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [PostResolver, PostService, PrismaService],
  imports: [UserModule],
})
export class PostModule {}
