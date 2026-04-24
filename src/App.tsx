import React, { useState, useMemo, useRef, useDeferredValue, useEffect } from 'react';
import { Truck, AlertTriangle, FileText, Info, AlertCircle, Phone, ArrowRight, ArrowUp, ArrowDown, ArrowUpDown, Filter, BookOpen, X, CheckCircle2, Camera, Download, ChevronDown, ChevronUp, WifiOff } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { LISTA_NEGRA, TRANSPORTADORAS_VIGENTES, CompanyRecord, Status } from './data';
import { translations, Language } from './i18n';
import { getDinatranReference, DINATRAN_MATRIX } from './dinatran';

const IVA_PERCENT = 0.10;
const MANUTENCAO_TOTAL = 0.1503;
const ADM_DEPREC = 0.1206;

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const t = translations[lang];

  const [expandedManut, setExpandedManut] = useState(false);
  const [expandedAdm, setExpandedAdm] = useState(false);
  const [expandedSalarios, setExpandedSalarios] = useState(false);

  const [empresa, setEmpresa] = useState('');
  const [chapa, setChapa] = useState('');
  const [distanciaGps, setDistanciaGps] = useState<number | ''>('');
  const [kmInicial, setKmInicial] = useState<number | ''>('');
  const [kmFinal, setKmFinal] = useState<number | ''>('');
  const [distanciaPapel, setDistanciaPapel] = useState<number | ''>('');
  const [pesoCarga, setPesoCarga] = useState<number | ''>('');
  const [valorFrete, setValorFrete] = useState<number | ''>('');
  const [descontoMermas, setDescontoMermas] = useState<number | ''>('');
  const [diasEstadia, setDiasEstadia] = useState<number | ''>('');
  const [nomeMotorista, setNomeMotorista] = useState('');
  const [cedula, setCedula] = useState('');
  
  const deferredEmpresa = useDeferredValue(empresa);

  // Market Data
  const [cotacaoDolar, setCotacaoDolar] = useState<number>(7550);
  const [precoDiesel, setPrecoDiesel] = useState<number>(8500);
  const [consumoDiesel, setConsumoDiesel] = useState<number>(2.5);
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [showGuide, setShowGuide] = useState(false);
  const [showMatriz, setShowMatriz] = useState(false);
  const [showEmpresaSuggestions, setShowEmpresaSuggestions] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  
  const printRef = useRef<HTMLDivElement>(null);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsExportingPDF(true);
    try {
      // Allow React to re-render in expanded export state
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, windowWidth: 800 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfPageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfPageHeight;
      }
      
      pdf.save(`Auditoria-Frete-${chapa || 'Legal'}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF', err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const [resultado, setResultado] = useState<any>(null);

  const allEmpresas = useMemo(() => {
    // Deduplicate by RUC. We want LISTA_NEGRA to take precedence if there are duplicates.
    const map = new Map<string, CompanyRecord>();
    
    // Base regulars
    TRANSPORTADORAS_VIGENTES.forEach(c => map.set(c.ruc, c));
    
    // Negatives override
    LISTA_NEGRA.forEach(c => map.set(c.ruc, c));
    
    return Array.from(map.values());
  }, []);

  const filteredEmpresas = useMemo(() => {
    if (!deferredEmpresa.trim()) return allEmpresas.slice(0, 50);
    const search = deferredEmpresa.toLowerCase().trim();
    return allEmpresas.filter(c => 
      c.empresa.toLowerCase().includes(search) || 
      c.ruc.toLowerCase().includes(search) ||
      search.includes(c.ruc.toLowerCase())
    ).slice(0, 50);
  }, [deferredEmpresa, allEmpresas]);

  const riskLevel = useMemo(() => {
    if (!deferredEmpresa || deferredEmpresa.trim() === '') return null;
    const search = deferredEmpresa.toLowerCase().trim();
    
    // First try an exact match by RUC if the user selected from the dropdown "(RUC: 12345)"
    const rucMatch = deferredEmpresa.match(/\(RUC:\s*([\d\.-]+)\)/i);
    let match;
    
    if (rucMatch) {
       match = allEmpresas.find(c => c.ruc === rucMatch[1]);
    }

    if (!match) {
      match = allEmpresas.find(c => 
         c.empresa.toLowerCase().includes(search) || 
         c.ruc.toLowerCase().includes(search) ||
         search.includes(c.ruc.toLowerCase())
      );
    }
    
    if (match) {
      if (match.status === 'Risco Crítico') return { level: 'CRITICO', infracoes: match.infracoes };
      if (match.status === 'Sob Investigação') return { level: 'ATENCAO', infracoes: match.infracoes };
      return { level: 'REGULAR', infracoes: 0 };
    }
    return { level: 'REGULAR', infracoes: 0 };
  }, [deferredEmpresa, allEmpresas]);

  // Table State
  const [sortField, setSortField] = useState<keyof CompanyRecord>('infracoes');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<'All' | Status>('All');

  // Table Logic
  const filteredAndSortedList = useMemo(() => {
    let result = allEmpresas;
    if (filterStatus !== 'All') {
      result = result.filter(item => item.status === filterStatus);
    } else {
      // If 'All', show only the true "Lista Negra" (greater than 0 infractions)
      result = result.filter(item => item.infracoes > 0);
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
    overscan: 10,
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
    const prejuizoKm = kmRoubado > 0 ? kmRoubado * 7663 : 0;
    
    // Total reference cost for the whole trip length
    const custoMinimoLegal = dinatranRef.costoTotal;
    
    const descontoIva = vFrete * IVA_PERCENT;
    
    // As per new legal directive
    const descontoDiesel = custoMinimoLegal * 0.4557;
    const descontoManut = custoMinimoLegal * 0.1503;
    const descontoAdm = custoMinimoLegal * 0.1206; // PPET 5.79% + PPCA 6.27%
    const descontoPedagios = custoMinimoLegal * 0.0821;
    const descontoSalarios = custoMinimoLegal * 0.1913;
    
    const custoEstadia = Number(diasEstadia) > 0 ? (custoMinimoLegal * 0.1652 * Number(diasEstadia)) : 0;
    
    const mermasIsAbusive = mermas > (vFrete * 0.005);
    
    const lucroFinal = vFreteDescontado - descontoIva - custoMinimoLegal - custoEstadia;

    setResultado({
      kmRoubado,
      prejuizoKm,
      custoMinimoLegal,
      descontoIva,
      descontoManut,
      descontoAdm,
      descontoPedagios,
      descontoSalarios,
      custoDieselEstimado: descontoDiesel,
      custoEstadia,
      lucroFinal,
      lucroFinalDolar: lucroFinal / cotacaoDolar,
      vFrete: vFreteDescontado, 
      vFreteBruto: vFrete,
      mermas,
      mermasIsAbusive,
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
              <button onClick={() => setLang('jop')} className={`px-2 py-1 text-[10px] font-bold rounded-sm transition-colors ${lang === 'jop' ? 'bg-[#38bdf8] text-[#0f172a]' : 'text-[#94a3b8] hover:text-white'}`}>JOP</button>
            </div>
          </div>
          
          <AnimatePresence>
            {!isOnline && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-md p-2 flex items-center gap-2 overflow-hidden"
              >
                <div className="bg-[#f59e0b]/20 p-1.5 rounded-full flex-shrink-0">
                  <WifiOff size={14} className="text-[#fcd34d]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#fcd34d] uppercase tracking-wider">{t.offlineMode}</div>
                  <div className="text-[9px] text-[#fbbf24]/80 leading-tight mt-0.5">{t.offlineDesc}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                <option value="Regular">Regular</option>
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
                        className="absolute top-0 left-0 w-full"
                        style={{ 
                          transform: `translateY(${virtualRow.start}px)` 
                        }}
                      >
                        <div
                          className="grid grid-cols-[3fr_2fr_3fr] gap-2 p-3 border-b border-[#334155]/50 items-center hover:bg-[#38bdf8]/15 hover:border-l-2 hover:border-l-[#38bdf8] transition-all cursor-default group"
                        >
                          <div className="text-[12px] font-medium truncate pr-1 group-hover:text-white transition-colors" title={item.empresa}>{item.empresa}</div>
                          <div className="text-[11px] opacity-80 text-right group-hover:text-white transition-colors">{item.infracoes === 0 ? '--' : item.infracoes}</div>
                          <div className="pl-2 flex overflow-hidden">
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide truncate ${item.status === 'Risco Crítico' ? 'bg-[#fee2e2]/10 text-[#fca5a5]' : item.status === 'Regular' ? 'bg-[#ecfdf5]/10 text-[#6ee7b7]' : 'bg-[#fef3c7]/10 text-[#fcd34d]'}`} title={item.status}>
                              {item.status === 'Risco Crítico' ? t.riscoCritico : item.status === 'Regular' ? 'Regular' : t.sobInvestigacao}
                            </span>
                          </div>
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
          <section className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-6 w-full lg:sticky lg:top-8 transition-shadow hover:shadow-md">
            
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
                          <div className="font-semibold text-[#1e293b] truncate text-[13px]">
                            {s.empresa}
                          </div>
                          <div className="text-[11px] text-[#64748b] mt-0.5 flex items-center gap-2">
                            <span>RUC: {s.ruc}</span>
                            {s.status === 'Risco Crítico' && <span className="text-[#ef4444] font-bold">⚠️ {t.riscoCritico}</span>}
                            {s.status === 'Sob Investigação' && <span className="text-[#f59e0b] font-bold">⚠️ {t.sobInvestigacao}</span>}
                            {s.status === 'Regular' && <span className="text-[#10b981] font-bold">✅ Regular</span>}
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

              <div className="grid grid-cols-2 gap-3 mb-2">
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
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5 text-[#475569]">{t.inputEstadia || 'Dias Parado (>24h)'}</label>
                  <input 
                    type="number" 
                    className="w-full p-2.5 border border-[#cbd5e1] rounded text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    value={diasEstadia}
                    onChange={(e) => setDiasEstadia(Number(e.target.value) || '')}
                    min="0"
                    placeholder="Ex: 2"
                  />
                </div>
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
              <div 
                ref={printRef}
                className={`bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-6 flex flex-col relative ${isExportingPDF ? 'p-10 text-[16px] w-[800px] h-auto max-w-none' : 'h-full'}`}
                style={{
                  ...(isExportingPDF ? { position: 'absolute', top: '-9999px', left: '-9999px' } : {})
                }}
              >
                {isExportingPDF && (
                  <div className="mb-6 border-b-2 border-[#1e293b] pb-6">
                     <div className="flex justify-between items-end mb-6">
                        <div>
                           <h2 className="text-2xl font-black text-[#1e293b] uppercase flex items-center gap-2 m-0 p-0">
                             <Truck size={28} />
                             {t.appTitle}
                           </h2>
                           <p className="text-sm text-[#64748b] font-medium mt-1">{t.appSubtitle} - RELATÓRIO DE AUDITORIA</p>
                        </div>
                        <div className="text-right text-[11px] text-[#64748b] bg-[#f8fafc] p-3 rounded border border-[#e2e8f0]">
                           <p className="mb-1"><strong>Data da Auditoria:</strong> {new Date().toLocaleDateString('es-PY')} {new Date().toLocaleTimeString('es-PY')}</p>
                           <p><strong>Autenticação Sistema:</strong> EXP-2600-0591-20B</p>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4 bg-[#f1f5f9] p-5 rounded-md text-sm border border-[#e2e8f0]">
                        <div>
                          <p className="text-[#64748b] uppercase text-[10px] tracking-wider font-bold mb-1">Empresa Transportadora</p>
                          <p className="font-bold text-[#1e293b] text-base">{resultado.empresa || 'NÃO INFORMADA'}</p>
                        </div>
                        <div>
                          <p className="text-[#64748b] uppercase text-[10px] tracking-wider font-bold mb-1">Veículo (Chapa)</p>
                          <p className="font-bold text-[#1e293b] text-base">{resultado.chapa || 'NÃO INFORMADA'}</p>
                        </div>
                        <div>
                          <p className="text-[#64748b] uppercase text-[10px] tracking-wider font-bold mb-1">Distância Declarada / GPS</p>
                          <p className="font-bold text-[#1e293b] text-base">{resultado.dPapel} km <span className="text-[#94a3b8] font-normal mx-1">vs</span> {resultado.dGps} km</p>
                        </div>
                        <div>
                          <p className="text-[#64748b] uppercase text-[10px] tracking-wider font-bold mb-1">Valor Bruto do Frete (Declarado)</p>
                          <p className="font-bold text-[#1e293b] text-base">{formatCurrency(resultado.vFreteBruto)}</p>
                        </div>
                     </div>
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="m-0 text-[14px] flex items-center gap-2 uppercase tracking-[0.05em] font-bold text-[#64748b]">
                    📋 {t.resTitle}
                    {resultado.lucroFinal < 0 && <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase bg-[#fee2e2] text-[#b91c1c] tracking-wide ml-2">{t.resPrejuizoBadge}</span>}
                  </h3>
                  
                  {!isExportingPDF && (
                    <button 
                      onClick={handleDownloadPDF} 
                      disabled={isExportingPDF}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] py-1.5 px-3 rounded transition-colors disabled:opacity-50"
                    >
                      <Download size={14} />
                      {t.btnSalvarPDF}
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <div className="p-4 rounded-md border-l-4 border-[#1e40af] bg-[#eff6ff] sm:col-span-2 flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <div className="text-[11px] text-[#64748b] uppercase tracking-[0.05em] font-bold">{t.resLiquido} (Livre)</div>
                      <div className={`text-2xl md:text-3xl font-bold mt-1 ${resultado.lucroFinal < 0 ? 'text-[#dc2626]' : 'text-[#1e293b]'}`}>
                        {formatCurrency(resultado.lucroFinal)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#64748b] uppercase tracking-[0.05em] font-bold">{t.resLucroDolar}</div>
                      <div className={`text-xl md:text-2xl font-bold mt-1 ${resultado.lucroFinalDolar < 0 ? 'text-[#dc2626]' : 'text-[#1e293b]'}`}>
                        $ {resultado.lucroFinalDolar.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
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
                    <div className="flex justify-between items-center px-4 py-3 border-b border-[#e2e8f0] bg-[#fffbeb]">
                      <span className="text-[#a16207]">{t.resCustosIva || 'Imposto (IVA 10%):'}</span>
                      <strong className="text-[#d97706]">- {formatCurrency(resultado.descontoIva)}</strong>
                    </div>
                    {resultado.mermas > 0 && (
                      <div className="flex justify-between items-center px-4 py-3 border-b border-[#e2e8f0]">
                        <span className="text-[#ef4444] flex items-center gap-1.5">
                          {t.resMermas || 'Descontos Carga (Mermas):'}
                          {resultado.mermasIsAbusive && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5]">Abusivo (&gt;0,5%)</span>
                          )}
                        </span>
                        <strong className="text-[#ef4444]">- {formatCurrency(resultado.mermas)}</strong>
                      </div>
                    )}
                    <div className={`flex justify-between items-center px-4 py-3 ${resultado.vFrete - resultado.custoMinimoLegal >= 0 ? 'bg-[#ecfdf5]' : 'bg-[#fef2f2]'}`}>
                      <span className={`font-bold ${resultado.vFrete - resultado.custoMinimoLegal >= 0 ? 'text-[#065f46]' : 'text-[#991b1b]'}`}>{t.resDiferenca || 'Diferencia Mínimo Legal:'}</span>
                      <strong className={resultado.vFrete - resultado.custoMinimoLegal >= 0 ? 'text-[#047857]' : 'text-[#b91c1c]'}>
                        {formatCurrency(resultado.vFrete - resultado.custoMinimoLegal)}
                      </strong>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-md sm:col-span-2 overflow-hidden text-sm mt-1">
                    <div className="bg-[#f1f5f9] px-4 py-2 border-b border-[#e2e8f0] font-bold text-[#475569] uppercase text-[11px] tracking-wide">
                      {t.resCustosTitle}
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#e2e8f0]">
                      <span className="text-[#64748b]">{t.resCustosDiesel}</span>
                      <span className="text-[#1e293b] font-medium">{formatCurrency(resultado.custoDieselEstimado)}</span>
                    </div>
                    
                    <div className="flex flex-col border-b border-[#e2e8f0]">
                      <button 
                        onClick={() => setExpandedManut(!expandedManut)}
                        className="flex justify-between items-center px-4 py-2.5 w-full text-left hover:bg-[#f1f5f9] transition-colors focus:outline-none"
                      >
                        <span className="text-[#1e293b] font-medium flex items-center gap-2">
                          {t.resCustosManut}
                          {expandedManut ? <ChevronUp size={16} className="text-[#64748b]" /> : <ChevronDown size={16} className="text-[#64748b]" />}
                        </span>
                        <span className="text-[#1e293b] font-bold">{formatCurrency(resultado.descontoManut)}</span>
                      </button>
                      <AnimatePresence>
                        {(expandedManut || isExportingPDF) && (
                          <motion.div 
                            initial={{ height: isExportingPDF ? 'auto' : 0, opacity: isExportingPDF ? 1 : 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white"
                          >
                            <div className="px-4 pb-2.5 flex flex-col gap-1">
                              <div className="flex justify-between items-center text-[12px] text-[#64748b] ml-4">
                                <span>{t.resCustosManutPecas}</span>
                                <span>{formatCurrency(resultado.custoMinimoLegal * 0.1241)}</span>
                              </div>
                              <div className="flex justify-between items-center text-[12px] text-[#64748b] ml-4">
                                <span>{t.resCustosManutMaoObra}</span>
                                <span>{formatCurrency(resultado.custoMinimoLegal * 0.0262)}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col border-b border-[#e2e8f0]">
                      <button 
                        onClick={() => setExpandedSalarios(!expandedSalarios)}
                        className="flex justify-between items-center px-4 py-2.5 w-full text-left hover:bg-[#f1f5f9] transition-colors focus:outline-none"
                      >
                        <span className="text-[#1e293b] font-medium flex items-center gap-2">
                          {t.resCustosSalarios}
                          {expandedSalarios ? <ChevronUp size={16} className="text-[#64748b]" /> : <ChevronDown size={16} className="text-[#64748b]" />}
                        </span>
                        <span className="text-[#1e293b] font-bold">{formatCurrency(resultado.descontoSalarios)}</span>
                      </button>
                      <AnimatePresence>
                        {(expandedSalarios || isExportingPDF) && (
                          <motion.div 
                            initial={{ height: isExportingPDF ? 'auto' : 0, opacity: isExportingPDF ? 1 : 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white"
                          >
                            <div className="px-4 pb-2.5 flex flex-col gap-1">
                              <div className="flex justify-between items-center text-[12px] text-[#64748b] ml-4">
                                <span>{t.resCustosSalariosV}</span>
                                <span>{formatCurrency(resultado.custoMinimoLegal * 0.1467)}</span>
                              </div>
                              <div className="flex justify-between items-center text-[12px] text-[#64748b] ml-4">
                                <span>{t.resCustosSalariosF}</span>
                                <span>{formatCurrency(resultado.custoMinimoLegal * 0.0446)}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#e2e8f0]">
                      <span className="text-[#64748b]">{t.resCustosPedagios}</span>
                      <span className="text-[#1e293b] font-medium">{formatCurrency(resultado.descontoPedagios)}</span>
                    </div>

                    <div className="flex flex-col border-b border-[#e2e8f0]">
                      <button 
                        onClick={() => setExpandedAdm(!expandedAdm)}
                        className="flex justify-between items-center px-4 py-2.5 w-full text-left hover:bg-[#f1f5f9] transition-colors focus:outline-none"
                      >
                        <span className="text-[#1e293b] font-medium flex items-center gap-2">
                          {t.resCustosAdm}
                          {expandedAdm ? <ChevronUp size={16} className="text-[#64748b]" /> : <ChevronDown size={16} className="text-[#64748b]" />}
                        </span>
                        <span className="text-[#1e293b] font-bold">{formatCurrency(resultado.descontoAdm)}</span>
                      </button>
                      <AnimatePresence>
                        {(expandedAdm || isExportingPDF) && (
                          <motion.div 
                            initial={{ height: isExportingPDF ? 'auto' : 0, opacity: isExportingPDF ? 1 : 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white"
                          >
                            <div className="px-4 pb-2.5 flex flex-col gap-1">
                              <div className="flex justify-between items-center text-[12px] text-[#64748b] ml-4">
                                <span>{t.resCustosAdmDeprec}</span>
                                <span>{formatCurrency(resultado.custoMinimoLegal * 0.0579)}</span>
                              </div>
                              <div className="flex justify-between items-center text-[12px] text-[#64748b] ml-4">
                                <span>{t.resCustosAdmGestao}</span>
                                <span>{formatCurrency(resultado.custoMinimoLegal * 0.0627)}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {resultado.custoEstadia > 0 && (
                      <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#e2e8f0] bg-[#fefce8]">
                        <span className="text-[#a16207]">{t.resCustosEstadia}</span>
                        <span className="text-[#854d0e] font-medium">{formatCurrency(resultado.custoEstadia)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center px-4 py-3 bg-[#f8fafc] font-bold">
                      <span className="text-[#475569] uppercase text-[11px]">{t.resCustosTotal}:</span>
                      <span className="text-[#dc2626]">
                        {formatCurrency(resultado.custoDieselEstimado + resultado.descontoManut + resultado.descontoSalarios + resultado.descontoPedagios + resultado.descontoAdm + resultado.custoEstadia)}
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

                    {resultado.vFrete < resultado.custoMinimoLegal && !isExportingPDF && (
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
                          ) : !isOnline ? (
                            <button 
                              disabled
                              className="w-full bg-[#cbd5e1] text-[#64748b] px-5 py-3.5 rounded font-bold cursor-not-allowed flex items-center justify-center gap-2 text-[14px] uppercase border border-[#94a3b8] shadow-sm"
                            >
                              <WifiOff size={18} />
                              {t.btnConexao}
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
                    )}
                    
                {isExportingPDF && (
                  <div className="mt-8 pt-6 border-t border-[#e2e8f0] text-center flex flex-col items-center">
                    <p className="text-[12px] font-bold text-[#1e293b] uppercase tracking-widest">{t.appTitle}</p>
                    <p className="text-[10px] text-[#64748b] mt-1 italic">{t.footerTxt || 'Sistema Independente de Fiscalização de Cargas'}</p>
                    <div className="mt-4 flex flex-col items-center">
                      <div className="w-32 border-b border-[#cbd5e1] mb-2 border-dashed"></div>
                      <p className="text-[9px] text-[#94a3b8] uppercase tracking-wider">{t.footerAss || 'Válido para fins de conferência legal'}</p>
                    </div>
                  </div>
                )}
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
