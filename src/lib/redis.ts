import { createClient } from 'redis';

declare global {
  var __redis: ReturnType<typeof createClient> | undefined;
}

// 전역 Redis 클라이언트 인스턴스
const client = globalThis.__redis ?? createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

if (process.env.NODE_ENV !== 'production') globalThis.__redis = client;

// Redis 연결을 보장하는 함수
async function ensureRedisConnection() {
  if (!client.isOpen) {
    try {
      await client.connect();
      console.log('Redis connected successfully');
    } catch (error) {
      console.error('Redis connection failed:', error);
      throw error;
    }
  }
}

// 연결 보장 후 클라이언트 반환 (재사용)
export async function getRedisClient() {
  await ensureRedisConnection();
  return client;
}

export default client;

// Bosturn 동아리 사이트 데이터 모델 타입 정의
export interface Executive {
  id: number;
  name: string;
  school: string;
  major: string;
  position: string;
  instagram: string;
}

export interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  author: string;
  date: string;
  views: number;
  comments: number;
}

export interface Resource {
  id: number;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  downloads: number;
  type: string;
  size: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}


