import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient, Resource } from '@/lib/redis'

const RESOURCES_KEY = 'bosturn:resources'

export async function GET() {
  try {
    const redis = await getRedisClient()
    const resources = await redis.get(RESOURCES_KEY)
    
    if (resources) {
      return NextResponse.json(JSON.parse(resources))
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
    const { action, resource } = body
    const redis = await getRedisClient()
    
    let currentResources: Resource[] = []
    const existing = await redis.get(RESOURCES_KEY)
    if (existing) {
      currentResources = JSON.parse(existing)
    }
    
    switch (action) {
      case 'add':
        const newId = Math.max(...currentResources.map(r => r.id), 0) + 1
        const newResource: Resource = { ...resource, id: newId }
        currentResources.push(newResource)
        break
      case 'update':
        const updateIndex = currentResources.findIndex(r => r.id === resource.id)
        if (updateIndex !== -1) {
          currentResources[updateIndex] = resource
        }
        break
      case 'delete':
        currentResources = currentResources.filter(r => r.id !== resource.id)
        break
    }
    
    await redis.set(RESOURCES_KEY, JSON.stringify(currentResources))
    return NextResponse.json({ success: true, resources: currentResources })
  } catch (error) {
    console.error('Redis error:', error)
    return NextResponse.json({ error: 'Failed to update resources' }, { status: 500 })
  }
}
