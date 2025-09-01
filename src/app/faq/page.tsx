'use client'

import { useState, useEffect } from 'react'
import type { FAQ } from '@/lib/redis'

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    loadFaqs()
  }, [])

  const loadFaqs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/faq')
      if (response.ok) {
        const faqsData = await response.json()
        setFaqs(faqsData)
      } else {
        setFaqs([])
      }
    } catch (error) {
      console.error('FAQ 로드 오류:', error)
      setFaqs([])
    } finally {
      setLoading(false)
    }
  }

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">FAQ를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">자주 묻는 질문</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Bosturn 동아리에 대해 궁금한 점을 확인하세요
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
                      {faqs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">❓</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">등록된 FAQ가 없습니다</h3>
                <p className="text-gray-600 dark:text-gray-400">첫 번째 FAQ를 추가해보세요!</p>
              </div>
            ) : (
              <div className="space-y-4">
                                 {faqs.map((faq: FAQ) => (
                  <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                        <span className={`text-2xl transition-transform ${openFaq === faq.id ? 'rotate-45' : ''}`}>
                          {openFaq === faq.id ? '−' : '+'}
                        </span>
                      </div>
                    </button>
                    
                    {openFaq === faq.id && (
                      <div className="px-6 pb-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-4">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">더 궁금한 점이 있으신가요?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            FAQ에서 찾지 못한 답변이 있다면 언제든 연락해주세요
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">이메일 문의</h3>
              <p className="text-gray-600 dark:text-gray-300">bosturn@example.com</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">카카오톡 문의</h3>
              <p className="text-gray-600 dark:text-gray-300">@bosturn_official</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
