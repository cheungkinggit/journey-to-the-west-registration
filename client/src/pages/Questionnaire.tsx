import React, { useState } from 'react';
import { useRegistrations } from '../contexts/RegistrationContext';
import { SCHOOL_INFO } from '../const';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Send, CheckCircle2, Mail, Users, Sparkles } from 'lucide-react';

interface QuestionnaireProps {
  schoolType: 'ling-liang' | 'kam-lai';
}

export default function Questionnaire({ schoolType }: QuestionnaireProps) {
  const { addRegistration } = useRegistrations();
  const info = SCHOOL_INFO[schoolType];

  // 表單狀態 - 已移除聯絡電話與意願欄位
  const [studentName, setStudentName] = useState('');
  const [gender, setGender] = useState<'男' | '女' | undefined>(undefined);
  const [grade, setGrade] = useState<'K1' | 'K2' | 'K3' | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [parentCount, setParentCount] = useState<'1' | '2' | undefined>(undefined);
  const [otherChildrenCount, setOtherChildrenCount] = useState<'0' | '1' | '2' | undefined>(undefined);
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 防呆與必填驗證
    if (!studentName.trim()) {
      toast.error('請輸入學生姓名（中文全名）');
      return;
    }
    if (!gender) {
      toast.error('請選擇學生性別');
      return;
    }
    if (!grade) {
      toast.error('請選擇現就讀班級');
      return;
    }
    if (!email.trim()) {
      toast.error('請輸入電郵地址');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error('請輸入有效的電郵地址');
      return;
    }
    if (!parentCount) {
      toast.error('請選擇隨行家長人數');
      return;
    }
    if (!otherChildrenCount) {
      toast.error('請選擇隨行其他兒童人數');
      return;
    }

    addRegistration({
      schoolType,
      studentName,
      gender,
      grade,
      email,
      parentCount,
      otherChildrenCount
    });

    setIsSubmitted(true);
    toast.success('報名成功！期待在活動日與您相見。');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${info.bgGradient} py-12 px-4 flex items-center justify-center`}>
        <Card className="max-w-2xl w-full border-2 border-amber-200 shadow-xl overflow-hidden rounded-2xl bg-white/95 backdrop-blur">
          <div className="bg-amber-500 py-8 text-center text-white relative overflow-hidden">
            {/* 祥雲背景裝飾 */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold font-sans">報名提交成功！</h2>
            <p className="mt-2 text-amber-50 opacity-90">藍田循道衛理小學 × {info.title}</p>
          </div>
          
          <CardContent className="p-8 space-y-6 text-center">
            <div className="relative max-w-xs mx-auto my-4">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663574972046/Vcs8rxDnLfAzocfvm4iNsq/chibi_wukong-CxmvGtWNYZstZz4hQK6eN5.webp" 
                alt="卡通孫悟空" 
                className="w-48 h-48 mx-auto object-contain drop-shadow-md"
              />
              <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" />
                <span>獲得取經邀請函！</span>
              </div>
            </div>

            <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100 text-left max-w-md mx-auto space-y-3">
              <h3 className="font-bold text-amber-900 border-b border-amber-200 pb-2 text-center">報名資料摘要</h3>
              <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">學生姓名：</span>{studentName}</p>
              <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">現就讀班級：</span>{grade} ({gender})</p>
              <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">確認信箱：</span>{email}</p>
              <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">隨行家長：</span>{parentCount} 人</p>
              {otherChildrenCount !== '0' && (
                <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">隨行兒童：</span>{otherChildrenCount} 人</p>
              )}
            </div>

            <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
              我們已向您的電郵地址 <span className="font-semibold text-slate-900">{email}</span> 發送確認信及活動須知。
              若有任何查詢，歡迎致電本校：<span className="font-semibold text-slate-900">23461033</span>。
            </p>
          </CardContent>
          
          <CardFooter className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
            <Button 
              variant="default" 
              onClick={() => {
                setIsSubmitted(false);
                setStudentName('');
                setGender(undefined);
                setGrade(undefined);
                setEmail('');
                setParentCount(undefined);
                setOtherChildrenCount(undefined);
              }}
              className="w-full sm:w-64 bg-amber-600 hover:bg-amber-700 text-white font-bold py-6 text-base rounded-xl"
            >
              再填一份
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${info.bgGradient} py-8 px-4 md:py-12`}>
      <div className="max-w-3xl mx-auto space-y-8">

        {/* 頂部橫幅 */}
        <div className="text-center space-y-4 pt-4">
          <div className="flex justify-center items-center gap-4">
            <span className="text-sm bg-white/80 backdrop-blur border border-amber-200 text-amber-800 font-bold px-3 py-1 rounded-full shadow-sm">
              藍田循道衛理小學 主辦
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            藍循同心 ‧ 玩轉西遊
          </h1>
          <p className="text-lg text-slate-700 font-medium max-w-xl mx-auto">
            誠邀 <span className="text-amber-700 font-bold">{info.title}</span> 的小朋友及家長，一起來到藍循，跟師徒四人玩轉西遊！
          </p>
        </div>

        {/* 主卡片 */}
        <Card className="border-2 border-amber-200 shadow-xl overflow-hidden rounded-2xl bg-white/95 backdrop-blur relative">
          
          {/* 西遊背景插圖裝飾 */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663574972046/Vcs8rxDnLfAzocfvm4iNsq/chibi_wukong-CxmvGtWNYZstZz4hQK6eN5.webp" 
              alt="孫悟空" 
              className="w-full h-full object-contain"
            />
          </div>

          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 md:p-8">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 animate-pulse text-yellow-200" />
              活動報名問卷 ({info.title})
            </CardTitle>
            <CardDescription className="text-amber-50 text-sm mt-1">
              請填寫以下報名資料。活動包括：攤位闖關，體驗中華文化，認識西遊精神。
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 md:p-8 space-y-8">
              
              {/* 學生姓名 */}
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-base font-bold text-slate-900 flex items-center gap-1">
                  學生姓名（中文全名）<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="studentName"
                  placeholder="例如：陳小明"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="border-slate-200 focus-visible:ring-amber-500 h-11 text-base rounded-lg"
                  required
                />
              </div>

              {/* 學生性別 */}
              <div className="space-y-3">
                <Label className="text-base font-bold text-slate-900">
                  學生性別 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup 
                  value={gender || ""} 
                  onValueChange={(val) => setGender(val as '男' | '女')}
                  className="flex gap-6"
                >
                  <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${
                    gender === '男' 
                      ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-sm' 
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`} onClick={() => setGender('男')}>
                    <RadioGroupItem value="男" id="gender-boy" className="text-amber-600 focus:ring-amber-500" checked={gender === '男'} />
                    <Label htmlFor="gender-boy" className="text-base font-medium cursor-pointer">男</Label>
                  </div>
                  <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${
                    gender === '女' 
                      ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-sm' 
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`} onClick={() => setGender('女')}>
                    <RadioGroupItem value="女" id="gender-girl" className="text-amber-600 focus:ring-amber-500" checked={gender === '女'} />
                    <Label htmlFor="gender-girl" className="text-base font-medium cursor-pointer">女</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 現就讀班級 */}
              <div className="space-y-3">
                <Label className="text-base font-bold text-slate-900">
                  現就讀班級 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup 
                  value={grade || ""} 
                  onValueChange={(val) => setGrade(val as 'K1' | 'K2' | 'K3')}
                  className="grid grid-cols-3 gap-4"
                >
                  {['K1', 'K2', 'K3'].map((g) => (
                    <div 
                      key={g}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border cursor-pointer transition-all justify-center ${
                        grade === g 
                          ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-sm' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                      onClick={() => setGrade(g as any)}
                    >
                      <RadioGroupItem value={g} id={`grade-${g}`} className="text-amber-600 focus:ring-amber-500" checked={grade === g} />
                      <Label htmlFor={`grade-${g}`} className="text-base font-bold cursor-pointer">{g}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 電郵地址 */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-slate-500">✉</span>
                  電郵地址（發送確認信及活動須知用）<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="例如：parent@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-slate-200 focus-visible:ring-amber-500 h-11 text-base rounded-lg"
                  required
                />
              </div>

              {/* 隨行家長人數 - 題目已改名 */}
              <div className="space-y-3">
                <Label className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-500" />
                  隨行家長人數 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup 
                  value={parentCount || ""} 
                  onValueChange={(val) => setParentCount(val as '1' | '2')}
                  className="grid grid-cols-2 gap-4"
                >
                  {['1', '2'].map((num) => (
                    <div 
                      key={num}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border cursor-pointer transition-all justify-center ${
                        parentCount === num 
                          ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-sm' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                      onClick={() => setParentCount(num as any)}
                    >
                      <RadioGroupItem value={num} id={`parent-${num}`} className="text-amber-600 focus:ring-amber-500" checked={parentCount === num} />
                      <Label htmlFor={`parent-${num}`} className="text-base font-medium cursor-pointer">{num} 人</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 隨行其他兒童人數 */}
              <div className="space-y-3">
                <Label className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-500" />
                  隨行其他兒童人數（如弟妹）<span className="text-red-500">*</span>
                </Label>
                <RadioGroup 
                  value={otherChildrenCount || ""} 
                  onValueChange={(val) => setOtherChildrenCount(val as '0' | '1' | '2')}
                  className="grid grid-cols-3 gap-4"
                >
                  {['0', '1', '2'].map((num) => (
                    <div 
                      key={num}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border cursor-pointer transition-all justify-center ${
                        otherChildrenCount === num 
                          ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-sm' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                      onClick={() => setOtherChildrenCount(num as any)}
                    >
                      <RadioGroupItem value={num} id={`children-${num}`} className="text-amber-600 focus:ring-amber-500" checked={otherChildrenCount === num} />
                      <Label htmlFor={`children-${num}`} className="text-base font-medium cursor-pointer">{num === '0' ? '無' : `${num} 人`}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 個人資料收集聲明 - 移除 Checkbox，改為純文字展示 */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <h4 className="font-bold text-slate-900 text-base">個人資料收集聲明及條款</h4>
                
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-3 leading-relaxed">
                  <p className="font-medium text-slate-900">重要聲明：</p>
                  <p>1. 此問卷所收集的資料只用作是次活動報名之用，並會於活動後一段時間內銷毀。</p>
                  <p>2. 本校將於活動期間進行攝影及錄影，相片或影片可能用於學校網頁、社交媒體或宣傳刊物。</p>
                  <p className="text-xs text-amber-800 font-semibold mt-2 border-t border-amber-100 pt-2">
                    * 提交此問卷即代表您已閱讀、理解並同意上述個人資料收集聲明及相應條款。
                  </p>
                </div>
              </div>

            </CardContent>

            <CardFooter className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
              <Button 
                type="submit" 
                className="w-full md:w-auto px-12 py-6 text-lg font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                提交報名問卷
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* 活動海報展示 */}
        <Card className="border-2 border-amber-200 shadow-xl overflow-hidden rounded-2xl bg-white/95 backdrop-blur">
          <CardHeader className="bg-amber-50 border-b border-amber-100 p-6 text-center">
            <CardTitle className="text-xl font-bold text-amber-900 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              活動海報
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-8 flex justify-center bg-slate-900/5">
            <img 
              src={info.posterUrl} 
              alt={`${info.title} 活動海報`} 
              className="max-w-full md:max-w-lg rounded-lg shadow-lg border border-slate-200"
            />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
