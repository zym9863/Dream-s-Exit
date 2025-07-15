import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save, Upload, Music, X } from "lucide-react";
import { Layout } from "../components/Layout";
import { supabase } from "../lib/supabase";
import { getUserId } from "../lib/user";

export function meta() {
  return [
    { title: "创建新回忆 - 时光书简" },
    { name: "description", content: "记录一个新的珍贵回忆" },
  ];
}

export default function NewChronoscrollEntry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    music_url: '',
    music_title: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('chronoscroll_entries')
        .insert([{
          ...formData,
          user_id: getUserId()
        }]);

      if (error) throw error;
      
      navigate('/chronoscroll');
    } catch (error) {
      console.error('创建回忆失败:', error);
      alert('创建失败，请重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-white">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/chronoscroll')}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回书简</span>
          </button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            创建新回忆
          </h1>
          
          <div className="w-20"></div>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            {/* 标题 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white/80">
                回忆标题 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="给这个回忆起个美丽的名字..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all"
                maxLength={100}
              />
            </div>

            {/* 内容 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white/80">
                回忆内容 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="记录下这个珍贵的瞬间..."
                rows={8}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all resize-none"
              />
            </div>

            {/* 图片URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white/80">
                图片链接
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all"
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-purple-500/30 border border-purple-400/50 rounded-lg text-purple-200 hover:bg-purple-500/40 transition-colors"
                  title="上传图片"
                >
                  <Upload size={16} />
                </button>
              </div>
              {formData.image_url && (
                <div className="mt-3 relative">
                  <img
                    src={formData.image_url}
                    alt="预览"
                    className="w-full h-32 object-cover rounded-lg"
                    onError={() => setFormData({ ...formData, image_url: '' })}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: '' })}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* 音乐 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white/80">
                背景音乐
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.music_title}
                  onChange={(e) => setFormData({ ...formData, music_title: e.target.value })}
                  placeholder="音乐标题..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all"
                />
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={formData.music_url}
                    onChange={(e) => setFormData({ ...formData, music_url: e.target.value })}
                    placeholder="https://example.com/music.mp3"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-blue-500/30 border border-blue-400/50 rounded-lg text-blue-200 hover:bg-blue-500/40 transition-colors"
                    title="选择音乐"
                  >
                    <Music size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/chronoscroll')}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title.trim() || !formData.content.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>保存中...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>保存回忆</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
