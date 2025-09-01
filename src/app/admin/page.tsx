'use client'

import { useState, useEffect } from 'react'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [activeSection, setActiveSection] = useState('')
  const [showAddExecutiveForm, setShowAddExecutiveForm] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState<any>(null)
  const [showAddFaqForm, setShowAddFaqForm] = useState(false)
  const [editingFaq, setEditingFaq] = useState<any>(null)
  const [showAddPostForm, setShowAddPostForm] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [showAddResourceForm, setShowAddResourceForm] = useState(false)
  const [editingResource, setEditingResource] = useState<any>(null)
  
  // 빈 배열로 초기화 (기본 템플릿 제거)
  const [executives, setExecutives] = useState([])
  const [posts, setPosts] = useState([])
  const [resources, setResources] = useState([])
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    setAdminPassword(process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123')
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('비밀번호가 올바르지 않습니다.')
    }
  }

  // 집행부 관리 함수들
  const handleEditExecutive = (executive: any) => {
    setEditingExecutive(executive)
  }

  const handleDeleteExecutive = async (id: number) => {
    if (confirm('정말로 이 집행부를 삭제하시겠습니까?')) {
      try {
        const response = await fetch('/api/executives', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'delete',
            executive: { id }
          })
        })
        
        if (response.ok) {
          const result = await response.json()
          setExecutives(result.executives)
        }
      } catch (error) {
        console.error('Delete executive error:', error)
      }
    }
  }

  const handleAddExecutive = async (executiveData: any) => {
    try {
      const response = await fetch('/api/executives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          executive: executiveData
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        setExecutives(result.executives)
        setShowAddExecutiveForm(false)
      }
    } catch (error) {
      console.error('Add executive error:', error)
    }
  }

  const handleUpdateExecutive = async (updatedExecutive: any) => {
    try {
      const response = await fetch('/api/executives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          executive: updatedExecutive
        })
      })

      if (response.ok) {
        const result = await response.json()
        setExecutives(result.executives)
        setEditingExecutive(null)
      }
    } catch (error) {
      console.error('Update executive error:', error)
    }
  }

  // FAQ 관리 함수들
  const handleEditFaq = (faq: any) => {
    setEditingFaq(faq)
  }

  const handleDeleteFaq = async (id: number) => {
    if (confirm('정말로 이 FAQ를 삭제하시겠습니까?')) {
      try {
        const response = await fetch('/api/faq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'delete',
            faq: { id }
          })
        })
        
        if (response.ok) {
          const result = await response.json()
          setFaqs(result.faqs)
        }
      } catch (error) {
        console.error('Delete FAQ error:', error)
      }
    }
  }

  const handleAddFaq = async (faqData: any) => {
    try {
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          faq: faqData
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        setFaqs(result.faqs)
        setShowAddFaqForm(false)
      }
    } catch (error) {
      console.error('Add FAQ error:', error)
    }
  }

  const handleUpdateFaq = async (updatedFaq: any) => {
    try {
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          faq: updatedFaq
        })
      })

      if (response.ok) {
        const result = await response.json()
        setFaqs(result.faqs)
        setEditingFaq(null)
      }
    } catch (error) {
      console.error('Update FAQ error:', error)
    }
  }

  // 게시판 관리 함수들
  const handleEditPost = (post: any) => {
    setEditingPost(post)
  }

  const handleDeletePost = async (id: number) => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'delete',
            post: { id }
          })
        })
        
        if (response.ok) {
          const result = await response.json()
          setPosts(result.posts)
        }
      } catch (error) {
        console.error('Delete post error:', error)
      }
    }
  }

  const handleAddPost = async (postData: any) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          post: postData
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        setPosts(result.posts)
        setShowAddPostForm(false)
      }
    } catch (error) {
      console.error('Add post error:', error)
    }
  }

  const handleUpdatePost = async (updatedPost: any) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          post: updatedPost
        })
      })

      if (response.ok) {
        const result = await response.json()
        setPosts(result.posts)
        setEditingPost(null)
      }
    } catch (error) {
      console.error('Update post error:', error)
    }
  }

  // 자료실 관리 함수들
  const handleEditResource = (resource: any) => {
    setEditingResource(resource)
  }

  const handleDeleteResource = async (id: number) => {
    if (confirm('정말로 이 자료를 삭제하시겠습니까?')) {
      try {
        const response = await fetch('/api/resources', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'delete',
            resource: { id }
          })
        })
        
        if (response.ok) {
          const result = await response.json()
          setResources(result.resources)
        }
      } catch (error) {
        console.error('Delete resource error:', error)
      }
    }
  }

  const handleAddResource = async (resourceData: any) => {
    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          resource: resourceData
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        setResources(result.resources)
        setShowAddResourceForm(false)
      }
    } catch (error) {
      console.error('Add resource error:', error)
    }
  }

  const handleUpdateResource = async (updatedResource: any) => {
    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          resource: updatedResource
        })
      })

      if (response.ok) {
        const result = await response.json()
        setResources(result.resources)
        setEditingResource(null)
      }
    } catch (error) {
      console.error('Update resource error:', error)
    }
  }

  const loadData = async (section: string) => {
    try {
      let response
      switch (section) {
        case 'executives':
          response = await fetch('/api/executives')
          if (response.ok) {
            const executivesData = await response.json()
            setExecutives(executivesData)
          }
          break
        case 'posts':
          response = await fetch('/api/posts')
          if (response.ok) {
            const postsData = await response.json()
            setPosts(postsData)
          }
          break
        case 'resources':
          response = await fetch('/api/resources')
          if (response.ok) {
            const resourcesData = await response.json()
            setResources(resourcesData)
          }
          break
        case 'faq':
          response = await fetch('/api/faq')
          if (response.ok) {
            const faqsData = await response.json()
            setFaqs(faqsData)
          }
          break
      }
    } catch (error) {
      console.error('데이터 로드 오류:', error)
      // 에러 발생 시 빈 배열로 설정
      switch (section) {
        case 'executives':
          setExecutives([])
          break
        case 'posts':
          setPosts([])
          break
        case 'resources':
          setResources([])
          break
        case 'faq':
          setFaqs([])
          break
      }
    }
  }

  const handleSectionClick = (section: string) => {
    setActiveSection(section)
    loadData(section)
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Admin Dashboard */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">관리자 대시보드</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Bosturn 동아리 관리 시스템
            </p>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {!activeSection ? (
              <div className="grid md:grid-cols-2 gap-8">
                {/* 집행부 조직도 편집 */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">집행부 조직도 편집</h3>
                  <p className="text-gray-600 mb-4">집행부 구성원과 조직도를 관리하고 편집합니다.</p>
                  <button 
                    onClick={() => handleSectionClick('executives')}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    조직도 편집하기
                  </button>
                </div>

                {/* FAQ 편집 */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❓</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">FAQ 편집</h3>
                  <p className="text-gray-600 mb-4">자주 묻는 질문과 답변을 관리하고 편집합니다.</p>
                  <button 
                    onClick={() => handleSectionClick('faq')}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    FAQ 편집하기
                  </button>
                </div>

                {/* 게시판 관리 */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">게시판 관리</h3>
                  <p className="text-gray-600 mb-4">게시글 업로드, 수정, 삭제를 관리합니다.</p>
                  <button 
                    onClick={() => handleSectionClick('posts')}
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    게시판 관리하기
                  </button>
                </div>

                {/* 자료실 관리 */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📁</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">자료실 관리</h3>
                  <p className="text-gray-600 mb-4">자료 업로드, 수정, 삭제를 관리합니다.</p>
                  <button 
                    onClick={() => handleSectionClick('resources')}
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    자료실 관리하기
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* 뒤로가기 버튼 */}
                <div className="mb-8">
                  <button
                    onClick={() => setActiveSection('')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    ← 대시보드로 돌아가기
                  </button>
                </div>

                {/* 각 섹션별 관리 인터페이스 */}
                                 {activeSection === 'executives' && (
                   <div className="bg-white rounded-lg shadow-lg p-6">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">집행부 조직도 관리</h2>
                     
                     {/* 집행부 추가 폼 */}
                     {showAddExecutiveForm && (
                       <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                         <h3 className="text-lg font-semibold mb-4">새 집행부 추가</h3>
                         <form onSubmit={(e) => {
                           e.preventDefault()
                           const formData = new FormData(e.currentTarget)
                           handleAddExecutive({
                             name: formData.get('name') as string,
                             school: formData.get('school') as string,
                             major: formData.get('major') as string,
                             position: formData.get('position') as string,
                             instagram: formData.get('instagram') as string
                           })
                         }}>
                           <div className="grid grid-cols-2 gap-4 mb-4">
                             <input name="name" placeholder="이름" required className="px-3 py-2 border rounded" />
                             <input name="school" placeholder="학교" required className="px-3 py-2 border rounded" />
                             <input name="major" placeholder="학과" required className="px-3 py-2 border rounded" />
                             <select name="position" required className="px-3 py-2 border rounded">
                               <option value="">직책 선택</option>
                               <option value="회장">회장</option>
                               <option value="부회장">부회장</option>
                               <option value="총무부장">총무부장</option>
                               <option value="기획부장">기획부장</option>
                               <option value="인사부장">인사부장</option>
                               <option value="홍보부장">홍보부장</option>
                             </select>
                             <input name="instagram" placeholder="인스타그램 (@username)" required className="px-3 py-2 border rounded" />
                           </div>
                           <div className="flex gap-2">
                             <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                               추가
                             </button>
                             <button type="button" onClick={() => setShowAddExecutiveForm(false)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                               취소
                             </button>
                           </div>
                         </form>
                       </div>
                     )}

                     {/* 집행부 수정 폼 */}
                     {editingExecutive && (
                       <div className="mb-6 p-4 border rounded-lg bg-blue-50">
                         <h3 className="text-lg font-semibold mb-4">집행부 수정</h3>
                         <form onSubmit={(e) => {
                           e.preventDefault()
                           const formData = new FormData(e.currentTarget)
                           handleUpdateExecutive({
                             ...editingExecutive,
                             name: formData.get('name') as string,
                             school: formData.get('school') as string,
                             major: formData.get('major') as string,
                             position: formData.get('position') as string,
                             instagram: formData.get('instagram') as string
                           })
                         }}>
                           <div className="grid grid-cols-2 gap-4 mb-4">
                             <input name="name" defaultValue={editingExecutive.name} placeholder="이름" required className="px-3 py-2 border rounded" />
                             <input name="school" defaultValue={editingExecutive.school} placeholder="학교" required className="px-3 py-2 border rounded" />
                             <input name="major" defaultValue={editingExecutive.major} placeholder="학과" required className="px-3 py-2 border rounded" />
                             <select name="position" defaultValue={editingExecutive.position} required className="px-3 py-2 border rounded">
                               <option value="">직책 선택</option>
                               <option value="회장">회장</option>
                               <option value="부회장">부회장</option>
                               <option value="총무부장">총무부장</option>
                               <option value="기획부장">기획부장</option>
                               <option value="인사부장">인사부장</option>
                               <option value="홍보부장">홍보부장</option>
                             </select>
                             <input name="instagram" defaultValue={editingExecutive.instagram} placeholder="인스타그램 (@username)" required className="px-3 py-2 border rounded" />
                           </div>
                           <div className="flex gap-2">
                             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                               수정
                             </button>
                             <button type="button" onClick={() => setEditingExecutive(null)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                               취소
                             </button>
                           </div>
                         </form>
                       </div>
                     )}

                     {/* 집행부 목록 */}
                     <div className="grid gap-4">
                       {executives.length === 0 ? (
                         <p className="text-gray-500 text-center py-8">등록된 집행부가 없습니다.</p>
                       ) : (
                         executives.map((executive: any) => (
                           <div key={executive.id} className="border p-4 rounded-lg">
                             <div className="flex items-center justify-between">
                               <div>
                                 <h3 className="font-semibold">{executive.name} - {executive.position}</h3>
                                 <p className="text-sm text-gray-600">{executive.school} {executive.major}</p>
                                 <p className="text-sm text-blue-600">{executive.instagram}</p>
                               </div>
                               <div className="flex gap-2">
                                 <button 
                                   onClick={() => handleEditExecutive(executive)}
                                   className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                 >
                                   수정
                                 </button>
                                 <button 
                                   onClick={() => handleDeleteExecutive(executive.id)}
                                   className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                 >
                                   삭제
                                 </button>
                               </div>
                             </div>
                           </div>
                         ))
                       )}
                       <button 
                         onClick={() => setShowAddExecutiveForm(true)}
                         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                       >
                         새 집행부 추가
                       </button>
                     </div>
                   </div>
                 )}

                                 {activeSection === 'faq' && (
                   <div className="bg-white rounded-lg shadow-lg p-6">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ 관리</h2>
                     
                     {/* FAQ 추가 폼 */}
                     {showAddFaqForm && (
                       <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                         <h3 className="text-lg font-semibold mb-4">새 FAQ 추가</h3>
                         <form onSubmit={(e) => {
                           e.preventDefault()
                           const formData = new FormData(e.currentTarget)
                           handleAddFaq({
                             question: formData.get('question') as string,
                             answer: formData.get('answer') as string
                           })
                         }}>
                           <div className="space-y-4 mb-4">
                             <input name="question" placeholder="질문" required className="w-full px-3 py-2 border rounded" />
                             <textarea name="answer" placeholder="답변" required rows={3} className="w-full px-3 py-2 border rounded" />
                           </div>
                           <div className="flex gap-2">
                             <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                               추가
                             </button>
                             <button type="button" onClick={() => setShowAddFaqForm(false)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                               취소
                             </button>
                           </div>
                         </form>
                       </div>
                     )}

                     {/* FAQ 수정 폼 */}
                     {editingFaq && (
                       <div className="mb-6 p-4 border rounded-lg bg-blue-50">
                         <h3 className="text-lg font-semibold mb-4">FAQ 수정</h3>
                         <form onSubmit={(e) => {
                           e.preventDefault()
                           const formData = new FormData(e.currentTarget)
                           handleUpdateFaq({
                             ...editingFaq,
                             question: formData.get('question') as string,
                             answer: formData.get('answer') as string
                           })
                         }}>
                           <div className="space-y-4 mb-4">
                             <input name="question" defaultValue={editingFaq.question} placeholder="질문" required className="w-full px-3 py-2 border rounded" />
                             <textarea name="answer" defaultValue={editingFaq.answer} placeholder="답변" required rows={3} className="w-full px-3 py-2 border rounded" />
                           </div>
                           <div className="flex gap-2">
                             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                               수정
                             </button>
                             <button type="button" onClick={() => setEditingFaq(null)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                               취소
                             </button>
                           </div>
                         </form>
                       </div>
                     )}

                     {/* FAQ 목록 */}
                     <div className="grid gap-4">
                       {faqs.length === 0 ? (
                         <p className="text-gray-500 text-center py-8">등록된 FAQ가 없습니다.</p>
                       ) : (
                         faqs.map((faq: any) => (
                           <div key={faq.id} className="border p-4 rounded-lg">
                             <div className="flex items-center justify-between">
                               <div className="flex-1">
                                 <h3 className="font-semibold mb-2">{faq.question}</h3>
                                 <p className="text-sm text-gray-600">{faq.answer}</p>
                               </div>
                               <div className="flex gap-2 ml-4">
                                 <button 
                                   onClick={() => handleEditFaq(faq)}
                                   className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                 >
                                   수정
                                 </button>
                                 <button 
                                   onClick={() => handleDeleteFaq(faq.id)}
                                   className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                 >
                                   삭제
                                 </button>
                               </div>
                             </div>
                           </div>
                         ))
                       )}
                       <button 
                         onClick={() => setShowAddFaqForm(true)}
                         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                       >
                         새 FAQ 추가
                       </button>
                     </div>
                   </div>
                 )}

                                 {activeSection === 'posts' && (
                   <div className="bg-white rounded-lg shadow-lg p-6">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">게시판 관리</h2>
                     
                     {/* 게시글 추가 폼 */}
                     {showAddPostForm && (
                       <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                         <h3 className="text-lg font-semibold mb-4">새 게시글 추가</h3>
                         <form onSubmit={(e) => {
                           e.preventDefault()
                           const formData = new FormData(e.currentTarget)
                           handleAddPost({
                             title: formData.get('title') as string,
                             category: formData.get('category') as string,
                             content: formData.get('content') as string,
                             author: formData.get('author') as string,
                             date: new Date().toISOString().split('T')[0]
                           })
                         }}>
                           <div className="grid grid-cols-2 gap-4 mb-4">
                             <input name="title" placeholder="제목" required className="px-3 py-2 border rounded" />
                             <select name="category" required className="px-3 py-2 border rounded">
                               <option value="">카테고리 선택</option>
                               <option value="rules">게임 룰</option>
                               <option value="news">소식</option>
                               <option value="events">이벤트</option>
                               <option value="general">일반</option>
                             </select>
                             <input name="author" placeholder="작성자" required className="px-3 py-2 border rounded" />
                             <textarea name="content" placeholder="내용" required rows={4} className="px-3 py-2 border rounded col-span-2" />
                           </div>
                           <div className="flex gap-2">
                             <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                               추가
                             </button>
                             <button type="button" onClick={() => setShowAddPostForm(false)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                               취소
                             </button>
                           </div>
                         </form>
                       </div>
                     )}

                     {/* 게시글 수정 폼 */}
                     {editingPost && (
                       <div className="mb-6 p-4 border rounded-lg bg-blue-50">
                         <h3 className="text-lg font-semibold mb-4">게시글 수정</h3>
                         <form onSubmit={(e) => {
                           e.preventDefault()
                           const formData = new FormData(e.currentTarget)
                           handleUpdatePost({
                             ...editingPost,
                             title: formData.get('title') as string,
                             category: formData.get('category') as string,
                             content: formData.get('content') as string,
                             author: formData.get('author') as string
                           })
                         }}>
                           <div className="grid grid-cols-2 gap-4 mb-4">
                             <input name="title" defaultValue={editingPost.title} placeholder="제목" required className="px-3 py-2 border rounded" />
                             <select name="category" defaultValue={editingPost.category} required className="px-3 py-2 border rounded">
                               <option value="">카테고리 선택</option>
                               <option value="rules">게임 룰</option>
                               <option value="news">소식</option>
                               <option value="events">이벤트</option>
                               <option value="general">일반</option>
                             </select>
                             <input name="author" defaultValue={editingPost.author} placeholder="작성자" required className="px-3 py-2 border rounded" />
                             <textarea name="content" defaultValue={editingPost.content} placeholder="내용" required rows={4} className="px-3 py-2 border rounded col-span-2" />
                           </div>
                           <div className="flex gap-2">
                             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                               수정
                             </button>
                             <button type="button" onClick={() => setEditingPost(null)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                               취소
                             </button>
                           </div>
                         </form>
                       </div>
                     )}

                     {/* 게시글 목록 */}
                     <div className="grid gap-4">
                       {posts.length === 0 ? (
                         <p className="text-gray-500 text-center py-8">등록된 게시글이 없습니다.</p>
                       ) : (
                         posts.map((post: any) => (
                           <div key={post.id} className="border p-4 rounded-lg">
                             <div className="flex items-center justify-between">
                               <div className="flex-1">
                                 <h3 className="font-semibold mb-1">{post.title}</h3>
                                 <p className="text-sm text-gray-600 mb-1">{post.author} - {post.date}</p>
                                 <p className="text-sm text-gray-500">카테고리: {post.category}</p>
                               </div>
                               <div className="flex gap-2 ml-4">
                                 <button 
                                   onClick={() => handleEditPost(post)}
                                   className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                 >
                                   수정
                                 </button>
                                 <button 
                                   onClick={() => handleDeletePost(post.id)}
                                   className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                 >
                                   삭제
                                 </button>
                               </div>
                             </div>
                           </div>
                         ))
                       )}
                       <button 
                         onClick={() => setShowAddPostForm(true)}
                         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                       >
                         새 게시글 추가
                       </button>
                     </div>
                   </div>
                 )}

                                 {activeSection === 'resources' && (
                   <div className="bg-white rounded-lg shadow-lg p-6">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">자료실 관리</h2>
                     
                     {/* 자료 추가 폼 */}
                     {showAddResourceForm && (
                       <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                         <h3 className="text-lg font-semibold mb-4">새 자료 추가</h3>
                         <form onSubmit={(e) => {
                           e.preventDefault()
                           const formData = new FormData(e.currentTarget)
                           handleAddResource({
                             title: formData.get('title') as string,
                             category: formData.get('category') as string,
                             description: formData.get('description') as string,
                             author: formData.get('author') as string,
                             date: new Date().toISOString().split('T')[0],
                             type: formData.get('type') as string,
                             size: formData.get('size') as string
                           })
                         }}>
                           <div className="grid grid-cols-2 gap-4 mb-4">
                             <input name="title" placeholder="제목" required className="px-3 py-2 border rounded" />
                             <select name="category" required className="px-3 py-2 border rounded">
                               <option value="">카테고리 선택</option>
                               <option value="finance">회계</option>
                               <option value="constitution">회칙</option>
                               <option value="minutes">회의록</option>
                               <option value="promotion">홍보 자료</option>
                             </select>
                             <input name="author" placeholder="작성자" required className="px-3 py-2 border rounded" />
                             <select name="type" required className="px-3 py-2 border rounded">
                               <option value="">파일 타입</option>
                               <option value="PDF">PDF</option>
                               <option value="DOC">DOC</option>
                               <option value="XLS">XLS</option>
                               <option value="PPT">PPT</option>
                               <option value="ZIP">ZIP</option>
                             </select>
                             <input name="size" placeholder="파일 크기 (예: 2.1MB)" required className="px-3 py-2 border rounded" />
                             <textarea name="description" placeholder="설명" required rows={3} className="px-3 py-2 border rounded col-span-2" />
                           </div>
                           <div className="flex gap-2">
                             <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                               추가
                             </button>
                             <button type="button" onClick={() => setShowAddResourceForm(false)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                               취소
                             </button>
                           </div>
                         </form>
                       </div>
                     )}

                     {/* 자료 수정 폼 */}
                     {editingResource && (
                       <div className="mb-6 p-4 border rounded-lg bg-blue-50">
                         <h3 className="text-lg font-semibold mb-4">자료 수정</h3>
                         <form onSubmit={(e) => {
                           e.preventDefault()
                           const formData = new FormData(e.currentTarget)
                           handleUpdateResource({
                             ...editingResource,
                             title: formData.get('title') as string,
                             category: formData.get('category') as string,
                             description: formData.get('description') as string,
                             author: formData.get('author') as string,
                             type: formData.get('type') as string,
                             size: formData.get('size') as string
                           })
                         }}>
                           <div className="grid grid-cols-2 gap-4 mb-4">
                             <input name="title" defaultValue={editingResource.title} placeholder="제목" required className="px-3 py-2 border rounded" />
                             <select name="category" defaultValue={editingResource.category} required className="px-3 py-2 border rounded">
                               <option value="">카테고리 선택</option>
                               <option value="finance">회계</option>
                               <option value="constitution">회칙</option>
                               <option value="minutes">회의록</option>
                               <option value="promotion">홍보 자료</option>
                             </select>
                             <input name="author" defaultValue={editingResource.author} placeholder="작성자" required className="px-3 py-2 border rounded" />
                             <select name="type" defaultValue={editingResource.type} required className="px-3 py-2 border rounded">
                               <option value="">파일 타입</option>
                               <option value="PDF">PDF</option>
                               <option value="DOC">DOC</option>
                               <option value="XLS">XLS</option>
                               <option value="PPT">PPT</option>
                               <option value="ZIP">ZIP</option>
                             </select>
                             <input name="size" defaultValue={editingResource.size} placeholder="파일 크기 (예: 2.1MB)" required className="px-3 py-2 border rounded" />
                             <textarea name="description" defaultValue={editingResource.description} placeholder="설명" required rows={3} className="px-3 py-2 border rounded col-span-2" />
                           </div>
                           <div className="flex gap-2">
                             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                               수정
                             </button>
                             <button type="button" onClick={() => setEditingResource(null)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                               취소
                             </button>
                           </div>
                         </form>
                       </div>
                     )}

                     {/* 자료 목록 */}
                     <div className="grid gap-4">
                       {resources.length === 0 ? (
                         <p className="text-gray-500 text-center py-8">등록된 자료가 없습니다.</p>
                       ) : (
                         resources.map((resource: any) => (
                           <div key={resource.id} className="border p-4 rounded-lg">
                             <div className="flex items-center justify-between">
                               <div className="flex-1">
                                 <h3 className="font-semibold mb-1">{resource.title}</h3>
                                 <p className="text-sm text-gray-600 mb-1">{resource.author} - {resource.date}</p>
                                 <p className="text-sm text-gray-500 mb-1">카테고리: {resource.category} | 타입: {resource.type} | 크기: {resource.size}</p>
                                 <p className="text-sm text-gray-600">{resource.description}</p>
                               </div>
                               <div className="flex gap-2 ml-4">
                                 <button 
                                   onClick={() => handleEditResource(resource)}
                                   className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                 >
                                   수정
                                 </button>
                                 <button 
                                   onClick={() => handleDeleteResource(resource.id)}
                                   className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                 >
                                   삭제
                                 </button>
                               </div>
                             </div>
                           </div>
                         ))
                       )}
                       <button 
                         onClick={() => setShowAddResourceForm(true)}
                         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                       >
                         새 자료 추가
                       </button>
                     </div>
                   </div>
                 )}
              </div>
            )}

            {/* 로그아웃 버튼 */}
            <div className="text-center mt-12">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🔐</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">관리자 로그인</h2>
            <p className="text-gray-600 mt-2">Bosturn 동아리 관리 시스템</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                관리자 비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors font-medium"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              환경변수 설정: <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> 파일에 <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_ADMIN_PASSWORD=원하는비밀번호</code> 추가
            </p>
            <p className="text-xs text-gray-400 mt-2">
              기본 비밀번호: admin123 (환경변수 미설정 시)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
