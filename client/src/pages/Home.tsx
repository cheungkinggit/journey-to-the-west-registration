import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sparkles, BarChart3, ArrowRight, GraduationCap, Compass, BookOpen } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 flex flex-col">
      
      {/* 頂部導航 */}
      <header className="bg-white/80 backdrop-blur border-b border-amber-100 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-amber-600" />
          <div>
            <h1 className="font-bold text-slate-900 leading-none">藍田循道衛理小學</h1>
            <p className="text-xs text-slate-500 mt-1">Lam Tin Methodist Primary School</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setLocation('/dashboard')}
          className="border-amber-200 text-amber-800 hover:bg-amber-50 font-semibold"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          問卷統計後台
        </Button>
      </header>

      {/* Hero 視覺大區 */}
      <main className="flex-1 container max-w-6xl py-12 space-y-16">
        
        {/* 西遊主題大橫幅 */}
        <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8">
          
          {/* 背景大圖 */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="flex-1 space-y-6 z-10 text-center md:text-left">
            <span className="inline-block bg-yellow-400 text-amber-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
              2026 年度活動日
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              藍盾同心 ‧ 玩轉西遊
            </h2>
            <p className="text-lg text-amber-50 max-w-xl leading-relaxed">
              西遊取經，志在千里！藍田循道衛理小學誠邀幼稚園小朋友與家長一同前來，在豐富的中華文化體驗與有趣的攤位遊戲中，認識西遊記不畏艱難的奮鬥精神。
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur border border-white/10">
                <Compass className="w-4 h-4 text-yellow-300" />
                <span>攤位闖關</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur border border-white/10">
                <BookOpen className="w-4 h-4 text-yellow-300" />
                <span>體驗中華文化</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur border border-white/10">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>認識西遊精神</span>
              </div>
            </div>
          </div>

          {/* 孫悟空 Q 版插圖 */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative z-10 shrink-0">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663574972046/Vcs8rxDnLfAzocfvm4iNsq/chibi_wukong-CxmvGtWNYZstZz4hQK6eN5.webp" 
              alt="孫悟空" 
              className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
            />
          </div>

        </div>

        {/* 兩份獨立問卷入口 (Two Portals) */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-slate-900">請選擇所屬幼稚園填寫問卷</h3>
            <p className="text-slate-600 mt-2">點擊下方卡片，進入專屬報名問卷頁面</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* 藍田靈糧幼稚園問卷入口 */}
            <Card className="border-2 border-sky-100 hover:border-sky-300 transition-all hover:shadow-xl rounded-2xl overflow-hidden bg-white flex flex-col group">
              <div className="bg-sky-500 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 opacity-90"></div>
                <h4 className="text-xl font-bold relative z-10">藍田靈糧幼稚園</h4>
                <p className="text-sky-100 text-sm mt-1 relative z-10">專屬報名問卷</p>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-slate-600 text-sm leading-relaxed">
                  本問卷對象為 <span className="font-bold text-slate-900">藍田靈糧幼稚園</span> 的學生及家長。填寫後將獲得確認信，並能於活動當天憑信參與「攤位闖關」等豐富西遊主題活動！
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>活動日期：2026年6月12日</span>
                    <span>時間：09:15 - 10:15</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 bg-slate-50 border-t border-slate-100">
                <Button 
                  onClick={() => setLocation('/survey/ling-liang')}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold group-hover:scale-[1.02] transition-transform"
                >
                  進入問卷
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            {/* 佛教金麗幼稚園問卷入口 */}
            <Card className="border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-xl rounded-2xl overflow-hidden bg-white flex flex-col group">
              <div className="bg-orange-500 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-600 opacity-90"></div>
                <h4 className="text-xl font-bold relative z-10">佛教金麗幼稚園</h4>
                <p className="text-orange-100 text-sm mt-1 relative z-10">專屬報名問卷</p>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-slate-600 text-sm leading-relaxed">
                  本問卷對象為 <span className="font-bold text-slate-900">佛教金麗幼稚園</span> 的學生及家長。填寫後將獲得確認信，並能於活動當天憑信參與「攤位闖關」等豐富西遊主題活動！
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>活動日期：2026年6月12日</span>
                    <span>時間：09:15 - 10:15</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 bg-slate-50 border-t border-slate-100">
                <Button 
                  onClick={() => setLocation('/survey/kam-lai')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold group-hover:scale-[1.02] transition-transform"
                >
                  進入問卷
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

          </div>
        </div>

        {/* 師徒四人插圖展示 */}
        <div className="bg-white/50 backdrop-blur rounded-2xl p-8 border border-amber-100 text-center space-y-6">
          <h4 className="text-lg font-bold text-slate-800">跟著師徒四人，開啟智慧、勇氣與同心的取經之旅！</h4>
          <div className="flex justify-center">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663574972046/Vcs8rxDnLfAzocfvm4iNsq/chibi_four_masters-2jW7mJnpyxiLQt3ggnE6iz.webp" 
              alt="西遊記師徒四人卡通合照" 
              className="max-w-md w-full object-contain drop-shadow-md"
            />
          </div>
        </div>

      </main>

      {/* 頁尾 */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center text-xs border-t border-slate-800">
        <p>© 2026 藍田循道衛理小學 Lam Tin Methodist Primary School. 版權所有。</p>
        <p className="mt-2 text-slate-600">地址：藍田平田邨安田街 | 電話：23461033</p>
      </footer>

    </div>
  );
}
