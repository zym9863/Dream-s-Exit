import { useState, useEffect } from "react";
import { Send, Heart, Clock, Sparkles } from "lucide-react";
import { Layout } from "../components/Layout";
import { supabase, type EchoEntry } from "../lib/supabase";
import { formatDistanceToNow } from "date-fns";

export function meta() {
  return [
    { title: "回音长廊 - 梦的出口" },
    { name: "description", content: "匿名分享瞬时情感" },
  ];
}

export default function EchoGallery() {
  const [echoes, setEchoes] = useState<EchoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEcho, setNewEcho] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEchoes();
    // 每30秒刷新一次
    const interval = setInterval(fetchEchoes, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchEchoes() {
    try {
      const { data, error } = await supabase
        .from('echo_entries')
        .select('*')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setEchoes(data || []);
    } catch (error) {
      console.error('获取回音失败:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newEcho.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('echo_entries')
        .insert([{ content: newEcho.trim() }]);

      if (error) throw error;
      
      setNewEcho('');
      fetchEchoes();
    } catch (error) {
      console.error('发送回音失败:', error);
      alert('发送失败，请重试');
    } finally {
      setSubmitting(false);
    }
  }

  function getTimeRemaining(expiresAt: string) {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    
    if (diff <= 0) return '即将消失';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}小时${minutes > 0 ? minutes + '分钟' : ''}后消失`;
    } else {
      return `${minutes}分钟后消失`;
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">正在加载回音长廊...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-white">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            回音长廊
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            匿名分享你的瞬时情感，像"漫天蝶游"般自由飞翔<br />
            每一声回音都会在24小时后消失，留下的只有无声的共鸣
          </p>
        </div>

        {/* 发送回音 */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Sparkles size={24} className="text-blue-300" />
              <span>投递你的回音</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={newEcho}
                onChange={(e) => setNewEcho(e.target.value)}
                placeholder="说出你此刻的心声...这些文字将在24小时后消失，就像落花流水一般..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all resize-none"
              />
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/50">
                  {newEcho.length}/500 字符 • 匿名发送 • 24小时后自动消失
                </div>
                
                <button
                  type="submit"
                  disabled={submitting || !newEcho.trim()}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>发送中...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>投递回音</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 回音列表 */}
        {echoes.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <Heart size={48} className="text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2 text-white/80">长廊中还很安静</h3>
              <p className="text-white/60">
                成为第一个在这里留下回音的人
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {echoes.map((echo, index) => (
              <div
                key={echo.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="mb-4">
                  <p className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">
                    {echo.content}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-white/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>
                        {formatDistanceToNow(new Date(echo.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <span>•</span>
                    
                    <div className="flex items-center space-x-1">
                      <Sparkles size={12} />
                      <span>{getTimeRemaining(echo.expires_at)}</span>
                    </div>
                  </div>
                  
                  <div className="text-white/30">
                    匿名旁观者
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 底部诗句 */}
        <div className="text-center mt-16 text-white/40">
          <blockquote className="text-lg italic">
            "谁不是流泪的旁观者，<br />
            物是人非的见证者。"
          </blockquote>
        </div>
      </div>
    </Layout>
  );
}
