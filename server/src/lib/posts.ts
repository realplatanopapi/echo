import { getBoundsOfDistance } from 'geolib'
import { getRepository } from 'typeorm'

import Post from '../models/post'

// Max distance of posts to get, in meters
const postDistance = 1500

export async function createPost(input: PostInput): Promise<Post> {
  const repo = getRepository(Post)

  const { parentId, ...postOptions } = input
  const post = repo.create(postOptions)

  if (parentId) {
    const parentPost = await repo.findOne(parentId)
    if (!parentPost) {
      throw new Error(`Could not parent post with id ${parentId}`)
    }
    post.parent = parentPost
  }

  return await repo.save(post)
}

export async function getNearbyPosts(query: PostQuery): Promise<Post[]> {
  const [min, max] = getBoundsOfDistance(
    {
      latitude: query.latitude,
      longitude: query.longitude,
    },
    postDistance,
  )

  const repo = getRepository(Post)
  return await repo
    .createQueryBuilder('post')
    .where("post.createdAt >= now() - interval '24 hours'")
    .andWhere('post.latitude >= :minLatitude', {
      minLatitude: min.latitude,
    })
    .andWhere('post.longitude >= :minLongitude', {
      minLongitude: min.longitude,
    })
    .andWhere('post.latitude <= :maxLatitude', {
      maxLatitude: max.latitude,
    })
    .andWhere('post.longitude <= :maxLongitude', {
      maxLongitude: max.longitude,
    })
    .orderBy('post.createdAt', 'DESC')
    .getMany()
}

export interface PostInput {
  latitude: number
  longitude: number
  content: string
  parentId?: string
}

export interface PostQuery {
  latitude: number
  longitude: number
}
