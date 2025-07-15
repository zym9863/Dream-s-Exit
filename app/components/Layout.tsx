import { Link, useLocation } from "react-router";
import { BookOpen, Volume2, Home } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* 星空背景效果 */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold tracking-wide">
            梦的出口
          </Link>
          
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === "/" 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Home size={20} />
              <span>首页</span>
            </Link>
            
            <Link
              to="/chronoscroll"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname.startsWith("/chronoscroll")
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <BookOpen size={20} />
              <span>时光书简</span>
            </Link>
            
            <Link
              to="/echo-gallery"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname.startsWith("/echo-gallery")
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Volume2 size={20} />
              <span>回音长廊</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="relative z-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
