import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  caption: string;

  @Field()
  imageUrl: string;

  @Field()
  userId: string;
}
