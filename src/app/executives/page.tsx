'use client'

import { useState, useEffect } from 'react'

interface Executive {
  id: number;
  name: string;
  school: string;
  major: string;
  position: string;
  instagram: string;
}

export default function Executives() {
  const [executives, setExecutives] = useState<Executive[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const response = await fetch('/api/executives')
        if (response.ok) {
          const data = await response.json()
          setExecutives(data)
        }
      } catch (error) {
        console.error('집행부 데이터 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExecutives()
  }, [])

  const getPositionColor = (position: string) => {
    switch (position) {
      case '회장':
        return 'bg-blue-500'
      case '부회장':
        return 'bg-green-500'
      case '총무부장':
        return 'bg-yellow-500'
      case '기획부장':
        return 'bg-purple-500'
      case '인사부장':
        return 'bg-red-500'
      case '홍보부장':
        return 'bg-cyan-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">집행부 소개</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Bosturn을 이끌어가는 집행부를 소개합니다
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 조직도 */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">조직도</h2>
            
            {/* 회장단 - 맨 위에 가로 배치 */}
            <div className="text-center mb-16">
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">회장단</h3>
              <div className="flex flex-col md:flex-row gap-8 justify-center">
                {executives
                  .filter(e => e.position === '회장' || e.position === '부회장')
                  .map((executive) => (
                    <div key={executive.id} className="bg-white rounded-lg shadow-lg p-6 w-48">
                      <div className={`w-20 h-20 ${getPositionColor(executive.position)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-2xl text-white font-bold">{executive.name.charAt(0)}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{executive.position}</h4>
                      <p className="text-gray-600 mb-1">{executive.name}</p>
                      <p className="text-sm text-gray-500">{executive.school}</p>
                      <p className="text-sm text-gray-500">{executive.major}</p>
                      <a href={`https://instagram.com/${executive.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                        {executive.instagram}
                      </a>
                    </div>
                  ))}
              </div>
            </div>

            {/* 각 부서 - 아래에 세로로 배치 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['총무부장', '기획부장', '인사부장', '홍보부장'].map((position) => (
                <div key={position} className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{position.replace('장', '')}</h3>
                  {executives
                    .filter(e => e.position === position)
                    .map((executive) => (
                      <div key={executive.id} className="bg-white rounded-lg shadow-lg p-6">
                        <div className={`w-20 h-20 ${getPositionColor(executive.position)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <span className="text-2xl text-white font-bold">{executive.name.charAt(0)}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{executive.position}</h4>
                        <p className="text-gray-600 mb-1">{executive.name}</p>
                        <p className="text-sm text-gray-500">{executive.school}</p>
                        <p className="text-sm text-gray-500">{executive.major}</p>
                        <a href={`https://instagram.com/${executive.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                          {executive.instagram}
                        </a>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* 상세 소개 */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">집행부 상세 소개</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executives.map((executive) => (
                <div key={executive.id} className="bg-white rounded-lg shadow-lg p-6 h-80 flex flex-col justify-center">
                  <div className={`w-16 h-16 ${getPositionColor(executive.position)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-xl text-white font-bold">{executive.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{executive.name}</h3>
                  <p className="text-lg text-blue-600 text-center mb-2">{executive.position}</p>
                  <p className="text-gray-600 text-center mb-1">{executive.school}</p>
                  <p className="text-gray-600 text-center mb-4">{executive.major}</p>
                  <div className="text-center">
                    <a href={`https://instagram.com/${executive.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      {executive.instagram}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
