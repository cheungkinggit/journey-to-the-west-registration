import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeGeneratorProps {
  url: string;
  title: string;
  fileName: string;
}

export default function QRCodeGenerator({ url, title, fileName }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 256,
          margin: 2,
          color: {
            dark: '#1E293B', // 深藍灰，確保掃描率
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error('Error generating QR Code:', error);
        }
      );
    }
  }, [url]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
      toast.success(`${title} QR Code 下載成功！`);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('連結已複製到剪貼簿！');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('複製失敗，請手動複製。');
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
      <h4 className="font-bold text-slate-800 text-base">{title}</h4>
      
      {/* Canvas 用來繪製 QR Code */}
      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-inner">
        <canvas ref={canvasRef} className="w-44 h-44 md:w-48 md:h-44 object-contain" />
      </div>

      <p className="text-xs text-slate-500 break-all max-w-[240px] px-2" title={url}>
        {url}
      </p>

      <div className="flex flex-col w-full gap-2 pt-2">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopyLink}
            className="flex-1 border-slate-200 hover:bg-slate-100 text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
            {copied ? '已複製' : '複製連結'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(url, '_blank')}
            className="flex-1 border-slate-200 hover:bg-slate-100 text-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            測試開啟
          </Button>
        </div>
        <Button 
          onClick={handleDownload}
          size="sm"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          下載 QR Code 圖片
        </Button>
      </div>
    </div>
  );
}
