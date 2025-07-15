import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Music, Play, Pause, Edit, Trash2 } from "lucide-react";
import { Layout } from "../components/Layout";
import { supabase, type ChronoscrollEntry } from "../lib/supabase";
import { format } from "date-fns";

export function meta() {
  return [
    { title: "回忆详情 - 时光书简" },
    { name: "description", content: "查看回忆详情" },
  ];
}

export default function ChronoscrollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<ChronoscrollEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (id) {
      fetchEntry(id);
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [audio]);

  async function fetchEntry(entryId: string) {
    try {
      const { data, error } = await supabase
        .from('chronoscroll_entries')
        .select('*')
        .eq('id', entryId)
        .single();

      if (error) throw error;
      setEntry(data);
    } catch (error) {
      console.error('获取回忆失败:', error);
      navigate('/chronoscroll');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!entry || !confirm('确定要删除这个回忆吗？此操作无法撤销。')) return;

    try {
      const { error } = await supabase
        .from('chronoscroll_entries')
        .delete()
        .eq('id', entry.id);

      if (error) throw error;
      navigate('/chronoscroll');
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败，请重试');
    }
  }

  function toggleMusic() {
    if (!entry?.music_url) return;

    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      const newAudio = new Audio(entry.music_url);
      newAudio.addEventListener('ended', () => setIsPlaying(false));
      newAudio.addEventListener('error', () => {
        setIsPlaying(false);
        alert('音乐加载失败');
      });
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">正在加载回忆...</p>
        </div>
      </Layout>
    );
  }

  if (!entry) {
    return (
      <Layout>
        <div className="text-center text-white">
          <p>回忆不存在</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-white">
        {/* 头部导航 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/chronoscroll')}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回书简</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/chronoscroll/${entry.id}/edit`)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Edit size={16} />
              <span>编辑</span>
            </button>
            
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 hover:bg-red-500/30 transition-colors"
            >
              <Trash2 size={16} />
              <span>删除</span>
            </button>
          </div>
        </div>

        {/* 回忆内容 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
          {/* 图片 */}
          {entry.image_url && (
            <div className="h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative overflow-hidden">
              <img
                src={entry.image_url}
                alt={entry.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          )}

          <div className="p-8">
            {/* 标题和时间 */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                {entry.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-white/60">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{format(new Date(entry.created_at), 'yyyy年M月d日 HH:mm')}</span>
                </div>
                
                {entry.music_title && (
                  <div className="flex items-center space-x-2">
                    <Music size={16} />
                    <span>{entry.music_title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 音乐播放器 */}
            {entry.music_url && (
              <div className="mb-6">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 font-medium">
                        {entry.music_title || '背景音乐'}
                      </p>
                      <p className="text-white/50 text-sm">点击播放回忆的声音</p>
                    </div>
                    
                    <button
                      onClick={toggleMusic}
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 内容 */}
            <div className="prose prose-invert max-w-none">
              <div className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </div>
            </div>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="text-center mt-12 text-white/40">
          <p className="italic">
            "回忆太美，所以人才念旧"
          </p>
        </div>
      </div>
    </Layout>
  );
}
