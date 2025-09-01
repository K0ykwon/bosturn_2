'use client'

import { useState, useEffect } from 'react'

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: '전체', color: 'bg-gray-500' },
    { id: 'finance', name: '회계', color: 'bg-green-500' },
    { id: 'constitution', name: '회칙', color: 'bg-blue-500' },
    { id: 'minutes', name: '회의록', color: 'bg-purple-500' },
    { id: 'promotion', name: '홍보 자료', color: 'bg-orange-500' }
  ]

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/resources')
      if (response.ok) {
        const resourcesData = await response.json()
        setResources(resourcesData)
      } else {
        setResources([])
      }
    } catch (error) {
      console.error('자료 로드 오류:', error)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">자료를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">자료실</h1>
          <p className="text-xl md:text-2xl opacity-90">
            동아리 운영에 필요한 모든 자료를 확인할 수 있습니다
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">카테고리별 보기</h2>
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

          {/* Resources Grid */}
          <div className="grid gap-6">
            {filteredResources.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedCategory === 'all' ? '등록된 자료가 없습니다' : '해당 카테고리의 자료가 없습니다'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedCategory === 'all' 
                    ? '첫 번째 자료를 업로드해보세요!' 
                    : '다른 카테고리를 선택해보세요.'
                  }
                </p>
              </div>
            ) : (
              filteredResources.map((resource: any) => (
                <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          categories.find(c => c.id === resource.category)?.color || 'bg-gray-500'
                        }`}>
                          {categories.find(c => c.id === resource.category)?.name || resource.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{resource.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <span>👤</span>
                          {resource.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📥</span>
                          {resource.downloads || 0}회 다운로드
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <span>📄</span>
                          {resource.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📏</span>
                          {resource.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      다운로드
                    </button>
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
