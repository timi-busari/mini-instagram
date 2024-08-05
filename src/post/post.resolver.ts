import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'feeds' })
  feeds(
    @Args('page', { type: () => Int, nullable: true }) page = 1,
    @Args('perPage', { type: () => Int, nullable: true }) perPage = 10,
  ) {
    return this.postService.feeds(page, perPage);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Args('userId', { type: () => String }) userId: string,
    @Args('page', { type: () => Int, nullable: true }) page = 1,
    @Args('perPage', { type: () => Int, nullable: true }) perPage = 10,
  ) {
    return this.postService.findAll(userId, page, perPage);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => String }) id: string) {
    return this.postService.remove(id);
  }
}
