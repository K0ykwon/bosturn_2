'use client'

import { useState, useEffect } from 'react'
import type { Post } from '@/lib/redis'

export default function Board() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: '전체', color: 'bg-gray-500' },
    { id: 'rules', name: '게임 룰', color: 'bg-blue-500' },
    { id: 'strategy', name: '전략', color: 'bg-green-500' },
    { id: 'reviews', name: '리뷰', color: 'bg-purple-500' },
    { id: 'news', name: '소식', color: 'bg-orange-500' }
  ]

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      if (response.ok) {
        const postsData = await response.json()
        setPosts(postsData)
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error('게시글 로드 오류:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">게시글을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">게시판</h1>
          <p className="text-xl md:text-2xl opacity-90">
            보드게임 관련 정보와 소식을 공유하는 공간입니다
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="mb-12">
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">카테고리별 보기</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-all ${
                    selectedCategory === category.id
                      ? `${category.color} shadow-lg scale-105`
                      : `${category.color} opacity-70 hover:opacity-100 hover:scale-105`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedCategory === 'all' ? '등록된 게시글이 없습니다' : '해당 카테고리의 게시글이 없습니다'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedCategory === 'all' 
                    ? '첫 번째 게시글을 작성해보세요!' 
                    : '다른 카테고리를 선택해보세요.'
                  }
                </p>
              </div>
            ) : (
                             filteredPosts.map((post: Post) => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          categories.find(c => c.id === post.category)?.color || 'bg-gray-500'
                        }`}>
                          {categories.find(c => c.id === post.category)?.name || post.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.content}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span>👤</span>
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>👁️</span>
                        {post.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>💬</span>
                        {post.comments || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
