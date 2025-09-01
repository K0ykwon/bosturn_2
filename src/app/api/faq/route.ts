import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient, FAQ } from '@/lib/redis'

const FAQ_KEY = 'bosturn:faq'

export async function GET() {
  try {
    const redis = await getRedisClient()
    const faqs = await redis.get(FAQ_KEY)
    
    if (faqs) {
      return NextResponse.json(JSON.parse(faqs))
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
    const { action, faq } = body
    const redis = await getRedisClient()
    
    let currentFaqs: FAQ[] = []
    const existing = await redis.get(FAQ_KEY)
    if (existing) {
      currentFaqs = JSON.parse(existing)
    }
    
    switch (action) {
      case 'add':
        const newId = Math.max(...currentFaqs.map(f => f.id), 0) + 1
        const newFaq: FAQ = { ...faq, id: newId }
        currentFaqs.push(newFaq)
        break
      case 'update':
        const updateIndex = currentFaqs.findIndex(f => f.id === faq.id)
        if (updateIndex !== -1) {
          currentFaqs[updateIndex] = faq
        }
        break
      case 'delete':
        currentFaqs = currentFaqs.filter(f => f.id !== faq.id)
        break
    }
    
    await redis.set(FAQ_KEY, JSON.stringify(currentFaqs))
    return NextResponse.json({ success: true, faqs: currentFaqs })
  } catch (error) {
    console.error('Redis error:', error)
    return NextResponse.json({ error: 'Failed to update FAQs' }, { status: 500 })
  }
}
