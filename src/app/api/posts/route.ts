import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient, Post } from '@/lib/redis'

const POSTS_KEY = 'bosturn:posts'

export async function GET() {
  try {
    const redis = await getRedisClient()
    const posts = await redis.get(POSTS_KEY)
    
    if (posts) {
      return NextResponse.json(JSON.parse(posts))
    } else {
      // Redis에 데이터가 없으면 빈 배열 반환
      return NextResponse.json([])
    }
  } catch (error) {
    console.error('Redis error:', error)
    // Redis 연결 실패 시에도 빈 배열 반환
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, post } = body
    const redis = await getRedisClient()
    
    let currentPosts: Post[] = []
    const existing = await redis.get(POSTS_KEY)
    if (existing) {
      currentPosts = JSON.parse(existing)
    }
    
    switch (action) {
      case 'add':
        const newId = Math.max(...currentPosts.map(p => p.id), 0) + 1
        const newPost: Post = { ...post, id: newId }
        currentPosts.push(newPost)
        break
      case 'update':
        const updateIndex = currentPosts.findIndex(p => p.id === post.id)
        if (updateIndex !== -1) {
          currentPosts[updateIndex] = post
        }
        break
      case 'delete':
        currentPosts = currentPosts.filter(p => p.id !== post.id)
        break
    }
    
    await redis.set(POSTS_KEY, JSON.stringify(currentPosts))
    return NextResponse.json({ success: true, posts: currentPosts })
  } catch (error) {
    console.error('Redis error:', error)
    return NextResponse.json({ error: 'Failed to update posts' }, { status: 500 })
  }
}
