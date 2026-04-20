import React, { useState, useMemo, useRef } from 'react';
import { Truck, AlertTriangle, FileText, Info, AlertCircle, Phone, ArrowRight, ArrowUp, ArrowDown, ArrowUpDown, Filter, BookOpen, X, CheckCircle2, Camera } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { GoogleGenAI, Type } from '@google/genai';
import { LISTA_NEGRA, CompanyRecord, Status } from './data';
import { translations, Language } from './i18n';
import { getDinatranReference, DINATRAN_MATRIX } from './dinatran';

const IVA_PERCENT = 0.10;
const MANUTENCAO_TOTAL = 0.1503;
const ADM_DEPREC = 0.1206;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const t = translations[lang];

  const [empresa, setEmpresa] = useState('');
  const [chapa, setChapa] = useState('');
  const [distanciaGps, setDistanciaGps] = useState<number | ''>('');
  const [kmInicial, setKmInicial] = useState<number | ''>('');
  const [kmFinal, setKmFinal] = useState<number | ''>('');
  const [distanciaPapel, setDistanciaPapel] = useState<number | ''>('');
  const [pesoCarga, setPesoCarga] = useState<number | ''>('');
  const [valorFrete, setValorFrete] = useState<number | ''>('');
  const [descontoMermas, setDescontoMermas] = useState<number | ''>('');
  const [nomeMotorista, setNomeMotorista] = useState('');
  const [cedula, setCedula] = useState('');
  
  // Market Data
  const [cotacaoDolar, setCotacaoDolar] = useState<number>(7550);
  const [precoDiesel, setPrecoDiesel] = useState<number>(8500);
  const [consumoDiesel, setConsumoDiesel] = useState<number>(2.5);
  
  const [showGuide, setShowGuide] = useState(false);
  const [showMatriz, setShowMatriz] = useState(false);
  const [showEmpresaSuggestions, setShowEmpresaSuggestions] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Url = event.target?.result as string;
        const base64Data = base64Url.split(',')[1];
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{
              role: 'user',
              parts: [
                  { text: `Extraia dados da Carta de Flete ou Painel de Caminhão anexada. Tente identificar:
- empresa: Nome da Transportadora Emitente 
- ruc: Número do RUC da transportadora se houver
- chapa: Placa ou chapa do veículo trator 
- distanciaPapel: Quilometragem total (distancia) declarada na carta
- odometro: O valor do odômetro lido no painel
- valorFrete: O montante financeiro total do frete pago

Retorne tudo em JSON estrito. Não explique nada.` },
                  { inlineData: { mimeType: file.type, data: base64Data } }
              ]
          }],
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                empresa: { type: Type.STRING },
                ruc: { type: Type.STRING },
                chapa: { type: Type.STRING },
                distanciaPapel: { type: Type.NUMBER },
                odometro: { type: Type.NUMBER },
                valorFrete: { type: Type.NUMBER }
              }
            }
          }
        });
        
        try {
          if (response.text) {
             const data = JSON.parse(response.text);
             if (data.empresa || data.ruc) setEmpresa(`${data.empresa || ''} ${data.ruc ? `(RUC: ${data.ruc})` : ''}`.trim());
             if (data.chapa) setChapa(data.chapa);
             if (data.distanciaPapel) setDistanciaPapel(data.distanciaPapel);
             if (data.valorFrete) setValorFrete(data.valorFrete);
             if (data.odometro) setKmFinal(data.odometro);
          }
        } catch (e) {
            console.error("JSON parse failed", e);
        }
        setIsScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setIsScanning(false);
    }
  };

  const [resultado, setResultado] = useState<any>(null);

  const filteredEmpresas = useMemo(() => {
    if (!empresa.trim()) return LISTA_NEGRA.slice(0, 50);
    const search = empresa.toLowerCase().trim();
    return LISTA_NEGRA.filter(c => 
      c.empresa.toLowerCase().includes(search) || 
      c.ruc.toLowerCase().includes(search)
    ).slice(0, 50);
  }, [empresa]);

  const riskLevel = useMemo(() => {
    if (!empresa || empresa.trim() === '') return null;
    const search = empresa.toLowerCase().trim();
    const match = LISTA_NEGRA.find(c => 
       search.includes(c.empresa.toLowerCase()) || 
       search.includes(c.ruc.toLowerCase()) || 
       c.empresa.toLowerCase().includes(search) || 
       c.ruc.toLowerCase().includes(search)
    );
    
    if (match) {
      if (match.status === 'Risco Crítico') return { level: 'CRITICO', infracoes: match.infracoes };
      return { level: 'ATENCAO', infracoes: match.infracoes };
    }
    return { level: 'REGULAR', infracoes: 0 };
  }, [empresa]);

  // Table State
  const [sortField, setSortField] = useState<keyof CompanyRecord>('infracoes');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<'All' | Status>('All');

  // Table Logic
  const filteredAndSortedList = useMemo(() => {
    let result = LISTA_NEGRA;
    if (filterStatus !== 'All') {
      result = result.filter(item => item.status === filterStatus);
    }
    result = [...result].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [sortField, sortDirection, filterStatus]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredAndSortedList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  const handleSort = (field: keyof CompanyRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: keyof CompanyRecord) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="opacity-40" />;
    return sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  const formatCurrency = (value: number) => {
    return `₲ ${value.toLocaleString('es-PY', { maximumFractionDigits: 0 })}`;
  };

  const handleAuditar = () => {
    if (!distanciaGps || !distanciaPapel || !valorFrete || !chapa) return;

    const dGps = Number(distanciaGps);
    const dPapel = Number(distanciaPapel);
    const vFrete = Number(valorFrete);
    const mermas = Number(descontoMermas) || 0;

    const vFreteDescontado = vFrete - mermas; // Valor líquido recebido após descontos

    const dinatranRef = getDinatranReference(dGps);
    const costoRefGps = dinatranRef.costoPorKm; 
    
    const kmRoubado = dGps - dPapel;
    const prejuizoKm = kmRoubado * costoRefGps;
    
    // Total reference cost for the whole trip length
    const custoMinimoLegal = dinatranRef.costoTotal;
    
    const descontoIva = vFreteDescontado * IVA_PERCENT;
    const descontoManut = vFreteDescontado * MANUTENCAO_TOTAL;
    const descontoAdm = vFreteDescontado * ADM_DEPREC;
    
    // Improved Fuel Calculation
    const custoDieselEstimado = precoDiesel && consumoDiesel 
      ? (dGps / consumoDiesel) * precoDiesel 
      : dGps * (costoRefGps * 0.4557);
    
    const lucroFinal = vFreteDescontado - descontoIva - descontoManut - descontoAdm - custoDieselEstimado;

    setResultado({
      kmRoubado,
      prejuizoKm,
      custoMinimoLegal,
      descontoIva,
      descontoManut,
      descontoAdm,
      custoDieselEstimado,
      lucroFinal,
      lucroFinalDolar: lucroFinal / cotacaoDolar,
      vFrete: vFreteDescontado, 
      vFreteBruto: vFrete,
      mermas,
      dGps,
      dPapel,
      empresa,
      chapa
    });
  };

  return (
    <div className="flex min-h-screen md:h-screen bg-[#f8fafc] text-[#1e293b] font-sans md:overflow-hidden flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-[360px] bg-[#0f172a] text-[#f8fafc] flex flex-col border-r border-[#e2e8f0] flex-shrink-0 h-auto md:h-full overflow-hidden">
        <div className="p-6 border-b border-[#1e293b]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="m-0 text-lg font-bold text-[#38bdf8] flex items-center gap-2">
                <Truck size={20} />
                {t.appTitle}
              </h2>
              <p className="m-0 mt-1 text-xs opacity-70 mb-0">{t.appSubtitle}</p>
            </div>
            <div className="flex bg-[#1e293b] rounded-md p-0.5 border border-[#334155] h-fit">
              <button onClick={() => setLang('pt')} className={`px-2 py-1 text-[10px] font-bold rounded-sm transition-colors ${lang === 'pt' ? 'bg-[#38bdf8] text-[#0f172a]' : 'text-[#94a3b8] hover:text-white'}`}>PT</button>
              <button onClick={() => setLang('es')} className={`px-2 py-1 text-[10px] font-bold rounded-sm transition-colors ${lang === 'es' ? 'bg-[#38bdf8] text-[#0f172a]' : 'text-[#94a3b8] hover:text-white'}`}>ES</button>
            </div>
          </div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col h-[400px] md:h-auto overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-[0.05em] text-[#94a3b8] flex items-center gap-2 m-0">
              <AlertTriangle size={16} /> {t.listaNegra}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
              <Filter size={14}/>
              <select 
                className="bg-[#1e293b] text-white border border-[#334155] rounded px-1.5 py-1 text-xs focus:ring-1 focus:ring-[#38bdf8] outline-none cursor-pointer"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value as 'All' | Status)}
              >
                <option value="All">{t.todos}</option>
                <option value="Risco Crítico">{t.riscoCritico}</option>
                <option value="Sob Investigação">{t.sobInvestigacao}</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col flex-grow bg-[#1e293b] rounded-md border border-[#334155] overflow-hidden">
             {/* Table Header */}
             <div className="grid grid-cols-[3fr_2fr_3fr] gap-2 p-3 bg-[#0f172a] border-b border-[#334155] text-[10px] uppercase text-[#94a3b8] font-bold select-none">
               <div className="cursor-pointer flex items-center gap-1 hover:text-white transition-colors truncate" onClick={() => handleSort('empresa')}>
                 {t.empresa} {getSortIcon('empresa')}
               </div>
               <div className="cursor-pointer flex items-center gap-1 justify-end hover:text-white transition-colors" onClick={() => handleSort('infracoes')}>
                 {t.infracoes} {getSortIcon('infracoes')}
               </div>
               <div className="cursor-pointer flex items-center gap-1 pl-2 hover:text-white transition-colors truncate" onClick={() => handleSort('status')}>
                 {t.status} {getSortIcon('status')}
               </div>
             </div>

             {/* Virtualized Body */}
             <div ref={parentRef} className="flex-grow overflow-auto relative custom-scrollbar">
               <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                 {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                   const item = filteredAndSortedList[virtualRow.index];
                   return (
                     <div
                       key={virtualRow.key}
                       data-index={virtualRow.index}
                       ref={rowVirtualizer.measureElement}
                       className="absolute top-0 left-0 w-full grid grid-cols-[3fr_2fr_3fr] gap-2 p-3 border-b border-[#334155]/50 items-center hover:bg-[#334155]/30 transition-colors"
                       style={{ 
                         transform: `translateY(${virtualRow.start}px)` 
                       }}
                     >
                       <div className="text-[12px] font-medium truncate pr-1" title={item.empresa}>{item.empresa}</div>
                       <div className="text-[11px] opacity-80 text-right">{item.infracoes === 0 ? '--' : item.infracoes}</div>
                       <div className="pl-2 flex overflow-hidden">
                         <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide truncate ${item.status === 'Risco Crítico' ? 'bg-[#fee2e2]/10 text-[#fca5a5]' : 'bg-[#fef3c7]/10 text-[#fcd34d]'}`} title={item.status}>
                           {item.status === 'Risco Crítico' ? t.riscoCritico : t.sobInvestigacao}
                         </span>
                       </div>
                     </div>
                   );
                 })}
                 {filteredAndSortedList.length === 0 && (
                   <div className="absolute top-0 left-0 w-full p-4 text-center text-xs text-[#94a3b8] opacity-70">
                     {t.nenhumRegistro}
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-[#1e293b] text-[11px] opacity-70 flex-shrink-0 flex flex-col gap-2">
          <div>⚖️ <strong className="text-[#38bdf8]">Decreto 5.791:</strong> {t.lblDecreto5791}</div>
          <div>📄 <strong className="text-[#38bdf8]">Decreto 2.327:</strong> {t.lblDecreto2327}</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-5 md:p-8 md:overflow-y-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="m-0 text-2xl md:text-[28px] font-extrabold text-[#1e293b] tracking-tight">{t.mainTitle}</h1>
            <p className="m-0 mt-1 text-[#64748b] text-sm md:text-base">{t.mainDesc}</p>
          </div>
          <button 
            onClick={() => setShowGuide(!showGuide)} 
            className="flex items-center gap-2 bg-[#1e40af]/10 text-[#1e40af] px-4 py-2.5 rounded-lg font-bold hover:bg-[#1e40af]/20 transition-colors border border-[#1e40af]/20 whitespace-nowrap"
          >
            <BookOpen size={18} />
            {showGuide ? t.btnGuideHide : t.btnGuide}
          </button>
        </div>

        {showGuide && (
          <div className="bg-white border border-[#38bdf8]/30 shadow-lg rounded-xl p-6 mb-6 relative animate-in fade-in slide-in-from-top-4 duration-300">
            <button onClick={() => setShowGuide(false)} className="absolute top-4 right-4 text-[#94a3b8] hover:text-[#1e293b]"><X size={20} /></button>
            <h2 className="text-lg font-extrabold text-[#1e293b] flex items-center gap-2 mb-4 border-b border-[#e2e8f0] pb-3">
              <Truck size={22} className="text-[#38bdf8]" /> {t.guideTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] text-[#475569]">
              <div>
                <h4 className="font-bold text-[#b91c1c] text-[14px] mb-1">{t.guide1Title}</h4>
                <p>{t.guide1Desc}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#1e40af] text-[14px] mb-1">{t.guide2Title}</h4>
                <p>{t.guide2Desc}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#f59e0b] text-[14px] mb-1">{t.guide3Title}</h4>
                <p>{t.guide3Desc}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#10b981] text-[14px] mb-1">{t.guide4Title}</h4>
                <p>{t.guide4Desc}</p>
              </div>
            </div>
          </div>
        )}

        {resultado && resultado.vFrete < resultado.custoMinimoLegal && (
          <div className="bg-[#fee2e2] border border-[#fecaca] text-[#991b1b] p-4 rounded-md flex items-center gap-3 mb-6 shadow-sm">
            <div className="bg-[#ef4444] min-w-[40px] min-h-[40px] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              !
            </div>
            <div>
              <div className="font-bold text-sm md:text-base mb-0.5">{t.alertIlegalTitle}</div>
              <div className="text-[13px] md:text-sm opacity-90">{t.alertIlegalDesc}</div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.5fr] gap-6 flex-grow items-start">
          
          {/* Card Form */}
          <section className="bg-white border border-[#e2e8f0] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-5 w-full">
            
            {/* Market Data Config */}
            <div className="mb-6 p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-3 flex items-center gap-2">
                <BookOpen size={14} className="text-[#1e40af]" />
                {t.marketTitle}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#64748b] mb-1 uppercase">{t.marketDolar}</label>
                  <input 
                    type="number" 
                    className="w-full p-2 bg-white border border-[#cbd5e1] rounded text-[12px] focus:ring-1 focus:ring-[#1e40af] outline-none font-semibold"
                    value={cotacaoDolar}
                    onChange={(e) => setCotacaoDolar(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#64748b] mb-1 uppercase">{t.marketDiesel}</label>
                  <input 
                    type="number" 
                    className="w-full p-2 bg-white border border-[#cbd5e1] rounded text-[12px] focus:ring-1 focus:ring-[#1e40af] outline-none font-semibold"
                    value={precoDiesel}
                    onChange={(e) => setPrecoDiesel(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#64748b] mb-1 uppercase">{t.marketConsumo}</label>
                  <input 
                    type="number" 
                    className="w-full p-2 bg-white border border-[#cbd5e1] rounded text-[12px] focus:ring-1 focus:ring-[#1e40af] outline-none font-semibold"
                    value={consumoDiesel}
                    step="0.1"
                    onChange={(e) => setConsumoDiesel(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* AI Scanner Header */}
             <div className="mb-6 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] rounded-xl p-4 text-white shadow-[0_4px_12px_rgba(30,64,175,0.15)] relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                 <div className="flex items-center gap-3">
                   <div className="bg-white/20 p-2.5 rounded-lg border border-white/30 backdrop-blur-sm shrink-0">
                     <Camera size={22} className="text-white drop-shadow-md" />
                   </div>
                   <div>
                     <h3 className="font-bold text-[15px] m-0 tracking-wide text-white drop-shadow-sm flex gap-1.5 items-center">{t.scannerTitle}</h3>
                     <p className="text-[12px] text-blue-50 m-0 mt-0.5 max-w-sm drop-shadow-sm leading-snug">{t.scannerDesc}</p>
                   </div>
                 </div>
                 
                 <label className={`w-full md:w-auto bg-white text-[#1e40af] px-4 py-2.5 rounded-lg font-bold text-[13px] ${isScanning ? 'opacity-80 cursor-wait' : 'cursor-pointer hover:bg-blue-50 hover:shadow-lg transition-all scale-100 active:scale-95'} shadow-sm whitespace-nowrap flex items-center justify-center gap-2 group border-b-[3px] border-blue-200`}>
                   {isScanning ? (
                     <span className="flex items-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-[#1e40af]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       {t.scannerUploading}
                     </span>
                   ) : (
                     <span className="flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                       {t.scannerBtn}
                     </span>
                   )}
                   <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageUpload} disabled={isScanning} />
                 </label>
               </div>
               {/* Decorators */}
               <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-[#0f172a]/20 rounded-full blur-xl pointer-events-none"></div>
             </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">
                <div className="relative">
                  <label className="block text-[13px] font-semibold mb-1.5 text-[#475569]">{t.inputTransportadora}</label>
                  <input 
                    type="text" 
                    className="w-full p-2.5 border border-[#cbd5e1] rounded text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    onFocus={() => setShowEmpresaSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowEmpresaSuggestions(false), 200)}
                    placeholder={t.inputSearch}
                  />
                  {showEmpresaSuggestions && filteredEmpresas.length > 0 && (
                    <ul className="absolute z-20 w-full bg-white border border-[#cbd5e1] mt-1 rounded-md shadow-lg max-h-48 overflow-auto custom-scrollbar">
                      {filteredEmpresas.map(s => (
                        <li 
                          key={s.id}
                          onMouseDown={() => {
                            setEmpresa(`${s.empresa} (RUC: ${s.ruc})`);
                            setShowEmpresaSuggestions(false);
                          }}
                          className="p-2.5 hover:bg-[#f1f5f9] cursor-pointer border-b border-[#e2e8f0] text-sm last:border-0"
                        >
                          <div className="font-semibold text-[#1e293b] truncate text-[13px]">{s.empresa}</div>
                          <div className="text-[11px] text-[#64748b] mt-0.5 flex items-center gap-2">
                            <span>RUC: {s.ruc}</span>
                            {s.status === 'Risco Crítico' && <span className="text-[#ef4444] font-bold">⚠️ Risco Crítico</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {riskLevel && (
                    <div className={`mt-2 p-2.5 rounded border text-[11px] flex gap-2 items-start ${riskLevel.level === 'CRITICO' ? 'bg-[#fee2e2] border-[#fecaca] text-[#b91c1c]' : riskLevel.level === 'ATENCAO' ? 'bg-[#fef3c7] border-[#fde68a] text-[#92400e]' : 'bg-[#ecfdf5] border-[#d1fae5] text-[#065f46]'}`}>
                      {riskLevel.level === 'CRITICO' && <AlertCircle className="shrink-0 mt-0.5" size={14} />}
                      {riskLevel.level === 'ATENCAO' && <AlertTriangle className="shrink-0 mt-0.5" size={14} />}
                      {riskLevel.level === 'REGULAR' && <CheckCircle2 className="shrink-0 mt-0.5" size={14} />}
                      <div>
                        {riskLevel.level === 'CRITICO' && <span><strong className="block mb-0.5">{t.alertaCritico} ({riskLevel.infracoes} {t.infracoes.toLowerCase()})</strong>{t.alertaMassivo}</span>}
                        {riskLevel.level === 'ATENCAO' && <span><strong className="block mb-0.5">{t.alertaAtencao} ({riskLevel.infracoes} {t.infracoes.toLowerCase()})</strong>{t.alertaIrregularidades}</span>}
                        {riskLevel.level === 'REGULAR' && <span><strong className="block mb-0.5">{t.alertaRegular}</strong>{t.alertaSemRegistros}</span>}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5 text-[#475569]">{t.inputChapa}</label>
                  <input 
                    type="text" 
                    className="w-full p-2.5 border border-[#cbd5e1] rounded text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors uppercase"
                    value={chapa}
                    onChange={(e) => setChapa(e.target.value)}
                    placeholder="ABC 123"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5 text-[#475569]">{t.inputDistanciaReal}</label>
                  <input 
                    type="number" 
                    className="w-full p-2.5 border border-[#cbd5e1] rounded text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    value={distanciaGps}
                    onChange={(e) => setDistanciaGps(Number(e.target.value) || '')}
                    min="1"
                    placeholder="Ex: 350 km"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5 text-[#475569]">{t.inputDistanciaDoc}</label>
                  <input 
                    type="number" 
                    className="w-full p-2.5 border border-[#cbd5e1] rounded text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    value={distanciaPapel}
                    onChange={(e) => setDistanciaPapel(Number(e.target.value) || '')}
                    min="1"
                    placeholder="Ex: 350 km"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold mb-1.5 text-[#475569]">{t.inputPeso}</label>
                <input 
                  type="number" 
                  className="w-full p-2.5 border border-[#cbd5e1] rounded text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                  value={pesoCarga}
                  onChange={(e) => setPesoCarga(Number(e.target.value) || '')}
                  min="1"
                  step="0.1"
                  placeholder="0.0"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5 text-[#475569]">{t.inputValor}</label>
                  <input 
                    type="number" 
                    className="w-full p-2.5 border border-[#cbd5e1] rounded text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    value={valorFrete}
                    onChange={(e) => setValorFrete(Number(e.target.value) || '')}
                    min="1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5 text-[#475569]">{t.inputMermas || 'Descontos Carga (Mermas) ₲'}</label>
                  <input 
                    type="number" 
                    className="w-full p-2.5 border border-[#cbd5e1] rounded text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    value={descontoMermas}
                    onChange={(e) => setDescontoMermas(Number(e.target.value) || '')}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <button 
                onClick={() => setShowMatriz(true)}
                className="w-full mb-3 flex items-center justify-center gap-2 py-3 px-4 rounded border-2 border-[#1e40af] text-[#1e40af] font-bold hover:bg-[#eff6ff] transition-colors text-[13px] uppercase"
              >
                <BookOpen size={18} />
                {t.btnVerMatriz}
              </button>

              <button 
                onClick={handleAuditar}
                disabled={!distanciaGps || !distanciaPapel || !valorFrete || !chapa}
                className="w-full mt-2 bg-[#1e40af] hover:bg-[#1e3a8a] text-white py-3.5 px-4 rounded font-semibold cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase text-[14px]"
              >
                {t.btnAuditar}
              </button>
            </div>
          </section>

          {/* Results Display */}
          {resultado && (
            <section className="flex flex-col gap-4 w-full">
              <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-5 flex flex-col h-full">
                <h3 className="m-0 mb-4 text-[14px] flex items-center gap-2 uppercase tracking-[0.05em] font-bold text-[#64748b]">
                  📋 {t.resTitle}
                  {resultado.lucroFinal < 0 && <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase bg-[#fee2e2] text-[#b91c1c] tracking-wide ml-2">{t.resPrejuizoBadge}</span>}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <div className="p-4 rounded-md border-l-4 border-[#1e40af] bg-[#eff6ff] sm:col-span-2">
                    <div className="text-[11px] text-[#64748b] uppercase tracking-[0.05em] font-bold">{t.resLiquido} (Livre)</div>
                    <div className={`text-2xl md:text-3xl font-bold mt-1 ${resultado.lucroFinal < 0 ? 'text-[#dc2626]' : 'text-[#1e293b]'}`}>
                      {formatCurrency(resultado.lucroFinal)}
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-md sm:col-span-2 overflow-hidden text-sm mt-2">
                    <div className="bg-[#f1f5f9] px-4 py-2 border-b border-[#e2e8f0] font-bold text-[#475569] uppercase text-[11px] tracking-wide">
                      {t.resTabela || 'Tabela Comparativa de Frete'}
                    </div>
                    <div className="flex justify-between items-center px-4 py-3 border-b border-[#e2e8f0]">
                      <span className="text-[#64748b]">{t.resMatrizRef || 'Matriz de Custos (Ref.'} {resultado.dGps}km):</span>
                      <strong className="text-[#10b981]">{formatCurrency(resultado.custoMinimoLegal)}</strong>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3 border-b border-[#e2e8f0]">
                      <span className="text-[#64748b]">{t.resFreteOfertado || 'Valor Bruto Ofertado:'}</span>
                      <strong className="text-[#1e293b]">{formatCurrency(resultado.vFreteBruto)}</strong>
                    </div>
                    {resultado.mermas > 0 && (
                      <div className="flex justify-between items-center px-4 py-3 border-b border-[#e2e8f0]">
                        <span className="text-[#ef4444]">{t.resMermas || 'Descontos Carga (Mermas):'}</span>
                        <strong className="text-[#ef4444]">- {formatCurrency(resultado.mermas)}</strong>
                      </div>
                    )}
                    <div className="flex justify-between items-center px-4 py-3 bg-[#fef2f2]">
                      <span className="text-[#991b1b] font-bold">{t.resDiferenca || 'Diferencia Mínimo Legal:'}</span>
                      <strong className="text-[#b91c1c]">
                        {formatCurrency(resultado.vFrete - resultado.custoMinimoLegal)}
                      </strong>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-md sm:col-span-2 overflow-hidden text-sm mt-1">
                    <div className="bg-[#f1f5f9] px-4 py-2 border-b border-[#e2e8f0] font-bold text-[#475569] uppercase text-[11px] tracking-wide">
                      {t.resCustosTitle}
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#e2e8f0]">
                      <span className="text-[#64748b]">{t.resCustosDiesel}:</span>
                      <span className="text-[#1e293b] font-medium">{formatCurrency(resultado.custoDieselEstimado)}</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#e2e8f0]">
                      <span className="text-[#64748b]">{t.resCustosManut}:</span>
                      <span className="text-[#1e293b] font-medium">{formatCurrency(resultado.descontoManut)}</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#e2e8f0]">
                      <span className="text-[#64748b]">{t.resCustosAdm}:</span>
                      <span className="text-[#1e293b] font-medium">{formatCurrency(resultado.descontoAdm)}</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#e2e8f0]">
                      <span className="text-[#64748b]">{t.resCustosIva}:</span>
                      <span className="text-[#1e293b] font-medium">{formatCurrency(resultado.descontoIva)}</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3 bg-[#f8fafc] font-bold">
                      <span className="text-[#475569] uppercase text-[11px]">{t.resCustosTotal}:</span>
                      <span className="text-[#dc2626]">
                        {formatCurrency(resultado.custoDieselEstimado + resultado.descontoManut + resultado.descontoAdm + resultado.descontoIva)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-md border-l-4 border-[#f59e0b] bg-[#fffbeb]">
                    <div className="text-[11px] text-[#64748b] uppercase tracking-[0.05em] font-bold">{t.resKmRoubado}</div>
                    <div className="text-xl md:text-2xl font-bold mt-1 text-[#1e293b]">
                      {resultado.kmRoubado > 0 ? `${resultado.kmRoubado} km` : '0 km'}
                    </div>
                  </div>

                  <div className="p-4 rounded-md border-l-4 border-[#10b981] bg-[#ecfdf5]">
                    <div className="text-[11px] text-[#64748b] uppercase tracking-[0.05em] font-bold">{t.resLucroDolar}</div>
                    <div className={`text-xl md:text-2xl font-bold mt-1 ${resultado.lucroFinal < 0 ? 'text-[#dc2626]' : 'text-[#1e293b]'}`}>
                      $ {resultado.lucroFinalDolar.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="p-4 rounded-md border-l-4 border-[#6366f1] bg-[#eef2ff]">
                    <div className="text-[11px] text-[#64748b] uppercase tracking-[0.05em] font-bold">{t.resDepreciação} / Manut.</div>
                    <div className="text-xl md:text-2xl font-bold mt-1 text-[#1e293b]">
                      {formatCurrency(resultado.descontoAdm + resultado.descontoManut)}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-[#e2e8f0] flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      {resultado.lucroFinal < 0 ? (
                        <>
                          <div className="text-[12px] font-bold text-[#b91c1c] uppercase mb-0.5 tracking-wide">{t.vereditoTitle}</div>
                          <div className="text-[14px] font-medium text-[#1e293b]">{t.vereditoNegativo}</div>
                        </>
                      ) : (
                        <>
                          <div className="text-[12px] font-bold text-[#10b981] uppercase mb-0.5 tracking-wide">{t.vereditoTitle}</div>
                          <div className="text-[14px] font-medium text-[#1e293b]">{t.vereditoPositivo}</div>
                        </>
                      )}
                    </div>
                  </div>

                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 text-left rounded-md mt-4">
                      
                      <h4 className="font-bold text-[#0f172a] mb-3 flex items-center gap-2 text-[14px] uppercase border-b border-[#e2e8f0] pb-2">
                        <Camera size={16} /> {t.chkTitle}
                      </h4>
                      <p className="text-[12px] text-[#475569] mb-3 leading-relaxed">
                        {t.chkDesc}
                      </p>
                      
                      <ul className="text-[13px] text-[#334155] space-y-2.5 mb-4">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-[#10b981] shrink-0 mt-0.5" />
                          <span><strong>Foto 1:</strong> {t.chk1}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-[#10b981] shrink-0 mt-0.5" />
                          <span><strong>Foto 2:</strong> {t.chk2}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-[#10b981] shrink-0 mt-0.5" />
                          <span><strong>Dados:</strong> {t.chk3}</span>
                        </li>
                      </ul>

                      <div className="bg-[#fef2f2] border-l-4 border-[#ef4444] p-3.5 rounded-r-md mb-5 flex gap-3 items-start shadow-sm mt-5">
                        <AlertCircle size={20} className="text-[#ef4444] shrink-0 mt-0.5" />
                        <div className="text-[12px] leading-relaxed text-[#7f1d1d]">
                          <strong className="block mb-1 uppercase text-[#991b1b] text-[13px]">{t.avisoSeguranca}</strong> 
                          {t.avisoDesc}
                        </div>
                      </div>
                    
                      <div className="bg-[#f1f5f9] p-4 rounded-lg border border-[#e2e8f0]">
                        <h4 className="font-bold text-[#b91c1c] mb-2 flex items-center gap-2 text-[14px] uppercase"><AlertTriangle size={16} /> {t.denunciaTitle}</h4>
                        <p className="text-[13px] text-[#475569] mb-3">{t.denunciaDesc}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 bg-white border border-[#cbd5e1] p-3 rounded shadow-sm">
                          <div>
                            <label className="block text-[12px] font-semibold mb-1 text-[#475569]">{t.inputNome || 'Nome do Denunciante/Motorista'}</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border border-[#cbd5e1] rounded text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1e40af]"
                              value={nomeMotorista}
                              onChange={(e) => setNomeMotorista(e.target.value)}
                              placeholder="João da Silva"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold mb-1 text-[#475569]">{t.inputCedula || 'Número da Cédula / Doc'}</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border border-[#cbd5e1] rounded text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1e40af]"
                              value={cedula}
                              onChange={(e) => setCedula(e.target.value)}
                              placeholder="1234567"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 bg-white border border-[#cbd5e1] p-3 rounded shadow-sm">
                          <div>
                            <label className="block text-[12px] font-semibold mb-1 text-[#475569]">{t.inputOdInicial}</label>
                            <input 
                              type="number" 
                              className="w-full p-2 border border-[#cbd5e1] rounded text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1e40af]"
                              value={kmInicial}
                              onChange={(e) => setKmInicial(Number(e.target.value) || '')}
                              placeholder="Ex: 120500"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold mb-1 text-[#475569]">{t.inputOdFinal}</label>
                            <input 
                              type="number" 
                              className="w-full p-2 border border-[#cbd5e1] rounded text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1e40af]"
                              value={kmFinal}
                              onChange={(e) => setKmFinal(Number(e.target.value) || '')}
                              placeholder="Ex: 120850"
                            />
                          </div>
                        </div>

                        {kmInicial === '' || kmFinal === '' || Number(kmFinal) <= Number(kmInicial) || !nomeMotorista || !cedula ? (
                          <button 
                            disabled
                            className="w-full bg-[#cbd5e1] text-[#64748b] px-5 py-3.5 rounded font-bold cursor-not-allowed flex items-center justify-center gap-2 text-[14px] uppercase border border-[#94a3b8] shadow-sm"
                          >
                            <Phone size={18} />
                            {t.btnPreenchaOd}
                          </button>
                        ) : (
                          <a 
                            href={`https://wa.me/595962352235?text=${encodeURIComponent(t.generateWhatsApp(resultado.empresa, resultado.chapa, kmInicial, kmFinal, resultado.dGps, resultado.dPapel, resultado.vFrete, resultado.lucroFinal, nomeMotorista, cedula))}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full bg-[#25d366] hover:bg-[#20bd5a] text-white px-5 py-4 rounded font-bold cursor-pointer shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-[14px]"
                          >
                            <Phone size={20} fill="currentColor" className="animate-pulse" />
                            {t.btnEnviarDossie}
                          </a>
                        )}
                      </div>
                    </div>
                </div>
              </div>
            </section>
          )}

        </div>

        <footer className="mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center text-[12px] text-[#94a3b8] border-t border-[#e2e8f0] opacity-80 gap-2">
          <div className="text-center sm:text-left">{t.footerTxt}</div>
          <div className="font-medium text-center sm:text-right">{t.footerAss}</div>
        </footer>

        {/* Modal Matriz de Custos */}
        {showMatriz && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-[#e2e8f0] flex justify-between items-center bg-[#1e40af] text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Truck size={20} /> {t.modalMatrizTitle}
                </h3>
                <button 
                  onClick={() => setShowMatriz(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 bg-[#f8fafc]">
                <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left text-[13px] border-collapse">
                    <thead className="bg-[#f1f5f9] text-[#475569] font-bold sticky top-0">
                      <tr>
                        <th className="p-3 border-b border-[#e2e8f0]">{t.modalMatrizKm}</th>
                        <th className="p-3 border-b border-[#e2e8f0] text-right">{t.modalMatrizBase}</th>
                        <th className="p-3 border-b border-[#e2e8f0] text-center">{t.modalMatrizCoeff}</th>
                        <th className="p-3 border-b border-[#e2e8f0] text-right text-[#1e40af]">{t.modalMatrizLegal}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0]">
                      {DINATRAN_MATRIX.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                          <td className="p-3 font-medium text-[#1e293b]">{row.km} km</td>
                          <td className="p-3 text-right text-[#64748b]">{row.base.toLocaleString('es-PY')}</td>
                          <td className="p-3 text-center text-[#64748b]">{row.coeff.toFixed(2)}</td>
                          <td className="p-3 text-right font-bold text-[#1e40af]">
                            ₲ {(row.base * row.coeff).toLocaleString('es-PY')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="p-4 bg-[#f1f5f9] border-t border-[#e2e8f0] text-[11px] text-[#64748b] leading-relaxed italic">
                * Referencial conforme Decreto nº 5.791/2021 (Matriz de Custos Operativos da DINATRAN). Valores sujeitos a atualização conforme legislação vigente.
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
