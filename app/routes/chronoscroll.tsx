import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Plus, Calendar, Music, Image } from "lucide-react";
import { Layout } from "../components/Layout";
import { supabase, type ChronoscrollEntry } from "../lib/supabase";
import { format } from "date-fns";

export function meta() {
  return [
    { title: "时光书简 - 梦的出口" },
    { name: "description", content: "记录珍贵的回忆瞬间" },
  ];
}

export default function Chronoscroll() {
  const [entries, setEntries] = useState<ChronoscrollEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const { data, error } = await supabase
        .from('chronoscroll_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('获取回忆失败:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">正在加载时光书简...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-white">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            时光书简
          </h1>
          <p className="text-white/70 text-lg">
            记录那些珍贵的回忆瞬间，编织属于你的海市蜃楼
          </p>
        </div>

        {/* 创建按钮 */}
        <div className="text-center mb-12">
          <Link
            to="/chronoscroll/new"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Plus size={20} />
            <span>创建新回忆</span>
          </Link>
        </div>

        {/* 回忆列表 */}
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <Calendar size={48} className="text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2 text-white/80">还没有任何回忆</h3>
              <p className="text-white/60">
                创建你的第一个回忆，开始编织属于你的时光书简
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <Link
                key={entry.id}
                to={`/chronoscroll/${entry.id}`}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
                  {/* 图片预览 */}
                  {entry.image_url && (
                    <div className="h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative overflow-hidden">
                      <img
                        src={entry.image_url}
                        alt={entry.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-200 transition-colors line-clamp-2">
                      {entry.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {entry.content}
                    </p>

                    {/* 标签 */}
                    <div className="flex items-center space-x-4 text-xs text-white/50">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>
                          {format(new Date(entry.created_at), 'yyyy年M月d日')}
                        </span>
                      </div>
                      
                      {entry.music_url && (
                        <div className="flex items-center space-x-1">
                          <Music size={12} />
                          <span>音乐</span>
                        </div>
                      )}
                      
                      {entry.image_url && (
                        <div className="flex items-center space-x-1">
                          <Image size={12} />
                          <span>图片</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
