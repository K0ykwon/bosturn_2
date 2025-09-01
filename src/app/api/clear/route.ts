import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export async function POST(request: NextRequest) {
  try {
    const redis = await getRedisClient()
    
    // Redis가 연결되지 않은 경우 처리
    if (!redis.isOpen) {
      return NextResponse.json({ 
        success: false, 
        error: 'Redis 연결이 되지 않았습니다.' 
      }, { status: 503 })
    }
    
    // 모든 Bosturn 관련 데이터 삭제
    await redis.del('executives')
    await redis.del('posts')
    await redis.del('resources')
    await redis.del('faqs')
    
    return NextResponse.json({ 
      success: true, 
      message: '모든 데이터가 성공적으로 삭제되었습니다.' 
    })
  } catch (error) {
    console.error('Clear data error:', error)
    return NextResponse.json(
      { success: false, error: '데이터 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
