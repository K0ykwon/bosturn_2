import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient, Executive } from '@/lib/redis'

const EXECUTIVES_KEY = 'bosturn:executives'

export async function GET() {
  try {
    const redis = await getRedisClient()
    const executives = await redis.get(EXECUTIVES_KEY)
    
    if (executives) {
      return NextResponse.json(JSON.parse(executives))
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
    const { action, executive } = body
    const redis = await getRedisClient()
    
    let currentExecutives: Executive[] = []
    const existing = await redis.get(EXECUTIVES_KEY)
    if (existing) {
      currentExecutives = JSON.parse(existing)
    }
    
    switch (action) {
      case 'add':
        const newId = Math.max(...currentExecutives.map(e => e.id), 0) + 1
        const newExecutive: Executive = { ...executive, id: newId }
        currentExecutives.push(newExecutive)
        break
      case 'update':
        const updateIndex = currentExecutives.findIndex(e => e.id === executive.id)
        if (updateIndex !== -1) {
          currentExecutives[updateIndex] = executive
        }
        break
      case 'delete':
        currentExecutives = currentExecutives.filter(e => e.id !== executive.id)
        break
    }
    
    await redis.set(EXECUTIVES_KEY, JSON.stringify(currentExecutives))
    return NextResponse.json({ success: true, executives: currentExecutives })
  } catch (error) {
    console.error('Redis error:', error)
    return NextResponse.json({ error: 'Failed to update executives' }, { status: 500 })
  }
}
