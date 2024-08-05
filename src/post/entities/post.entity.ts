import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID, { description: 'Unique identifier for the post' })
  id: string;

  @Field({ description: 'Caption of the post' })
  caption: string;

  @Field({ description: 'URL of the post image' })
  imageUrl: string;

  @Field({ description: 'Creation date of the post' })
  createdAt: Date;

  @Field({ description: 'Last update date of the post' })
  updatedAt: Date;

  @Field({ description: 'ID of the user who created the post' })
  userId: string;
}
