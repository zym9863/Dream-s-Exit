import type { Route } from "./+types/home";
import { Link } from "react-router";
import { BookOpen, Volume2, Star, Heart } from "lucide-react";
import { Layout } from "../components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "梦的出口 - Dreams Exit" },
    { name: "description", content: "一个私密的回忆记录与情感分享空间" },
  ];
}

export default function Home() {
  return (
    <Layout>
      <div className="text-center text-white">
        {/* 主标题区域 */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            梦的出口
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            在这里，记录那些珍贵却逝去的瞬间，<br />
            分享那些无声却深刻的情感。<br />
            <span className="text-purple-300">回忆太美，所以人才念旧。</span>
          </p>
        </div>

        {/* 功能卡片 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 时光书简 */}
          <Link to="/chronoscroll" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-purple-500/30 p-4 rounded-full group-hover:bg-purple-500/40 transition-colors">
                  <BookOpen size={40} className="text-purple-200" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-purple-200">时光书简</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                创建属于你的"海市蜃楼"，<br />
                记录那些珍贵的回忆瞬间。<br />
                文字、图片、音乐，<br />
                编织一个美丽的记忆花园。
              </p>
              <div className="flex items-center justify-center mt-6 space-x-2">
                <Star size={16} className="text-yellow-300" />
                <span className="text-sm text-white/60">私密空间</span>
              </div>
            </div>
          </Link>

          {/* 回音长廊 */}
          <Link to="/echo-gallery" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-500/30 p-4 rounded-full group-hover:bg-blue-500/40 transition-colors">
                  <Volume2 size={40} className="text-blue-200" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-blue-200">回音长廊</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                匿名分享你的瞬时情感，<br />
                像"漫天蝶游"般自由飞翔。<br />
                24小时后自动消失，<br />
                在无声的共鸣中获得慰藉。
              </p>
              <div className="flex items-center justify-center mt-6 space-x-2">
                <Heart size={16} className="text-red-300" />
                <span className="text-sm text-white/60">匿名分享</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 底部诗句 */}
        <div className="mt-16 text-center">
          <blockquote className="text-lg text-white/60 italic max-w-lg mx-auto">
            "谁不是流泪的旁观者，<br />
            物是人非的见证者。"
          </blockquote>
        </div>
      </div>
    </Layout>
  );
}
