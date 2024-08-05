import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [Post])
  posts: Post[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
