export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">동아리 소개</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Bosturn과 함께하는 보드게임의 세계
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Bosturn이란?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Bosturn은 보드게임을 사랑하는 대학생들이 모여 만든 동아리입니다. 
              단순히 게임을 즐기는 것을 넘어서, 보드게임을 통해 전략적 사고, 
              협력 정신, 그리고 새로운 친구들과의 만남을 추구합니다.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              우리는 매주 정기 모임을 통해 다양한 보드게임을 즐기고, 
              새로운 게임을 배우며, 함께 성장하는 시간을 가집니다.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">동아리 활동</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">정기 모임</h3>
                <p className="text-gray-700">매주 토요일 오후, 다양한 보드게임을 즐기는 정기 모임</p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-3">신입 교육</h3>
                <p className="text-gray-700">새로운 멤버를 위한 보드게임 기초 교육 및 룰 설명</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">토너먼트</h3>
                <p className="text-gray-700">분기별 보드게임 토너먼트를 통한 친목 도모</p>
              </div>
              <div className="p-6 bg-orange-50 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">게임 개발</h3>
                <p className="text-gray-700">직접 보드게임을 기획하고 제작하는 창작 활동</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">동아리 비전</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">보드게임 문화 확산</h3>
                  <p className="text-gray-700">대학 내 보드게임 문화를 확산시켜 더 많은 학생들이 참여할 수 있도록 합니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">창의적 사고 개발</h3>
                  <p className="text-gray-700">다양한 보드게임을 통해 전략적 사고와 창의적 문제 해결 능력을 기릅니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">건강한 커뮤니티 구축</h3>
                  <p className="text-gray-700">게임을 통해 서로를 이해하고 존중하는 건강한 커뮤니티를 만듭니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
