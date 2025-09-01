'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! Bosturn 챗봇입니다. 보드게임에 대해 궁금한 점이 있으시면 언제든 물어보세요! 😊",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickQuestions = [
    "동아리 가입 방법이 궁금해요",
    "어떤 보드게임을 즐기나요?",
    "정기 모임은 언제인가요?",
    "초보자도 참여할 수 있나요?",
    "보드게임을 구매할 수 있나요?"
  ]

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('가입') || lowerMessage.includes('참여') || lowerMessage.includes('신청')) {
      return "동아리 가입은 지원하기 페이지에서 신청서를 작성하시면 됩니다. 또는 집행부에게 직접 연락하셔도 됩니다! 📝"
    }
    
    if (lowerMessage.includes('보드게임') || lowerMessage.includes('게임')) {
      return "우리는 카탄, 마피아, 모노폴리, 체스 등 다양한 보드게임을 즐깁니다. 새로운 게임도 계속 추가되고 있어요! 🎲"
    }
    
    if (lowerMessage.includes('모임') || lowerMessage.includes('시간') || lowerMessage.includes('언제')) {
      return "정기 모임은 매주 토요일 오후 2시부터 6시까지 진행됩니다. 장소는 학생회관 3층 동아리실이에요! ⏰"
    }
    
    if (lowerMessage.includes('초보') || lowerMessage.includes('처음') || lowerMessage.includes('배우')) {
      return "초보자도 환영합니다! 신입 교육 프로그램을 통해 게임 룰을 차근차근 배울 수 있어요. 걱정하지 마세요! 🌟"
    }
    
    if (lowerMessage.includes('구매') || lowerMessage.includes('살 수') || lowerMessage.includes('가격')) {
      return "동아리에서 일부 보드게임을 구매할 수 있습니다. 자세한 사항은 집행부에게 문의해주세요! 💰"
    }
    
    if (lowerMessage.includes('안녕') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "안녕하세요! 보드게임에 대해 궁금한 점이 있으시면 언제든 물어보세요! 😊"
    }
    
    return "죄송합니다. 질문을 이해하지 못했어요. 다른 방식으로 질문해주시거나, 위의 빠른 질문 중에서 선택해주세요! 🤔"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // 챗봇 응답 시뮬레이션
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(inputText),
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    setInputText(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">ChatBosturn</h1>
          <p className="text-xl md:text-2xl opacity-90">
            AI 챗봇과 대화하며 Bosturn에 대해 알아보세요
          </p>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Bosturn 챗봇</h2>
                  <p className="text-indigo-100">실시간으로 답변해드립니다</p>
                </div>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="p-4 bg-gray-50 border-b">
              <p className="text-sm text-gray-600 mb-3">빠른 질문:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1 bg-white text-sm text-gray-700 rounded-full border hover:bg-gray-50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            ChatBosturn의 특징
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">실시간 응답</h3>
              <p className="text-gray-600">질문에 대해 즉시 답변을 받을 수 있습니다</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">정확한 정보</h3>
              <p className="text-gray-600">Bosturn 동아리에 대한 정확한 정보를 제공합니다</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">자연스러운 대화</h3>
              <p className="text-gray-600">친근하고 자연스러운 대화를 나눌 수 있습니다</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
