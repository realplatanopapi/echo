import { getBoundsOfDistance } from 'geolib'
import { getRepository } from 'typeorm'

import Post from '../entities/post'

// Max distance of posts to get, in meters
const postDistance = 1500

export async function createPost(input: PostInput): Promise<Post> {
  const repo = getRepository(Post)
  const post = repo.create(input)
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
    .where('post.latitude >= :minLatitude', {
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
    .getMany()
}

export interface PostInput {
  latitude: number
  longitude: number
  content: string
}

export interface PostQuery {
  latitude: number
  longitude: number
}
