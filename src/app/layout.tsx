import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';
import Link from 'next/link';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bosturn - 보드게임 동아리",
  description: "보드게임을 통해 새로운 경험과 즐거움을 만들어가는 대학 동아리 Bosturn입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 transition-colors duration-200`}
      >
        <ThemeProvider>
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Bosturn
                </Link>
              </div>
              <div className="hidden md:flex space-x-8 items-center">
                <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">동아리 소개</a>
                <a href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
                <a href="/executives" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">집행부</a>
                <a href="/board" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">게시판</a>
                <a href="/resources" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">자료실</a>
                <a href="/chatbot" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">ChatBosturn</a>
                <a href="/apply" className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-md hover:shadow-lg">지원하기</a>
              </div>
              <div className="md:hidden">
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        
        {/* Floating Admin Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <a 
            href="/admin"
            className="bg-gray-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-900 transition-all transform hover:scale-110 hover:shadow-xl"
            title="관리자 로그인"
          >
            <span className="text-xl">🔐</span>
          </a>
        </div>
        
        <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 transition-colors duration-200">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-300 dark:text-gray-400">© 2024 Bosturn. 보드게임 동아리</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">함께 즐기고, 함께 성장하는 보드게임 커뮤니티</p>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
