import React, { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useRegistrations } from '../contexts/RegistrationContext';
import { SCHOOL_INFO, Registration } from '../const';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Download, Trash2, Search, Filter, RefreshCw, BarChart3, Users, School, PieChart, Info } from 'lucide-react';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { registrations, deleteRegistration, clearAll } = useRegistrations();

  // 搜尋與篩選狀態
  const [searchQuery, setSearchQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [willEnrollFilter, setWillEnrollFilter] = useState<string>('all');

  // 統計指標計算
  const stats = useMemo(() => {
    const total = registrations.length;
    const lingLiangCount = registrations.filter(r => r.schoolType === 'ling-liang').length;
    const kamLaiCount = registrations.filter(r => r.schoolType === 'kam-lai').length;
    
    // 家長與兒童總人數
    let totalParents = 0;
    let totalChildren = 0;
    registrations.forEach(r => {
      totalParents += parseInt(r.parentCount) || 0;
      totalChildren += parseInt(r.otherChildrenCount) || 0;
    });

    // 班級分佈
    const grades = { K1: 0, K2: 0, K3: 0 };
    registrations.forEach(r => {
      if (r.grade in grades) {
        grades[r.grade as 'K1' | 'K2' | 'K3']++;
      }
    });

    // 報讀意願分佈
    const enrollIntent = {
      high: registrations.filter(r => r.willEnroll === '很有意願，本校是首選之一').length,
      considering: registrations.filter(r => r.willEnroll === '正在考慮中，希望透過活動加深了解').length,
      neutral: registrations.filter(r => r.willEnroll === '純粹參與活動，暫未有定案').length,
    };

    return {
      total,
      lingLiangCount,
      kamLaiCount,
      totalParents,
      totalChildren,
      totalAttendees: total + totalParents + totalChildren,
      grades,
      enrollIntent
    };
  }, [registrations]);

  // 過濾後的報名資料
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(r => {
      const matchesSearch = 
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.phone.includes(searchQuery) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSchool = schoolFilter === 'all' || r.schoolType === schoolFilter;
      const matchesGrade = gradeFilter === 'all' || r.grade === gradeFilter;
      const matchesWillEnroll = willEnrollFilter === 'all' || r.willEnroll === willEnrollFilter;

      return matchesSearch && matchesSchool && matchesGrade && matchesWillEnroll;
    });
  }, [registrations, searchQuery, schoolFilter, gradeFilter, willEnrollFilter]);

  // 匯出 XLS 功能（使用 HTML Table 格式，Excel 可直接相容讀取）
  const handleExportXLS = () => {
    if (filteredRegistrations.length === 0) {
      toast.error('沒有可匯出的資料！');
      return;
    }

    // 建立 HTML Table 格式的 Excel 檔案（支援中文與樣式）
    let html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
        <style>
          table { border-collapse: collapse; }
          th { background-color: #F59E0B; color: white; font-weight: bold; border: 1px solid #D1D5DB; padding: 8px; }
          td { border: 1px solid #E5E7EB; padding: 8px; text-align: left; }
          .title-row { font-size: 16px; font-weight: bold; background-color: #FEF3C7; text-align: center; }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <th colspan="11" class="title-row">藍田循道衛理小學西遊記活動日 - 報名問卷統計資料</th>
          </tr>
          <tr>
            <th>報名編號</th>
            <th>來源幼稚園</th>
            <th>學生姓名</th>
            <th>學生性別</th>
            <th>現就讀班級</th>
            <th>聯絡電話</th>
            <th>電郵地址</th>
            <th>隨行家長人數</th>
            <th>隨行其他兒童人數</th>
            <th>未來報讀意願</th>
            <th>填寫時間</th>
          </tr>
    `;

    filteredRegistrations.forEach(r => {
      const schoolName = r.schoolType === 'ling-liang' ? '藍田靈糧幼稚園' : '佛教金麗幼稚園';
      html += `
        <tr>
          <td>${r.id}</td>
          <td>${schoolName}</td>
          <td>${r.studentName}</td>
          <td>${r.gender}</td>
          <td>${r.grade}</td>
          <td style="mso-number-format:'\\@';">${r.phone}</td>
          <td>${r.email}</td>
          <td>${r.parentCount} 人</td>
          <td>${r.otherChildrenCount} 人</td>
          <td>${r.willEnroll}</td>
          <td>${r.createdAt}</td>
        </tr>
      `;
    });

    html += `
        </table>
      </body>
      </html>
    `;

    // 建立 Blob 並下載
    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // 檔名加上當前日期
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `西遊記活動日報名統計_${dateStr}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Excel 檔案匯出成功！');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`確定要刪除「${name}」的報名記錄嗎？`)) {
      deleteRegistration(id);
      toast.success('記錄已刪除');
    }
  };

  const handleResetData = () => {
    if (confirm('確定要清空所有報名資料嗎？此操作無法還原。')) {
      clearAll();
      toast.success('已清空所有資料');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 頂部導航 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/')}
              className="mb-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首頁
            </Button>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">問卷資料統計中心</h1>
            <p className="text-slate-500 mt-1">即時整理與分析兩所幼稚園的報名問卷資料</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleResetData}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              重設所有資料
            </Button>
            <Button 
              onClick={handleExportXLS}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              匯出 XLS 報表
            </Button>
          </div>
        </div>

        {/* 數據看板 (Stats Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">總報名學生人數</CardTitle>
              <Users className="w-4 h-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.total} <span className="text-sm font-normal text-slate-500">人</span></div>
              <p className="text-xs text-slate-500 mt-1">包含 K1/K2/K3 學生</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">預估總出席人數</CardTitle>
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.totalAttendees} <span className="text-sm font-normal text-slate-500">人</span></div>
              <p className="text-xs text-slate-500 mt-1">學生: {stats.total} | 家長: {stats.totalParents} | 其他兒童: {stats.totalChildren}</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">藍田靈糧幼稚園</CardTitle>
              <School className="w-4 h-4 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.lingLiangCount} <span className="text-sm font-normal text-slate-500">人</span></div>
              <p className="text-xs text-slate-500 mt-1">佔總報名人數 {stats.total ? Math.round((stats.lingLiangCount / stats.total) * 100) : 0}%</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">佛教金麗幼稚園</CardTitle>
              <School className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.kamLaiCount} <span className="text-sm font-normal text-slate-500">人</span></div>
              <p className="text-xs text-slate-500 mt-1">佔總報名人數 {stats.total ? Math.round((stats.kamLaiCount / stats.total) * 100) : 0}%</p>
            </CardContent>
          </Card>

        </div>

        {/* 視覺化圖表與比例 (Visual Stats Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 班級分佈 */}
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-amber-600" />
                就讀班級 (Grade) 分佈
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {['K1', 'K2', 'K3'].map(g => {
                const count = stats.grades[g as 'K1' | 'K2' | 'K3'];
                const percent = stats.total ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={g} className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-700 font-bold">{g} 班級</span>
                      <span className="text-slate-900">{count} 人 ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div 
                        className="bg-amber-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* 報讀意願分佈 */}
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                未來報讀本校意願分佈
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { key: 'high', label: '很有意願，本校是首選之一', color: 'bg-emerald-500', count: stats.enrollIntent.high },
                { key: 'considering', label: '正在考慮中，希望透過活動加深了解', color: 'bg-amber-500', count: stats.enrollIntent.considering },
                { key: 'neutral', label: '純粹參與活動，暫未有定案', color: 'bg-slate-400', count: stats.enrollIntent.neutral }
              ].map(item => {
                const percent = stats.total ? Math.round((item.count / stats.total) * 100) : 0;
                return (
                  <div key={item.key} className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-700 font-semibold truncate max-w-[280px] md:max-w-xs" title={item.label}>
                        {item.label}
                      </span>
                      <span className="text-slate-900 shrink-0">{item.count} 人 ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div 
                        className={`${item.color} h-3 rounded-full transition-all duration-500`} 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

        </div>

        {/* 篩選與搜尋工具欄 */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* 搜尋框 */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="搜尋姓名、電話、電郵..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-slate-200 focus-visible:ring-amber-500"
                />
              </div>

              {/* 學校篩選 */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <Select value={schoolFilter} onValueChange={setSchoolFilter}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="所有幼稚園" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有幼稚園</SelectItem>
                    <SelectItem value="ling-liang">藍田靈糧幼稚園</SelectItem>
                    <SelectItem value="kam-lai">佛教金麗幼稚園</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 班級篩選 */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="所有班級" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有班級</SelectItem>
                    <SelectItem value="K1">K1</SelectItem>
                    <SelectItem value="K2">K2</SelectItem>
                    <SelectItem value="K3">K3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 意願篩選 */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <Select value={willEnrollFilter} onValueChange={setWillEnrollFilter}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="所有報讀意願" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有報讀意願</SelectItem>
                    <SelectItem value="很有意願，本校是首選之一">很有意願</SelectItem>
                    <SelectItem value="正在考慮中，希望透過活動加深了解">考慮中</SelectItem>
                    <SelectItem value="純粹參與活動，暫未有定案">暫未有定案</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* 報名數據表格 */}
        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">報名名單資料表</CardTitle>
              <CardDescription className="text-sm text-slate-500 mt-1">
                目前篩選出 <span className="font-bold text-amber-600">{filteredRegistrations.length}</span> 筆記錄
              </CardDescription>
            </div>
          </CardHeader>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-bold text-slate-700">編號</TableHead>
                  <TableHead className="font-bold text-slate-700">來源幼稚園</TableHead>
                  <TableHead className="font-bold text-slate-700">學生姓名</TableHead>
                  <TableHead className="font-bold text-slate-700">性別</TableHead>
                  <TableHead className="font-bold text-slate-700">班級</TableHead>
                  <TableHead className="font-bold text-slate-700">聯絡電話</TableHead>
                  <TableHead className="font-bold text-slate-700">電郵地址</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">隨行家長/兒童</TableHead>
                  <TableHead className="font-bold text-slate-700 max-w-[200px]">未來報讀意願</TableHead>
                  <TableHead className="font-bold text-slate-700">登記時間</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-12 text-slate-400">
                      <Info className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      沒有符合篩選條件的報名資料
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRegistrations.map((r) => (
                    <TableRow key={r.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-mono font-bold text-slate-600">{r.id}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                          r.schoolType === 'ling-liang' 
                            ? 'bg-sky-50 text-sky-700 border border-sky-200' 
                            : 'bg-orange-50 text-orange-700 border border-orange-200'
                        }`}>
                          {r.schoolType === 'ling-liang' ? '藍田靈糧' : '佛教金麗'}
                        </span>
                      </TableCell>
                      <TableCell className="font-bold text-slate-900">{r.studentName}</TableCell>
                      <TableCell>{r.gender}</TableCell>
                      <TableCell className="font-semibold">{r.grade}</TableCell>
                      <TableCell className="font-mono">{r.phone}</TableCell>
                      <TableCell className="max-w-[180px] truncate" title={r.email}>{r.email}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-medium">
                          家長: {r.parentCount} | 兒童: {r.otherChildrenCount}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-xs text-slate-600" title={r.willEnroll}>
                        {r.willEnroll}
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs">{r.createdAt}</TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(r.id, r.studentName)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

      </div>
    </div>
  );
}
