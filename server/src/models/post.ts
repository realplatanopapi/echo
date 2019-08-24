import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Length } from 'class-validator'

@Entity()
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date

  @Column({
    type: 'text',
  })
  @Length(1, 240)
  content: String

  @Column({
    type: 'double precision',
  })
  latitude: number

  @Column({
    type: 'double precision',
  })
  longitude: number

  @ManyToOne(() => Post, post => post.children)
  parent: Post

  @OneToMany(() => Post, post => post.parent)
  children: Post[]
}

export default Post
