import { useState, useEffect } from "react";
import {
  LayoutDashboard, Building2, DollarSign, Users, Calendar,
  Settings, ChevronDown, ChevronRight, Bell, LogOut,
  TrendingUp, AlertTriangle, CheckCircle2,
  Clock, FileText, CreditCard, PieChart, Briefcase,
  ClipboardList, Truck, BarChart3, Bot,
  CircleDollarSign, Landmark, Package, MessageSquare,
  BookOpen, Target, Link, ArrowUpRight, ArrowDownRight,
  Banknote, Home, X, Search, Filter, RefreshCw,
  Download, Plus, Eye, Pencil, Trash2,
  Wallet, CheckCheck, Camera, Share2, Copy,
  ChevronLeft, Star, AlertCircle, Info, Hash,
  StickyNote, Users2, BookMarked, Calculator,
  Send, FileCheck, ClipboardCheck, Building,
  MapPin, Image, Layers,
} from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bgBase:   "#0a1510", bgDeep:  "#060e0a",
  bgCard:   "#1a2d1e", bgCard2: "#162518",
  bgHover:  "#1e3323", bgActive:"#203825",
  bd:       "#2d4a32", bdSubtle:"#1a2d1e",
  gold:     "#c9a84c", goldDark:"#a07830", goldBg:"#c9a84c12",
  green:    "#4caf87", greenLt: "#7fd996", greenDim:"#2d6644",
  tx:       "#e8f5eb", tx2:     "#9dbfa3", tx3:"#6b8c70",
  red:      "#e74c3c", redBg:   "#e74c3c18",
  amber:    "#f39c12", amberBg: "#f39c1212",
  blue:     "#3498db", blueBg:  "#3498db12",
  purple:   "#9b59b6", purpleBg:"#9b59b612",
};

// ─── Static data ──────────────────────────────────────────────────────────────
const OBRAS_LIST = [
  { id:"OBR-001", nome:"ACASA GERMANO",      status:"Em obra",   pct:78,  orc:2.1, gasto:1.90, roi:47,  risco:"alto",    fotos:9,  regPortal:0, execPct:100, img:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&auto=format" },
  { id:"OBR-002", nome:"ACASA FREITAS",      status:"Em obra",   pct:62,  orc:2.4, gasto:1.68, roi:84,  risco:"alto",    fotos:8,  regPortal:1, execPct:79,  img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&auto=format" },
  { id:"OBR-003", nome:"ACASA EBEN ROYALLE", status:"Entregue",  pct:100, orc:1.0, gasto:0.93, roi:126, risco:"baixo",   fotos:0,  regPortal:0, execPct:2,   img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&auto=format" },
  { id:"OBR-004", nome:"ACASA FIDALGO",      status:"Em obra",   pct:55,  orc:1.3, gasto:0.71, roi:69,  risco:"médio",   fotos:6,  regPortal:0, execPct:0,   img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop&auto=format" },
  { id:"OBR-005", nome:"ACASA SANTIAGO",     status:"Atrasada",  pct:43,  orc:2.8, gasto:2.17, roi:79,  risco:"crítico", fotos:4,  regPortal:0, execPct:0,   img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&auto=format" },
];

const CONTRATOS_DATA = [
  { id:"CT-0004", cod:"OBR-002", obra:"ACASA FREITAS",      status:"Ativo",     titulo:"Marcenaria Diversas",                          forn:"Peg Leve Armários - Ivanei",    total:47000,  pago:23500, ref:""         },
  { id:"CT-0003", cod:"OBR-002", obra:"ACASA FREITAS",      status:"Ativo",     titulo:"Fornecimento e Instalação das Esquadrias",     forn:"BH Esquadrias",                 total:96886,  pago:20000, ref:""         },
  { id:"CT-0002", cod:"OBR-002", obra:"ACASA FREITAS",      status:"Encerrado", titulo:"Execução de Deck em Itauba - 66m²",            forn:"Claudimar Ribeiro",             total:10845,  pago:10845, ref:"Ref 002"  },
  { id:"CT-0001", cod:"OBR-005", obra:"ACASA SANTIAGO",     status:"Encerrado", titulo:"Vídeos e Fotos ACASA CUMARU",                  forn:"SVG Produtora",                 total:2000,   pago:2000,  ref:"Ref 01/2026" },
];

const LANCAMENTOS_DATA = [
  { id:"L-1349", data:"12/09/26", obra:"OBR-002", desc:"JUROS PRONAMPE — ATÉ 12/09",              forn:"Bdmg",           tipo:"Indireto", cat:"Custo Financeiro", subcat:"Capital de Te...", total:85195.91, pago:85195.91, forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1348", data:"12/09/26", obra:"OBR-001", desc:"JUROS PRONAMPE — ATÉ 12/09",              forn:"Bdmg",           tipo:"Indireto", cat:"Custo Financeiro", subcat:"Capital de Te...", total:25132.12, pago:25132.12, forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1347", data:"11/09/26", obra:"OBR-003", desc:"PAGAMENTO FINAL DO LOTE — 03 P...",       forn:"L10 Engenharia", tipo:"Indireto", cat:"Aquisição do T...",subcat:"Valor do Terr...",total:275156.71,pago:275156.71,forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1346", data:"10/09/26", obra:"OBR-001", desc:"CONDOMINIO RETIRO DAS ÁGUAS",             forn:"—",              tipo:"Indireto", cat:"Custos Indiretos",subcat:"Consumo",          total:749.49,   pago:749.49,  forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1345", data:"10/09/26", obra:"OBR-005", desc:"JUROS DE OBRA — INTER",                   forn:"Banco Inter",    tipo:"Indireto", cat:"Custo Financeiro", subcat:"Capital de Te...", total:18879.12, pago:18879.12, forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1344", data:"09/09/26", obra:"OBR-004", desc:"ART DE EXECUÇÃO — SUBSTITUIÇÃO...",       forn:"CREA ART",       tipo:"Indireto", cat:"Projetos e Leg...",subcat:"Regularização",    total:285.59,   pago:285.59,  forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1343", data:"09/09/26", obra:"OBR-003", desc:"PAGAMENTO PARCELA LOTE — QUIT...",        forn:"L10 Engenharia", tipo:"Indireto", cat:"Aquisição do T...",subcat:"Valor do Terr...",total:83843.29, pago:83843.29, forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1342", data:"08/09/26", obra:"OBR-002", desc:"MATERIAIS CARPINTARIA — MACAL",           forn:"Macal Madeiras", tipo:"Material", cat:"Obra",             subcat:"Área Externa",     total:2100,     pago:2100,    forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1341", data:"08/09/26", obra:"OBR-002", desc:"CEMIG AGOSTO",                            forn:"Cemig",          tipo:"Serviço",  cat:"Custos Indiretos",subcat:"Consumo",           total:116.12,   pago:116.12,  forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1340", data:"08/09/26", obra:"OBR-002", desc:"CEMIG JUNHO",                             forn:"Cemig",          tipo:"Serviço",  cat:"Custos Indiretos",subcat:"Consumo",           total:60.43,    pago:60.43,   forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1339", data:"08/09/26", obra:"OBR-002", desc:"RODAPÉ POLIESTIRENO",                     forn:"—",              tipo:"Material", cat:"Obra",             subcat:"Revestimento",     total:2481.56,  pago:0,       forma:"Cartão", status:"Não pago",   nf:false, pagoPor:"ACASA" },
  { id:"L-1338", data:"05/09/26", obra:"OBR-002", desc:"REEMBOLSO MÁRCIO",                        forn:"Marcio Delmires",tipo:"Material", cat:"Obra",             subcat:"Acabamentos",      total:424.07,   pago:424.07,  forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
  { id:"L-1337", data:"04/09/26", obra:"OBR-002", desc:"Medição de serviços de gás",              forn:"HM Gás Canaliza...",tipo:"Serviço",cat:"Obra",            subcat:"Instalações",      total:1260,     pago:0,       forma:"PIX",    status:"Aguardando", nf:false, pagoPor:"ACASA" },
  { id:"L-1336", data:"04/09/26", obra:"OBR-002", desc:"Medição de instalação de luminária...",   forn:"Marcio Delmires",tipo:"Mão de Obra",cat:"Obra",           subcat:"Instalações",      total:2000,     pago:0,       forma:"PIX",    status:"Aguardando", nf:false, pagoPor:"ACASA" },
  { id:"L-1335", data:"03/09/26", obra:"OBR-005", desc:"CONDOMINIO AGOSTO",                       forn:"Condomínio Gra...",tipo:"Indireto",cat:"Custos Indiretos",subcat:"Consumo",           total:609.84,   pago:609.84,  forma:"PIX",    status:"Pago",       nf:false, pagoPor:"ACASA" },
];

const PEDIDOS_DATA = [
  { id:"PED-0092", desc:"Serviço de terraplenagem extra",   obra:"OBR-001", resp:"Matheus",  valor:28000,  status:"Aguardando", venc:"15/09/26", forma:"PIX",    wpp:true  },
  { id:"PED-0091", desc:"Aço Sul — 3ª parcela contrato",   obra:"OBR-004", resp:"Tharyque", valor:46000,  status:"Aprovado",   venc:"13/09/26", forma:"Boleto", wpp:false },
  { id:"PED-0090", desc:"Instalações elétricas etapa 2",   obra:"OBR-002", resp:"Matheus",  valor:62500,  status:"Aguardando", venc:"10/09/26", forma:"Boleto", wpp:true  },
  { id:"PED-0089", desc:"Andaime — renovação mensal",       obra:"OBR-005", resp:"Tharyque", valor:18200,  status:"Aguardando", venc:"01/09/26", forma:"PIX",    wpp:true  },
  { id:"PED-0088", desc:"Vidros e esquadrias — saldo",      obra:"OBR-001", resp:"Matheus",  valor:60000,  status:"Confirmado", venc:"06/09/26", forma:"Cheque", wpp:false },
  { id:"PED-0087", desc:"Honorários escritório arquitet.",  obra:"OBR-003", resp:"Matheus",  valor:35000,  status:"Confirmado", venc:"05/09/26", forma:"PIX",    wpp:false },
];

const ALERTAS = [
  { tipo:"crítico", msg:"OBR-001 orçamento 109% consumido" },
  { tipo:"crítico", msg:"OBR-005 atrasada 106 dias" },
  { tipo:"alto",    msg:"36 pagamentos vencidos aguardando aprovação" },
  { tipo:"médio",   msg:"OBR-002 orçamento 99% consumido" },
  { tipo:"médio",   msg:"Capital não registrado em 3 obras" },
];

const KPIS = [
  { label:"Capital Total Investido", value:"R$ 7,51M", sub:"5 obras ativas",         color:C.gold,   icon:Landmark,         up:true  },
  { label:"Lucro Projetado",         value:"R$ 6,66M", sub:"ROI médio 201,9%",       color:C.green,  icon:TrendingUp,       up:true  },
  { label:"A Pagar (Vencido)",       value:"R$ 122K",  sub:"36 pagamentos vencidos", color:C.red,    icon:AlertTriangle,    up:false },
  { label:"Capital Planejado",       value:"R$ 3,30M", sub:"obras.cap cadastrado",   color:C.blue,   icon:Target,           up:true  },
  { label:"Capital Recebido",        value:"R$ 990K",  sub:"entradas registradas",   color:C.purple, icon:CircleDollarSign, up:true  },
  { label:"Saldo Consolidado",       value:"R$−4,30M", sub:"caixa real vs pago",     color:C.red,    icon:BarChart3,        up:false },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtMoney(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1_000_000) return `${sign}R$ ${(abs/1_000_000).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}M`;
  if (abs >= 1_000)     return `${sign}R$ ${(abs/1_000).toFixed(0)}K`;
  return `${sign}R$ ${abs.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
}

function statusColor(s: string) {
  const m: Record<string,string> = {
    "Pago":C.green,"Aguardando":C.purple,"Não pago":C.red,
    "Parcial":C.gold,"Cancelado":C.tx3,"Aprovado":C.blue,"Confirmado":C.green,
    "Ativo":C.green,"Encerrado":C.tx3,"Cancelado_c":C.red,
    "Em obra":C.amber,"Entregue":C.green,"Atrasada":C.red,"Planejamento":C.blue,
  };
  return m[s] ?? C.tx2;
}
function riscoColor(r:string){ return {baixo:C.green,médio:C.amber,alto:C.red,crítico:C.red}[r]??C.tx3; }
function alertColor(t:string){ return {crítico:C.red,alto:C.amber,médio:C.gold,baixo:C.green}[t]??C.tx3; }

// ─── Primitives ───────────────────────────────────────────────────────────────
function Badge({ label, color, size="sm" }: { label:string; color:string; size?:"sm"|"xs" }) {
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",
      padding: size==="xs" ? "1px 6px" : "2px 8px",
      borderRadius:5,background:color+"20",border:`1px solid ${color}40`,
      color,fontSize: size==="xs" ? 9 : 10,fontWeight:600,letterSpacing:0.4,whiteSpace:"nowrap",
    }}>{label}</span>
  );
}

function Pill({ label, active, onClick }: { label:string; active:boolean; onClick:()=>void }) {
  return (
    <button onClick={onClick} style={{
      padding:"5px 14px",borderRadius:20,border:`1px solid ${active ? C.gold : C.bd}`,
      background: active ? C.goldBg : "transparent",
      color: active ? C.gold : C.tx3,fontSize:12,fontWeight: active ? 600 : 400,cursor:"pointer",
      transition:"all 0.15s",
    }}>{label}</button>
  );
}

function SectionHeader({ label, action, actionLabel }: { label:string; action?:()=>void; actionLabel?:string }) {
  return (
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
      <span style={{ fontSize:10,fontWeight:700,color:C.tx3,letterSpacing:1.2,textTransform:"uppercase" }}>{label}</span>
      {action && <button onClick={action} style={{ fontSize:11,color:C.gold,background:"none",border:"none",cursor:"pointer",fontWeight:600 }}>{actionLabel} →</button>}
    </div>
  );
}

function ProgressBar({ pct, color }: { pct:number; color:string }) {
  return (
    <div style={{ height:4,background:C.bgCard2,borderRadius:2,overflow:"hidden" }}>
      <div style={{ height:"100%",width:`${Math.min(100,pct)}%`,background:color,borderRadius:2,transition:"width 0.6s ease" }}/>
    </div>
  );
}

function Input({ label, placeholder, type="text", value, onChange }:{
  label:string; placeholder:string; type?:string; value?:string; onChange?:(v:string)=>void;
}) {
  return (
    <div>
      <div style={{ fontSize:10,fontWeight:600,color:C.tx3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:5 }}>{label}</div>
      <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange?.(e.target.value)}
        style={{
          width:"100%",background:C.bgCard2,border:`1px solid ${C.bd}`,
          borderRadius:8,padding:"9px 12px",fontSize:12,color:C.tx,outline:"none",
          transition:"border-color 0.15s",
        }}
        onFocus={e=>{ e.currentTarget.style.borderColor=C.gold+"80"; }}
        onBlur={e=>{ e.currentTarget.style.borderColor=C.bd; }}
      />
    </div>
  );
}

function Select({ label, options, value, onChange }:{
  label:string; options:string[]; value?:string; onChange?:(v:string)=>void;
}) {
  return (
    <div>
      <div style={{ fontSize:10,fontWeight:600,color:C.tx3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:5 }}>{label}</div>
      <select value={value} onChange={e=>onChange?.(e.target.value)} style={{
        width:"100%",background:C.bgCard2,border:`1px solid ${C.bd}`,
        borderRadius:8,padding:"9px 12px",fontSize:12,color:C.tx,outline:"none",cursor:"pointer",
      }}>
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
type NavLeaf  = { label:string; route:string; icon?:any; badge?:number };
type NavGroup = { label:string; icon:any; children:(NavLeaf|NavGroup|{divider:true})[] };
type NavItem  = NavLeaf | NavGroup | { divider:true };
const isGroup   = (n:any):n is NavGroup => "children" in n;
const isDivider = (n:any) => "divider" in n;

const NAV_TREE:NavItem[] = [
  { label:"Dashboard",   route:"/analise",     icon:LayoutDashboard },
  { divider:true },
  { label:"Obras", icon:Building2, children:[
    { label:"Ver todas as obras",   route:"/obras",          icon:Building2 },
    { label:"OBR-001 — Germano",  icon:Home, children:[
      { label:"Visão Geral", route:"/analise?obra=1", icon:LayoutDashboard },
      { label:"Diário",      route:"/diario/1",       icon:BookOpen },
      { label:"Documentos",  route:"/docs",           icon:FileText },
    ]},
    { label:"OBR-002 — Freitas",  icon:Home, children:[
      { label:"Visão Geral", route:"/analise?obra=2", icon:LayoutDashboard },
      { label:"Diário",      route:"/diario/2",       icon:BookOpen },
      { label:"Documentos",  route:"/docs",           icon:FileText },
    ]},
    { label:"OBR-003 — Eben",     icon:Home, children:[
      { label:"Visão Geral", route:"/analise?obra=3", icon:LayoutDashboard },
    ]},
    { label:"OBR-004 — Fidalgo",  icon:Home, children:[
      { label:"Visão Geral", route:"/analise?obra=4", icon:LayoutDashboard },
    ]},
    { label:"OBR-005 — Santiago", icon:Home, children:[
      { label:"Visão Geral", route:"/analise?obra=5", icon:LayoutDashboard },
      { label:"Diário",      route:"/diario/5",       icon:BookOpen },
    ]},
    { divider:true } as any,
    { label:"Cotações",     route:"/cotacoes",     icon:Package },
    { label:"Contratos",    route:"/contratos",    icon:FileText },
    { label:"Pagamentos",   route:"/pedidos",      icon:Banknote, badge:36 },
    { label:"Fornecedores", route:"/fornecedores", icon:Truck },
  ]},
  { label:"Financeiro", icon:DollarSign, children:[
    { label:"Visão Geral",          route:"/financeiro",  icon:BarChart3 },
    { label:"Central de Recursos",  route:"/recursos",    icon:Landmark },
    { label:"Administrativo",       route:"/admin",       icon:Briefcase },
    { label:"Lançamentos",          route:"/lancamentos", icon:ClipboardList },
    { label:"Cartões",              route:"/cartoes",     icon:CreditCard },
  ]},
  { label:"Investidores", icon:PieChart, children:[
    { label:"Dashboard",   route:"/investidores",         icon:LayoutDashboard },
    { label:"Aportes",     route:"/investidores/aportes", icon:ArrowUpRight },
    { label:"Simulação",   route:"/investidores/sim",     icon:Target },
    { label:"Comparativo", route:"/investidores/comp",    icon:BarChart3 },
    { label:"Retorno×CDI", route:"/investidores/cdi",     icon:TrendingUp },
    { label:"Portal",      route:"/investidores/portal",  icon:Link },
  ]},
  { divider:true },
  { label:"Pessoas", route:"/pessoas", icon:Users },
  { label:"Agenda", icon:Calendar, children:[
    { label:"Calendário & Reuniões", route:"/agenda", icon:Calendar },
    { label:"Atas de Reunião",       route:"/atas",   icon:FileText },
  ]},
  { divider:true },
  { label:"Configurações", icon:Settings, children:[
    { label:"Categorias",            route:"/config/categorias", icon:Package },
    { label:"Formas de Pagamento",   route:"/config/pagamentos", icon:CreditCard },
    { label:"Usuários e Permissões", route:"/config/users",      icon:Users },
    { label:"Metas",                 route:"/config/metas",      icon:Target },
    { label:"Relatórios",            route:"/config/relatorios", icon:BarChart3 },
    { label:"Integração WhatsApp",   route:"/config/whatsapp",   icon:MessageSquare },
  ]},
];

function NavNode({ item, depth=0, route, setRoute }:{
  item:NavItem; depth?:number; route:string; setRoute:(r:string)=>void;
}) {
  if (isDivider(item)) return <div style={{ height:1,background:C.bdSubtle,margin:"6px 12px" }}/>;
  if (!isGroup(item as any)) {
    const leaf = item as NavLeaf;
    const Icon = leaf.icon;
    const active = route===leaf.route || (leaf.route.length > 1 && route.startsWith(leaf.route));
    return (
      <button onClick={()=>setRoute(leaf.route)} style={{
        display:"flex",alignItems:"center",gap:8,width:"100%",border:"none",textAlign:"left",
        cursor:"pointer",padding:`7px 14px 7px ${14+depth*14}px`,
        background:active ? C.bgActive : "transparent",
        borderLeft:active ? `2px solid ${C.gold}` : "2px solid transparent",
        color:active ? C.gold : C.tx2,fontSize:12,fontWeight:active?600:400,transition:"all 0.12s",
      }}
        onMouseEnter={e=>{ if(!active)(e.currentTarget as HTMLElement).style.background=C.bgHover; }}
        onMouseLeave={e=>{ if(!active)(e.currentTarget as HTMLElement).style.background="transparent"; }}
      >
        {Icon && <Icon size={12} style={{ flexShrink:0,opacity:active?1:0.6 }}/>}
        <span style={{ flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{leaf.label}</span>
        {leaf.badge && <span style={{ background:C.red,color:"#fff",borderRadius:10,fontSize:9,fontWeight:700,padding:"1px 5px",flexShrink:0 }}>{leaf.badge}</span>}
      </button>
    );
  }
  const group = item as NavGroup;
  const [open,setOpen] = useState(false);
  const Icon = group.icon;
  return (
    <div>
      <button onClick={()=>setOpen(!open)} style={{
        display:"flex",alignItems:"center",gap:8,width:"100%",border:"none",textAlign:"left",
        cursor:"pointer",padding:`8px 14px 8px ${14+depth*14}px`,
        background:"transparent",borderLeft:"2px solid transparent",
        color:C.tx2,fontSize:12,fontWeight:500,transition:"all 0.12s",
      }}
        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background=C.bgHover; }}
        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background="transparent"; }}
      >
        <Icon size={13} style={{ flexShrink:0,opacity:0.7 }}/>
        <span style={{ flex:1 }}>{group.label}</span>
        {open ? <ChevronDown size={11} opacity={0.4}/> : <ChevronRight size={11} opacity={0.4}/>}
      </button>
      {open && group.children.map((c,i)=><NavNode key={i} item={c} depth={depth+1} route={route} setRoute={setRoute}/>)}
    </div>
  );
}

function Sidebar({ route, setRoute }:{ route:string; setRoute:(r:string)=>void }) {
  return (
    <aside style={{
      width:220,flexShrink:0,background:C.bgDeep,
      borderRight:`1px solid ${C.bdSubtle}`,
      display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden",
    }}>
      <div style={{ padding:"16px 14px 12px",borderBottom:`1px solid ${C.bdSubtle}`,flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
          <div style={{
            width:36,height:36,borderRadius:10,
            background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontWeight:800,fontSize:13,color:"#0a0a0a",flexShrink:0,
          }}>A+</div>
          <div>
            <div style={{ fontSize:13,fontWeight:800,color:C.tx,letterSpacing:-0.4 }}>ACASA+</div>
            <div style={{ fontSize:9,color:C.tx3,letterSpacing:0.8 }}>ERP v2.0 · ENGENHARIA</div>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:7,background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,padding:"6px 10px" }}>
          <Search size={11} color={C.tx3}/>
          <input placeholder="Buscar..." style={{ background:"none",border:"none",outline:"none",fontSize:12,color:C.tx2,width:"100%" }}/>
        </div>
      </div>
      <nav style={{ flex:1,overflowY:"auto",padding:"8px 0" }}>
        {NAV_TREE.map((item,i)=><NavNode key={i} item={item} depth={0} route={route} setRoute={setRoute}/>)}
      </nav>
      <div style={{ borderTop:`1px solid ${C.bdSubtle}`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0 }}>
        <div style={{
          width:30,height:30,borderRadius:"50%",
          background:`linear-gradient(135deg,${C.green},${C.greenDim})`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontWeight:700,fontSize:12,color:"#fff",flexShrink:0,
        }}>M</div>
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ fontSize:12,fontWeight:600,color:C.tx }}>Matheus</div>
          <div style={{ fontSize:10,color:C.tx3,display:"flex",alignItems:"center",gap:4 }}>
            <span style={{ width:5,height:5,borderRadius:"50%",background:C.green,display:"inline-block" }}/>
            Admin · online
          </div>
        </div>
        <button style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:4 }}><LogOut size={13}/></button>
      </div>
    </aside>
  );
}

function Header({ title, sub, actions }:{ title:string; sub:string; actions?:React.ReactNode }) {
  const [now,setNow] = useState(new Date());
  const [spinning,setSpinning] = useState(false);
  useEffect(()=>{ const id=setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(id); },[]);
  function handleRefresh() {
    setSpinning(true);
    setTimeout(()=>setSpinning(false),900);
  }
  return (
    <header style={{
      height:54,flexShrink:0,background:C.bgDeep,borderBottom:`1px solid ${C.bdSubtle}`,
      display:"flex",alignItems:"center",padding:"0 24px",gap:12,
    }}>
      {/* Title */}
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ fontSize:16,fontWeight:800,color:C.tx,letterSpacing:-0.4 }}>{title}</div>
        <div style={{ fontSize:10,color:C.tx3,marginTop:1 }}>{sub}</div>
      </div>

      {/* Page actions (filters, buttons passed by each page) */}
      <div style={{ display:"flex",alignItems:"center",gap:8 }}>{actions}</div>

      {/* Divider */}
      <div style={{ width:1,height:28,background:C.bdSubtle,flexShrink:0 }}/>

      {/* Clock + date */}
      <div style={{ textAlign:"right",flexShrink:0,lineHeight:1 }}>
        <div style={{ fontSize:14,fontWeight:800,color:C.tx,letterSpacing:0.5,fontVariantNumeric:"tabular-nums" }}>
          {now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}
        </div>
        <div style={{ fontSize:9,color:C.tx3,marginTop:3,letterSpacing:0.3 }}>
          {now.toLocaleDateString("pt-BR",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}
        </div>
      </div>

      {/* Refresh button */}
      <button onClick={handleRefresh} title="Atualizar dados" style={{
        background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,
        padding:"6px 8px",cursor:"pointer",color:C.tx3,
        display:"flex",alignItems:"center",transition:"color 0.15s",
      }}
        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color=C.gold; }}
        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color=C.tx3; }}
      >
        <RefreshCw size={14} style={{ transition:"transform 0.9s ease", transform:spinning?"rotate(360deg)":"rotate(0deg)" }}/>
      </button>

      {/* Notification bell */}
      <button title="Notificações" style={{
        position:"relative",background:C.bgCard,border:`1px solid ${C.bd}`,
        borderRadius:8,padding:"6px 8px",cursor:"pointer",color:C.tx2,
        display:"flex",alignItems:"center",
      }}>
        <Bell size={15}/>
        <span style={{
          position:"absolute",top:4,right:4,
          width:8,height:8,borderRadius:"50%",
          background:C.red,border:`1.5px solid ${C.bgDeep}`,
          animation:"pulse-ring 1.8s ease infinite",
        }}/>
      </button>
    </header>
  );
}

function AIButton() {
  const [open,setOpen] = useState(false);
  return (
    <div style={{ position:"fixed",bottom:24,right:24,zIndex:100 }}>
      {open && (
        <div style={{
          position:"absolute",bottom:56,right:0,width:280,
          background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,padding:"14px",
          boxShadow:"0 16px 48px #00000060",animation:"fade-up 0.2s ease",
        }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
            <div style={{ fontSize:12,fontWeight:700,color:C.gold }}>Assistente IA</div>
            <button onClick={()=>setOpen(false)} style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3 }}><X size={14}/></button>
          </div>
          <div style={{ display:"flex",gap:6,background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:8,padding:"8px 10px",marginBottom:8 }}>
            <input placeholder="Pergunte sobre suas obras..." style={{ flex:1,background:"none",border:"none",outline:"none",fontSize:11,color:C.tx }}/>
          </div>
          {["Qual obra tem maior ROI?","Pagamentos vencidos hoje","Resumo OBR-005"].map(s=>(
            <button key={s} style={{ display:"block",width:"100%",marginBottom:4,background:C.bgCard2,border:`1px solid ${C.bdSubtle}`,borderRadius:6,padding:"6px 10px",cursor:"pointer",fontSize:11,color:C.tx2,textAlign:"left" }}>{s}</button>
          ))}
        </div>
      )}
      <button onClick={()=>setOpen(!open)} style={{
        width:46,height:46,borderRadius:"50%",
        background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,
        border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:`0 4px 20px ${C.gold}40`,color:"#0a0a0a",
      }}><Bot size={20}/></button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function DashboardPage({ setRoute }:{ setRoute:(r:string)=>void }) {
  const [tab,setTab] = useState("Dashboard");
  const TABS = ["Dashboard","Categorias","Rentabilidade","Fluxo de Caixa","Comparativo","Percentual","Recursos"];
  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1,overflow:"hidden" }}>
      <Header title="Dashboard Analítico" sub="5 obras · 1.349 lançamentos · Lagoa Santa/MG"
        actions={
          <>
            <div style={{ display:"flex",alignItems:"center",gap:6,background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:8,padding:"5px 10px" }}>
              <Building size={11} color={C.tx3}/>
              <select style={{ background:"none",border:"none",color:C.tx2,fontSize:12,cursor:"pointer",outline:"none",fontFamily:"inherit" }}>
                <option>Todas as obras</option>
                {OBRAS_LIST.map(o=><option key={o.id}>{o.id} — {o.nome}</option>)}
              </select>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:6,background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:8,padding:"5px 10px" }}>
              <Filter size={11} color={C.tx3}/>
              <select style={{ background:"none",border:"none",color:C.tx2,fontSize:12,cursor:"pointer",outline:"none",fontFamily:"inherit" }}>
                {["2026","2025","2024","Todos os anos"].map(a=><option key={a}>{a}</option>)}
              </select>
            </div>
          </>
        }
      />
      <div style={{ display:"flex",padding:"0 24px",borderBottom:`1px solid ${C.bdSubtle}`,background:C.bgDeep,flexShrink:0,overflowX:"auto" }}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            padding:"10px 16px",border:"none",background:"none",cursor:"pointer",
            fontSize:12,fontWeight:tab===t?700:400,color:tab===t?C.gold:C.tx3,
            borderBottom:tab===t?`2px solid ${C.gold}`:"2px solid transparent",
            marginBottom:-1,whiteSpace:"nowrap",transition:"color 0.15s",
          }}>{t}</button>
        ))}
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"24px",display:"flex",flexDirection:"column",gap:20 }}>
        {/* KPIs */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12 }}>
          {KPIS.map((k,i)=>{
            const Icon=k.icon;
            return (
              <div key={k.label} style={{
                background:C.bgCard,border:`1px solid ${C.bd}`,borderTop:`3px solid ${k.color}`,
                borderRadius:12,padding:"16px 18px",display:"flex",flexDirection:"column",gap:10,
                animation:`fade-up 0.3s ${i*0.04}s ease both`,position:"relative",overflow:"hidden",
              }}>
                <div style={{ position:"absolute",right:14,top:14,width:32,height:32,borderRadius:8,background:k.color+"18",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <Icon size={16} color={k.color}/>
                </div>
                <div style={{ fontSize:9,fontWeight:700,color:k.color,letterSpacing:1,textTransform:"uppercase" }}>{k.label}</div>
                <div style={{ fontSize:22,fontWeight:800,color:C.tx,letterSpacing:-0.8,lineHeight:1 }}>{k.value}</div>
                <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                  {k.up ? <ArrowUpRight size={11} color={C.green}/> : <ArrowDownRight size={11} color={C.red}/>}
                  <span style={{ fontSize:11,color:C.tx3 }}>{k.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Warning */}
        <div style={{ background:C.amberBg,border:`1px solid ${C.amber}40`,borderLeft:`3px solid ${C.amber}`,borderRadius:10,padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-start" }}>
          <AlertTriangle size={15} color={C.amber} style={{ flexShrink:0,marginTop:1 }}/>
          <div>
            <div style={{ fontSize:12,fontWeight:700,color:C.amber }}>Dados incompletos — OBR-001, OBR-002, OBR-005</div>
            <div style={{ fontSize:11,color:C.tx3,marginTop:2,lineHeight:1.5 }}>Capital próprio histórico não registrado. Saldos negativos não indicam insolvência — refletem entradas via módulo de investidor.</div>
          </div>
        </div>
        {/* Two col */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 290px",gap:16 }}>
          <div>
            <SectionHeader label="Obras Ativas" action={()=>setRoute("/obras")} actionLabel="Ver todas"/>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
              {OBRAS_LIST.map((o,i)=>{
                const pctOrc = Math.min(110,Math.round((o.gasto/o.orc)*100));
                const sc = statusColor(o.status);
                return (
                  <div key={o.id} style={{
                    background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,padding:"16px",
                    display:"flex",flexDirection:"column",gap:12,cursor:"pointer",transition:"border-color 0.2s",
                    animation:`fade-up 0.3s ${i*0.05}s ease both`,
                  }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=C.gold+"80"; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=C.bd; }}
                  >
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div>
                        <div style={{ fontSize:10,color:C.gold,fontWeight:700,letterSpacing:0.6 }}>{o.id}</div>
                        <div style={{ fontSize:13,fontWeight:700,color:C.tx,marginTop:1 }}>{o.nome}</div>
                      </div>
                      <Badge label={o.status} color={sc}/>
                    </div>
                    <div>
                      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
                        <span style={{ fontSize:10,color:C.tx3 }}>Orçamento consumido</span>
                        <span style={{ fontSize:10,fontWeight:700,color:pctOrc>100?C.red:pctOrc>80?C.amber:C.tx2 }}>{pctOrc}%</span>
                      </div>
                      <ProgressBar pct={pctOrc} color={pctOrc>100?C.red:pctOrc>80?C.amber:C.greenLt}/>
                    </div>
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6 }}>
                      {[{l:"Gasto",v:fmtMoney(o.gasto*1e6)},{l:"Orç.",v:fmtMoney(o.orc*1e6)},{l:"ROI",v:`${o.roi}%`}].map(({l,v})=>(
                        <div key={l} style={{ background:C.bgCard2,borderRadius:7,padding:"8px 10px" }}>
                          <div style={{ fontSize:9,color:C.tx3 }}>{l}</div>
                          <div style={{ fontSize:12,fontWeight:700,color:C.tx,marginTop:2 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <span style={{ fontSize:10,color:C.tx3 }}>Execução <b style={{ color:C.tx2 }}>{o.pct}%</b></span>
                      <Badge label={`Risco ${o.risco}`} color={riscoColor(o.risco)}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right col */}
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <div style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,overflow:"hidden" }}>
              <div style={{ padding:"12px 14px",borderBottom:`1px solid ${C.bdSubtle}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:C.red }}/>
                  <span style={{ fontSize:11,fontWeight:700,color:C.tx }}>Alertas Ativos</span>
                </div>
                <Badge label={`${ALERTAS.length}`} color={C.red}/>
              </div>
              {ALERTAS.map((a,i)=>{
                const c=alertColor(a.tipo);
                const icons:Record<string,any>={crítico:AlertTriangle,alto:AlertTriangle,médio:Clock,baixo:CheckCircle2};
                const Icon=icons[a.tipo]??AlertTriangle;
                return (
                  <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start",padding:"10px 14px",borderBottom:i<ALERTAS.length-1?`1px solid ${C.bdSubtle}`:"none" }}>
                    <div style={{ width:26,height:26,borderRadius:7,background:c+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <Icon size={12} color={c}/>
                    </div>
                    <div>
                      <div style={{ fontSize:9,fontWeight:700,color:c,letterSpacing:0.5,textTransform:"uppercase" }}>{a.tipo}</div>
                      <div style={{ fontSize:11,color:C.tx2,marginTop:1,lineHeight:1.4 }}>{a.msg}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,padding:"14px" }}>
              <SectionHeader label="Ações Rápidas"/>
              {[
                {label:"Novo Lançamento",icon:ClipboardList,color:C.gold,route:"/lancamentos"},
                {label:"Aprovar Pagamentos (36)",icon:Banknote,color:C.red,route:"/pedidos",badge:36},
                {label:"Ver Contratos",icon:FileText,color:C.blue,route:"/contratos"},
                {label:"Diário de Obras",icon:Camera,color:C.green,route:"/diario"},
              ].map(({label,icon:Icon,color,route:r,badge})=>(
                <button key={label} onClick={()=>setRoute(r)} style={{
                  display:"flex",alignItems:"center",gap:8,width:"100%",marginBottom:6,
                  background:color+"12",border:`1px solid ${color}30`,borderRadius:8,padding:"9px 12px",cursor:"pointer",color:C.tx2,fontSize:12,fontWeight:500,textAlign:"left",transition:"background 0.15s",
                }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background=color+"22"; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background=color+"12"; }}
                >
                  <Icon size={14} color={color}/>
                  <span style={{ flex:1 }}>{label}</span>
                  {badge && <Badge label={`${badge}`} color={C.red} size="xs"/>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: CONTRATOS
// ═══════════════════════════════════════════════════════════════════════════════
// ─── Novo Contrato Modal ──────────────────────────────────────────────────────
function NovoContratoModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:200,
      background:"rgba(6,14,10,0.85)",backdropFilter:"blur(4px)",
      display:"flex",alignItems:"flex-start",justifyContent:"center",
      paddingTop:48,overflowY:"auto",
    }} onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={{
        width:"100%",maxWidth:640,
        background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:14,
        overflow:"hidden",marginBottom:48,animation:"fade-up 0.25s ease",
      }}>
        {/* Modal header */}
        <div style={{ padding:"16px 22px",borderBottom:`1px solid ${C.bdSubtle}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bgCard2 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <FileText size={15} color={C.gold}/>
            <span style={{ fontSize:14,fontWeight:700,color:C.tx }}>Novo Contrato</span>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:4 }}><X size={15}/></button>
        </div>
        {/* Body */}
        <div style={{ padding:"22px",display:"flex",flexDirection:"column",gap:16 }}>
          <Select label="Obra *" options={["— Selecionar obra —",...OBRAS_LIST.map(o=>`${o.id} — ${o.nome}`)]}/>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            <Input label="Nº de Referência Interno (opcional)" placeholder="Ex: 001/2025"/>
            <Input label="Descrição *" placeholder="Ex: Serviços de gesso..."/>
          </div>
          <div>
            <div style={{ fontSize:10,fontWeight:600,color:C.tx3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:5 }}>Escopo <span style={{ color:C.tx3,fontWeight:400,textTransform:"none",fontSize:10 }}>— o que foi combinado / objeto do contrato</span></div>
            <textarea placeholder="Descreva o escopo detalhado do contrato..." style={{
              width:"100%",background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:8,
              padding:"10px 12px",fontSize:12,color:C.tx,resize:"vertical",minHeight:80,outline:"none",
            }}/>
          </div>
          <div>
            <div style={{ fontSize:10,fontWeight:600,color:C.tx3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:5 }}>Observação <span style={{ fontWeight:400,textTransform:"none",fontSize:10 }}>(opcional)</span></div>
            <textarea placeholder="Notas adicionais..." style={{
              width:"100%",background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:8,
              padding:"10px 12px",fontSize:12,color:C.tx,resize:"vertical",minHeight:60,outline:"none",
            }}/>
          </div>
          {/* Fornecedor */}
          <div>
            <div style={{ fontSize:10,fontWeight:600,color:C.tx3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:5 }}>Fornecedor <span style={{ fontWeight:400,textTransform:"none" }}>(opcional)</span></div>
            <div style={{ display:"flex",alignItems:"center",gap:7,background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:8,padding:"9px 12px" }}>
              <Search size={12} color={C.tx3}/>
              <input placeholder="Buscar fornecedor..." style={{ background:"none",border:"none",outline:"none",fontSize:12,color:C.tx,flex:1 }}/>
            </div>
          </div>
          {/* Tipo/Categoria */}
          <div style={{ background:C.bgCard2,border:`1px solid ${C.bdSubtle}`,borderRadius:8,padding:"14px" }}>
            <div style={{ fontSize:9,color:C.tx3,letterSpacing:0.8,marginBottom:10 }}>Tipo › Categoria › Subcategoria</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8 }}>
              <Select label="Tipo *"           options={["— Tipo —","Serviço","Material","Locação"]}/>
              <Select label="Categoria *"      options={["— Categoria —","Obra","Projeto","Equipamento"]}/>
              <Select label="Subcategoria *"   options={["— Subcategoria —"]}/>
              <Select label="Item (opcional)"  options={["— Item opcional —"]}/>
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
            <Input label="Valor Total *" placeholder="0,00" type="number"/>
            <Input label="Data de Início" placeholder="dd/mm/aaaa" type="date"/>
            <Input label="Data de Vencimento (opcional)" placeholder="dd/mm/aaaa" type="date"/>
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding:"14px 22px",borderTop:`1px solid ${C.bdSubtle}`,display:"flex",justifyContent:"flex-end",gap:8,background:C.bgCard2 }}>
          <button onClick={onClose} style={{ padding:"8px 16px",background:"none",border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}>Cancelar</button>
          <button style={{ padding:"8px 22px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>Salvar Contrato</button>
        </div>
      </div>
    </div>
  );
}

function ContratosPage() {
  const [filterObra,setFilterObra]     = useState("Todas as obras");
  const [filterStatus,setFilterStatus] = useState("Todos");
  const [search,setSearch]             = useState("");
  const [showModal,setShowModal]       = useState(false);

  const filtered = CONTRATOS_DATA.filter(c => {
    if (filterObra!=="Todas as obras" && c.obra!==filterObra) return false;
    if (filterStatus!=="Todos"        && c.status!==filterStatus) return false;
    if (search && !c.titulo.toLowerCase().includes(search.toLowerCase()) &&
        !c.forn.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusCounts = {
    Todos:     CONTRATOS_DATA.length,
    Ativos:    CONTRATOS_DATA.filter(c=>c.status==="Ativo").length,
    Encerrados:CONTRATOS_DATA.filter(c=>c.status==="Encerrado").length,
    Cancelados:0,
  };

  // [label, align]
  const colDefs: [string,"left"|"right"|"center"][] = [
    ["CONTRATO","left"], ["OBRA","left"], ["DESCRIÇÃO","left"], ["FORNECEDOR","left"],
    ["VALOR TOTAL","right"], ["PAGO","right"], ["RESTANTE","right"],
    ["PROGRESSO","left"], ["STATUS","center"], ["AÇÕES","center"],
  ];
  const cols   = colDefs.map(c=>c[0]);
  const widths = "104px 88px 1fr 180px 104px 104px 104px 140px 96px 80px";

  return (
    <>
      {showModal && <NovoContratoModal onClose={()=>setShowModal(false)}/>}
      <div style={{ display:"flex",flexDirection:"column",flex:1,overflow:"hidden" }}>
        <Header title="Contratos" sub="Contratos de obras com aditivos, documentos e medições vinculadas"
          actions={
            <button onClick={()=>setShowModal(true)} style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>
              <Plus size={13}/>Novo Contrato
            </button>
          }
        />
        <div style={{ flex:1,overflow:"hidden",display:"flex",flexDirection:"column",padding:"20px 24px",gap:14 }}>
          {/* Summary KPIs */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,flexShrink:0 }}>
            {[
              {label:"Total Contratos",  value:String(CONTRATOS_DATA.length),                                                   color:C.blue},
              {label:"Ativos",           value:String(CONTRATOS_DATA.filter(c=>c.status==="Ativo").length),                     color:C.green},
              {label:"Volume Total",     value:fmtMoney(CONTRATOS_DATA.reduce((s,c)=>s+c.total,0)),                             color:C.gold},
              {label:"Total Pago",       value:fmtMoney(CONTRATOS_DATA.reduce((s,c)=>s+c.pago,0)),                              color:C.green},
            ].map(k=>(
              <div key={k.label} style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderTop:`3px solid ${k.color}`,borderRadius:10,padding:"12px 14px" }}>
                <div style={{ fontSize:9,fontWeight:700,color:k.color,letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>{k.label}</div>
                <div style={{ fontSize:18,fontWeight:800,color:C.tx,letterSpacing:-0.5 }}>{k.value}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0,flexWrap:"wrap" }}>
            <select value={filterObra} onChange={e=>setFilterObra(e.target.value)} style={{ background:C.bgCard,border:`1px solid ${C.bd}`,color:C.tx2,borderRadius:8,padding:"6px 10px",fontSize:12,cursor:"pointer",outline:"none" }}>
              <option>Todas as obras</option>
              {OBRAS_LIST.map(o=><option key={o.id}>{o.nome}</option>)}
            </select>
            <div style={{ display:"flex",gap:3 }}>
              {Object.entries(statusCounts).map(([s,count])=>(
                <button key={s} onClick={()=>setFilterStatus(s)} style={{
                  padding:"5px 12px",borderRadius:7,
                  border:`1px solid ${filterStatus===s?C.gold:C.bd}`,
                  background:filterStatus===s?C.goldBg:"transparent",
                  color:filterStatus===s?C.gold:C.tx3,
                  fontSize:11,fontWeight:filterStatus===s?600:400,cursor:"pointer",
                  display:"flex",alignItems:"center",gap:5,
                }}>
                  {s}<span style={{ fontSize:9,background:C.bgCard,padding:"1px 5px",borderRadius:8,color:filterStatus===s?C.gold:C.tx3 }}>{count}</span>
                </button>
              ))}
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:7,background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,padding:"6px 10px",flex:1,minWidth:180 }}>
              <Search size={11} color={C.tx3}/>
              <input placeholder="Buscar por descrição ou fornecedor..." value={search} onChange={e=>setSearch(e.target.value)}
                style={{ background:"none",border:"none",outline:"none",fontSize:12,color:C.tx,width:"100%" }}/>
            </div>
            <span style={{ fontSize:11,color:C.tx3 }}>{filtered.length} contrato(s)</span>
          </div>

          {/* List table */}
          <div style={{ flex:1,overflow:"auto",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12 }}>
            {/* Header */}
            <div style={{ display:"grid",gridTemplateColumns:widths,padding:"10px 16px",gap:8,background:C.bgCard2,borderBottom:`2px solid ${C.bd}`,position:"sticky",top:0,zIndex:1,minWidth:1100 }}>
              {colDefs.map(([h,a])=>(
                <span key={h} style={{ fontSize:9,fontWeight:700,color:C.tx3,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap",textAlign:a,display:"block" }}>{h}</span>
              ))}
            </div>
            {filtered.length===0 && (
              <div style={{ padding:"40px",textAlign:"center",color:C.tx3,fontSize:13 }}>Nenhum contrato encontrado.</div>
            )}
            {filtered.map((c,i)=>{
              const pctPago = Math.round((c.pago/c.total)*100);
              const restante = c.total - c.pago;
              const sc = statusColor(c.status);
              return (
                <div key={c.id} style={{
                  display:"grid",gridTemplateColumns:widths,
                  padding:"12px 16px",gap:8,
                  borderBottom:`1px solid ${C.bdSubtle}`,
                  transition:"background 0.1s",
                  animation:`fade-up 0.2s ${i*0.04}s ease both`,
                  alignItems:"center",minWidth:1100,
                }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background=C.bgHover; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background="transparent"; }}
                >
                  <div>
                    <div style={{ fontSize:11,fontWeight:700,color:C.gold,letterSpacing:0.3 }}>{c.id}</div>
                    {c.ref && <div style={{ fontSize:9,color:C.tx3,marginTop:2 }}>{c.ref}</div>}
                  </div>
                  <div><Badge label={c.cod} color={C.blue} size="xs"/></div>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:12,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} title={c.titulo}>{c.titulo}</div>
                    <div style={{ fontSize:10,color:C.tx3,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{c.obra}</div>
                  </div>
                  <span style={{ fontSize:11,color:C.tx2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }} title={c.forn}>{c.forn}</span>
                  <span style={{ fontSize:12,fontWeight:600,color:C.tx,textAlign:"right",display:"block" }}>{fmtMoney(c.total)}</span>
                  <span style={{ fontSize:12,fontWeight:600,color:C.green,textAlign:"right",display:"block" }}>{fmtMoney(c.pago)}</span>
                  <span style={{ fontSize:12,fontWeight:600,color:restante>0?C.amber:C.tx3,textAlign:"right",display:"block" }}>{fmtMoney(restante)}</span>
                  <div>
                    <ProgressBar pct={pctPago} color={pctPago===100?C.green:C.gold}/>
                    <div style={{ fontSize:9,color:C.tx3,marginTop:3 }}>{pctPago}%{pctPago===100?" · Quitado":""}</div>
                  </div>
                  <div style={{ display:"flex",justifyContent:"center" }}><Badge label={c.status} color={sc} size="xs"/></div>
                  <div style={{ display:"flex",gap:4,justifyContent:"center" }}>
                    <button style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:4 }}><Eye size={13}/></button>
                    <button style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:4 }}><Pencil size={13}/></button>
                    <button style={{ background:"none",border:"none",cursor:"pointer",color:C.red+"70",padding:4 }}><Trash2 size={13}/></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: FORNECEDORES
// ═══════════════════════════════════════════════════════════════════════════════
const FORNECEDORES_DATA = [
  { id:"F-001", nome:"Pagamento Manoel",         resp:"—",     tel:"sem tel",         email:"",                              tipo:"Outros",             cat:"Mão de obra", cidade:"",               uf:"MG", status:"Ativo",    completar:true,  totalGasto:850000,  totalPago:850000,  pendente:0,       ultimoPag:"10/04/25" },
  { id:"F-002", nome:"Marcelo",                  resp:"—",     tel:"sem tel",         email:"",                              tipo:"Outros",             cat:"Mão de obra", cidade:"",               uf:"MG", status:"Ativo",    completar:true,  totalGasto:800000,  totalPago:800000,  pendente:0,       ultimoPag:"28/02/25" },
  { id:"F-003", nome:"Marcio Delmires Coronel",  resp:"Marcio",tel:"31 971769978",    email:"marciodelmires@gmail.com",      tipo:"Mão de obra geral",  cat:"Mão de obra", cidade:"São José da Lapa",uf:"MG", status:"Ativo",    completar:false, totalGasto:616746, totalPago:614746, pendente:2000,    ultimoPag:"há 10d"   },
  { id:"F-004", nome:"L10 Engenharia",           resp:"—",     tel:"sem tel",         email:"",                              tipo:"Serviço",            cat:"",            cidade:"",               uf:"",   status:"Ativo",    completar:false, totalGasto:489000,  totalPago:489000,  pendente:0,       ultimoPag:"há 4d"    },
  { id:"F-005", nome:"Lote",                     resp:"—",     tel:"sem tel",         email:"",                              tipo:"Outros",             cat:"Mão de obra", cidade:"",               uf:"MG", status:"Ativo",    completar:true,  totalGasto:288000,  totalPago:288000,  pendente:0,       ultimoPag:"24/05/25" },
  { id:"F-006", nome:"Bdmg",                     resp:"—",     tel:"sem tel",         email:"",                              tipo:"Financeiro",         cat:"",            cidade:"",               uf:"MG", status:"Ativo",    completar:false, totalGasto:213000,  totalPago:213000,  pendente:0,       ultimoPag:"12/09/26" },
  { id:"F-007", nome:"BH Esquadrias",            resp:"—",     tel:"sem tel",         email:"",                              tipo:"Material",           cat:"",            cidade:"Belo Horizonte", uf:"MG", status:"Ativo",    completar:false, totalGasto:96886,   totalPago:20000,   pendente:76886,   ultimoPag:"08/09/26" },
  { id:"F-008", nome:"Peg Leve Armários - Ivanei",resp:"—",   tel:"sem tel",         email:"",                              tipo:"Serviço",            cat:"",            cidade:"",               uf:"",   status:"Ativo",    completar:false, totalGasto:47000,   totalPago:23500,   pendente:23500,   ultimoPag:"01/09/26" },
];

function FornecedoresPage() {
  const [search,setSearch]             = useState("");
  const [filterTipo,setFilterTipo]     = useState("");
  const [filterStatus,setFilterStatus] = useState("");
  const [filterObra,setFilterObra]     = useState("");
  const [showMesclados,setShowMesclados] = useState(false);

  const filtered = FORNECEDORES_DATA.filter(f => {
    if (filterStatus && f.status!==filterStatus) return false;
    if (search && !f.nome.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const ativos       = FORNECEDORES_DATA.filter(f=>f.status==="Ativo").length;
  const completar    = FORNECEDORES_DATA.filter(f=>f.completar).length;
  const inativos     = 0;
  const totalPagoG   = FORNECEDORES_DATA.reduce((s,f)=>s+f.totalPago,0);

  const colWidths = "1fr 96px 160px 112px 120px 88px 120px 120px 96px 96px 72px";
  const fornColDefs: [string,"left"|"right"|"center"][] = [
    ["NOME / EMPRESA","left"], ["RESPONSÁVEL","left"], ["CONTATO","left"],
    ["TIPO / CAT.","left"], ["CIDADE/UF","left"], ["STATUS","center"],
    ["TOTAL GASTO","right"], ["TOTAL PAGO","right"], ["PENDENTE","right"],
    ["ÚLTIMO PAG.","left"], ["AÇÕES","center"],
  ];
  const cols = fornColDefs.map(c=>c[0]);

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1,overflow:"hidden" }}>
      <Header title="Fornecedores" sub="Cadastro central de fornecedores · 390+ registros"
        actions={
          <>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 12px",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}>
              <Download size={12}/>Importar dos Lançamentos
            </button>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>
              <Plus size={13}/>Novo Fornecedor
            </button>
          </>
        }
      />
      <div style={{ flex:1,overflow:"hidden",display:"flex",flexDirection:"column",padding:"20px 24px",gap:14 }}>
        {/* KPI strip */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,flexShrink:0 }}>
          {[
            {label:"Ativos",             value:String(ativos),        color:C.green},
            {label:"A Completar Cadastro",value:String(completar),    color:C.amber},
            {label:"Inativos",           value:String(inativos),      color:C.tx3},
            {label:"Total Pago Geral",   value:fmtMoney(totalPagoG),  color:C.gold},
          ].map(k=>(
            <div key={k.label} style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderTop:`3px solid ${k.color}`,borderRadius:10,padding:"12px 16px" }}>
              <div style={{ fontSize:9,fontWeight:700,color:k.color,letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>{k.label}</div>
              <div style={{ fontSize:22,fontWeight:800,color:C.tx,letterSpacing:-0.5 }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Filters + actions */}
        <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0,flexWrap:"wrap" }}>
          <div style={{ display:"flex",alignItems:"center",gap:7,background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,padding:"6px 10px",flex:1,minWidth:180 }}>
            <Search size={11} color={C.tx3}/>
            <input placeholder="Buscar nome ou responsável..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ background:"none",border:"none",outline:"none",fontSize:12,color:C.tx,width:"100%" }}/>
          </div>
          {[
            {label:"Todos tipos", val:filterTipo, set:setFilterTipo, opts:["","Serviço","Material","Mão de obra geral","Financeiro","Outros"]},
            {label:"Todos status",val:filterStatus,set:setFilterStatus,opts:["","Ativo","Inativo"]},
            {label:"Todas obras", val:filterObra, set:setFilterObra,  opts:["","OBR-001","OBR-002","OBR-003","OBR-004","OBR-005"]},
          ].map(f=>(
            <select key={f.label} value={f.val} onChange={e=>f.set(e.target.value)} style={{
              background:C.bgCard,border:`1px solid ${f.val?C.gold:C.bd}`,color:f.val?C.gold:C.tx3,
              borderRadius:8,padding:"6px 10px",fontSize:12,cursor:"pointer",outline:"none",
            }}>
              {f.opts.map(o=><option key={o} value={o}>{o||f.label}</option>)}
            </select>
          ))}
          <button onClick={()=>setShowMesclados(!showMesclados)} style={{
            padding:"6px 10px",background:showMesclados?C.goldBg:C.bgCard,
            border:`1px solid ${showMesclados?C.gold:C.bd}`,borderRadius:8,
            color:showMesclados?C.gold:C.tx3,fontSize:11,cursor:"pointer",
          }}>Mostrar mesclados (102)</button>
          <span style={{ fontSize:11,color:C.tx3,marginLeft:"auto" }}>{filtered.length} fornecedores</span>
        </div>

        {/* Collapsible sections */}
        {[
          { label:"Top 5 Fornecedores — Maior valor gasto", count:null },
          { label:"Revisão de Vínculos de Fornecedor",      count:14 },
        ].map(s=>(
          <div key={s.label} style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:10,overflow:"hidden",flexShrink:0 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 16px",cursor:"pointer" }}>
              <TrendingUp size={13} color={s.count?C.amber:C.gold}/>
              <span style={{ fontSize:12,fontWeight:600,color:C.tx,flex:1 }}>{s.label}</span>
              {s.count && <Badge label={`${s.count} pendentes`} color={C.amber} size="xs"/>}
              <ChevronDown size={13} color={C.tx3}/>
            </div>
          </div>
        ))}

        {/* Table */}
        <div style={{ flex:1,overflow:"auto",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12 }}>
          <div style={{ display:"grid",gridTemplateColumns:colWidths,padding:"10px 16px",gap:8,background:C.bgCard2,borderBottom:`2px solid ${C.bd}`,position:"sticky",top:0,zIndex:1,minWidth:1180 }}>
            {fornColDefs.map(([h,a])=>(
              <span key={h} style={{ fontSize:9,fontWeight:700,color:C.tx3,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap",textAlign:a,display:"block" }}>{h}</span>
            ))}
          </div>
          {filtered.map((f,i)=>(
            <div key={f.id} style={{
              display:"grid",gridTemplateColumns:colWidths,
              padding:"12px 16px",gap:8,borderBottom:`1px solid ${C.bdSubtle}`,
              transition:"background 0.1s",animation:`fade-up 0.2s ${i*0.03}s ease both`,
              alignItems:"center",minWidth:1180,
            }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background=C.bgHover; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background="transparent"; }}
            >
              {/* Nome */}
              <div style={{ display:"flex",alignItems:"center",gap:8,minWidth:0 }}>
                <div style={{
                  width:28,height:28,borderRadius:7,background:C.greenDim,flexShrink:0,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:10,fontWeight:700,color:C.greenLt,
                }}>
                  {f.nome.charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:12,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} title={f.nome}>{f.nome}</div>
                  {f.completar && <div style={{ fontSize:9,color:C.amber,marginTop:2 }}>⚠ completar cadastro</div>}
                </div>
              </div>
              <span style={{ fontSize:11,color:f.resp==="—"?C.tx3:C.tx2,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{f.resp}</span>
              <div style={{ minWidth:0 }}>
                {f.tel!=="sem tel" ? (
                  <div style={{ fontSize:11,color:C.tx2,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap" }}>
                    <span style={{ fontSize:9 }}>📞</span>{f.tel}
                  </div>
                ) : <span style={{ fontSize:11,color:C.tx3 }}>—</span>}
                {f.email && <div style={{ fontSize:10,color:C.blue,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:2 }} title={f.email}>{f.email}</div>}
              </div>
              <div>
                <Badge label={f.tipo} color={C.purple} size="xs"/>
                {f.cat && <div style={{ marginTop:3 }}><Badge label={f.cat} color={C.tx3} size="xs"/></div>}
              </div>
              <span style={{ fontSize:11,color:C.tx3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }}>
                {f.cidade ? `${f.cidade}/${f.uf}` : f.uf ? f.uf : "—"}
              </span>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:3 }}>
                <Badge label={f.status} color={statusColor(f.status)} size="xs"/>
              </div>
              <span style={{ fontSize:12,fontWeight:600,color:C.tx,textAlign:"right",display:"block",whiteSpace:"nowrap" }}>{fmtMoney(f.totalGasto)}</span>
              <span style={{ fontSize:12,fontWeight:600,color:C.green,textAlign:"right",display:"block",whiteSpace:"nowrap" }}>{fmtMoney(f.totalPago)}</span>
              <span style={{ fontSize:12,fontWeight:600,color:f.pendente>0?C.red:C.tx3,textAlign:"right",display:"block",whiteSpace:"nowrap" }}>
                {f.pendente>0?fmtMoney(f.pendente):"—"}
              </span>
              <span style={{ fontSize:11,color:C.tx3,whiteSpace:"nowrap" }}>{f.ultimoPag}</span>
              <div style={{ display:"flex",gap:4,justifyContent:"center" }}>
                <button style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:4 }}><Eye size={12}/></button>
                <button style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:4 }}><Pencil size={12}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: DIÁRIO DE OBRAS (global)
// ═══════════════════════════════════════════════════════════════════════════════
function DiarioGlobalPage({ setRoute }:{ setRoute:(r:string)=>void }) {
  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1,overflow:"hidden" }}>
      <Header title="Diário de Obras" sub="Evolução fotográfica por obra"
        actions={
          <>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}>
              <Share2 size={12}/>Links Públicos
            </button>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>
              <Plus size={13}/>Novo Registro
            </button>
          </>
        }
      />
      <div style={{ flex:1,overflowY:"auto",padding:"24px",display:"flex",flexDirection:"column",gap:20 }}>
        {/* Stats strip */}
        <div style={{ display:"flex",gap:12 }}>
          {[
            { label:"obras ativas", value:"2" },
            { label:"fotos",        value:"27" },
            { label:"registros",    value:"5" },
          ].map(s=>(
            <div key={s.label} style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:10,padding:"12px 20px",display:"flex",alignItems:"center",gap:10 }}>
              <span style={{ fontSize:22,fontWeight:800,color:C.gold,letterSpacing:-0.5 }}>{s.value}</span>
              <span style={{ fontSize:12,color:C.tx2 }}>{s.label}</span>
            </div>
          ))}
        </div>
        {/* Obra photo cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14 }}>
          {OBRAS_LIST.map((o,i)=>{
            const sc = statusColor(o.status);
            return (
              <div key={o.id} onClick={()=>setRoute(`/diario/${i+1}`)} style={{
                background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:14,overflow:"hidden",cursor:"pointer",
                transition:"all 0.2s",animation:`fade-up 0.3s ${i*0.06}s ease both`,
              }}
                onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=C.gold+"80"; el.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=C.bd; el.style.transform="translateY(0)"; }}
              >
                {/* Photo */}
                <div style={{ position:"relative",height:160,overflow:"hidden",background:C.bgCard2 }}>
                  <img src={o.img} alt={o.nome} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                  <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(6,14,10,0.85))" }}/>
                  {/* Overlays */}
                  <div style={{ position:"absolute",top:10,left:10 }}>
                    <Badge label={`${o.fotos} fotos`} color={C.tx3} size="xs"/>
                  </div>
                  <Badge label={o.status} color={sc} size="xs"/>
                  <div style={{ position:"absolute",top:10,right:10 }}>
                    <Badge label={o.status} color={sc} size="xs"/>
                  </div>
                  {o.fotos===0 && (
                    <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8 }}>
                      <div style={{ fontSize:48,fontWeight:900,color:C.bgCard2+"80",letterSpacing:-2 }}>{o.id.replace("OBR-","0")}</div>
                    </div>
                  )}
                  <div style={{ position:"absolute",bottom:10,left:12 }}>
                    <div style={{ fontSize:14,fontWeight:800,color:"#fff",letterSpacing:-0.3 }}>{o.nome}</div>
                    <div style={{ display:"flex",alignItems:"center",gap:5,marginTop:2 }}>
                      <MapPin size={10} color={C.tx3}/>
                      <span style={{ fontSize:11,color:C.tx3 }}>Lagoa Santa</span>
                    </div>
                  </div>
                </div>
                {/* Stats */}
                <div style={{ padding:"12px 14px" }}>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12 }}>
                    {[
                      { l:"fotos",      v:String(o.fotos) },
                      { l:"registros",  v:"0" },
                      { l:"execução",   v:`${o.execPct}%` },
                    ].map(({l,v})=>(
                      <div key={l} style={{ textAlign:"center" }}>
                        <div style={{ fontSize:16,fontWeight:800,color:l==="execução"?C.gold:C.tx,letterSpacing:-0.3 }}>{v}</div>
                        <div style={{ fontSize:9,color:C.tx3,marginTop:1 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom:10 }}>
                    <ProgressBar pct={o.execPct} color={o.execPct===100?C.green:C.greenLt}/>
                  </div>
                  <div style={{ display:"flex",gap:6 }}>
                    {["Ver","Foto","Capa","Ficha"].map(btn=>(
                      <button key={btn} style={{
                        flex:1,padding:"6px 0",background:C.bgCard2,border:`1px solid ${C.bdSubtle}`,
                        borderRadius:7,cursor:"pointer",color:C.tx2,fontSize:11,fontWeight:500,
                      }}>{btn}</button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: DIÁRIO DE OBRA INDIVIDUAL
// ═══════════════════════════════════════════════════════════════════════════════
function DiarioObraPage({ obraIdx, setRoute }:{ obraIdx:number; setRoute:(r:string)=>void }) {
  const obra = OBRAS_LIST[obraIdx] ?? OBRAS_LIST[0];
  const [tab,setTab] = useState("Diário de Obra");
  const TABS_D = ["Diário de Obra","Bloco de Notas","Atas de Reunião","Planejamento","Memória de Cálculo"];
  const sc = statusColor(obra.status);

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1,overflow:"hidden" }}>
      <Header title="Diário de Obra" sub={`${obra.id} — ${obra.nome}`}
        actions={
          <>
            <button onClick={()=>setRoute("/diario")} style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 10px",background:"none",border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}>
              <ChevronLeft size={12}/>Diário
            </button>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}>
              <Share2 size={12}/>Compartilhar
            </button>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>
              <Plus size={13}/>Novo Registro
            </button>
          </>
        }
      />
      <div style={{ flex:1,overflowY:"auto",padding:"20px 24px",display:"flex",flexDirection:"column",gap:16 }}>
        {/* Obra identity card */}
        <div style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,overflow:"hidden" }}>
          <div style={{ display:"flex",gap:0 }}>
            <div style={{ width:100,height:80,flexShrink:0,overflow:"hidden",background:C.bgCard2 }}>
              <img src={obra.img} alt={obra.nome} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
            </div>
            <div style={{ flex:1,padding:"14px 18px",display:"flex",alignItems:"center",gap:20 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
                  <span style={{ fontSize:16,fontWeight:800,color:C.tx,letterSpacing:-0.3 }}>{obra.nome}</span>
                  <Badge label={obra.status} color={sc}/>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                  <MapPin size={11} color={C.tx3}/>
                  <span style={{ fontSize:11,color:C.tx3 }}>Lagoa Santa, MG</span>
                </div>
              </div>
              {/* Stats */}
              <div style={{ display:"flex",gap:20 }}>
                {[
                  { v:String(obra.fotos),  l:"Fotos" },
                  { v:"1",                  l:"Fotos portal" },
                  { v:"0",                  l:"Reg. portal" },
                  { v:"0",                  l:"Registros" },
                  { v:`${obra.execPct}%`,   l:"Execução" },
                  { v:"0",                  l:"Etapas" },
                ].map(({v,l})=>(
                  <div key={l} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:18,fontWeight:800,color:l==="Execução"?C.gold:C.tx,letterSpacing:-0.3 }}>{v}</div>
                    <div style={{ fontSize:9,color:C.tx3,marginTop:1 }}>{l}</div>
                  </div>
                ))}
                <div style={{ width:140 }}>
                  <div style={{ fontSize:9,color:C.tx3,marginBottom:4 }}>Progresso</div>
                  <ProgressBar pct={obra.execPct} color={obra.execPct===100?C.green:C.greenLt}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investor link */}
        <div style={{ background:C.blueBg,border:`1px solid ${C.blue}30`,borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:10 }}>
          <Link size={14} color={C.blue} style={{ flexShrink:0 }}/>
          <span style={{ fontSize:12,color:C.blue,fontWeight:500 }}>Link para investidores — visualização somente leitura</span>
          <div style={{ flex:1,background:C.bgCard2,border:`1px solid ${C.bdSubtle}`,borderRadius:7,padding:"6px 12px" }}>
            <span style={{ fontSize:11,color:C.tx3,fontFamily:"monospace" }}>https://acasa-gestao.netlify.app/diario/{obra.id.toLowerCase()}/pub</span>
          </div>
          <button style={{ display:"flex",alignItems:"center",gap:5,padding:"6px 12px",background:C.blue+"20",border:`1px solid ${C.blue}40`,borderRadius:7,color:C.blue,fontSize:11,fontWeight:600,cursor:"pointer" }}>
            <Copy size={11}/>Copiar
          </button>
          <button style={{ display:"flex",alignItems:"center",gap:5,padding:"6px 12px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:7,color:"#0a0a0a",fontSize:11,fontWeight:700,cursor:"pointer" }}>
            <Share2 size={11}/>Compartilhar
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex",gap:4,borderBottom:`1px solid ${C.bdSubtle}`,paddingBottom:0 }}>
          {TABS_D.map(t=>{
            const icons:Record<string,any>={
              "Diário de Obra":Camera,"Bloco de Notas":StickyNote,
              "Atas de Reunião":BookMarked,"Planejamento":Layers,"Memória de Cálculo":Calculator,
            };
            const Icon = icons[t];
            return (
              <button key={t} onClick={()=>setTab(t)} style={{
                display:"flex",alignItems:"center",gap:6,padding:"9px 14px",border:"none",background:"none",cursor:"pointer",
                fontSize:12,fontWeight:tab===t?700:400,color:tab===t?C.gold:C.tx3,
                borderBottom:tab===t?`2px solid ${C.gold}`:"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap",
              }}>
                <Icon size={12}/>{t}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {tab==="Diário de Obra" && (
          <div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
              <div style={{ display:"flex",gap:4 }}>
                <Pill label="Todos" active={true} onClick={()=>{}}/>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ display:"flex",alignItems:"center",gap:7,background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,padding:"6px 10px" }}>
                  <Search size={11} color={C.tx3}/>
                  <input placeholder="Buscar registros..." style={{ background:"none",border:"none",outline:"none",fontSize:12,color:C.tx2,width:140 }}/>
                </div>
                <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>
                  <Plus size={12}/>Registro
                </button>
              </div>
            </div>
            {/* Empty state */}
            <div style={{ textAlign:"center",padding:"60px 20px",background:C.bgCard,border:`1px dashed ${C.bd}`,borderRadius:12 }}>
              <Camera size={40} color={C.tx3} style={{ margin:"0 auto 14px" }}/>
              <div style={{ fontSize:14,fontWeight:600,color:C.tx2,marginBottom:6 }}>Nenhum registro ainda</div>
              <div style={{ fontSize:12,color:C.tx3,marginBottom:16 }}>Comece registrando o diário fotográfico desta obra</div>
              <button style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"9px 18px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>
                <Plus size={13}/>Criar primeiro registro
              </button>
            </div>
          </div>
        )}

        {tab==="Bloco de Notas" && (
          <div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
              <div>
                <div style={{ fontSize:15,fontWeight:800,color:C.tx,marginBottom:2 }}>Checklist de Obra</div>
                <div style={{ fontSize:11,color:C.tx3 }}>Pendências, tarefas e decisões</div>
              </div>
              <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>
                <Plus size={13}/>Adicionar
              </button>
            </div>
            <div style={{ display:"flex",gap:6,marginBottom:16,flexWrap:"wrap" }}>
              {[
                {l:"Todas",color:C.tx2},{l:"Urgente",color:C.red},{l:"Importante",color:C.amber},
                {l:"Tarefa",color:C.green},{l:"Info",color:C.blue},{l:"Concluídas",color:C.tx3},
              ].map(({l,color})=>(
                <button key={l} style={{
                  padding:"4px 12px",borderRadius:20,border:`1px solid ${color}40`,
                  background:l==="Todas"?color+"20":"transparent",color,fontSize:11,fontWeight:500,cursor:"pointer",
                }}>{l}</button>
              ))}
            </div>
            <div style={{ textAlign:"center",padding:"50px 20px",background:C.bgCard,border:`1px dashed ${C.bd}`,borderRadius:12,marginBottom:16 }}>
              <ClipboardList size={36} color={C.tx3} style={{ margin:"0 auto 12px" }}/>
              <div style={{ fontSize:13,fontWeight:600,color:C.tx2,marginBottom:4 }}>Nenhuma tarefa aberta</div>
              <div style={{ fontSize:11,color:C.tx3 }}>Clique em + Adicionar para criar a primeira</div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10 }}>
              {[{l:"Concluídas",v:"0",c:C.green},{l:"Abertas",v:"0",c:C.amber},{l:"Urgentes",v:"0",c:C.red},{l:"Total",v:"0",c:C.tx2}].map(({l,v,c})=>(
                <div key={l} style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:10,padding:"14px",textAlign:"center" }}>
                  <div style={{ fontSize:24,fontWeight:800,color:c,letterSpacing:-0.5 }}>{v}</div>
                  <div style={{ fontSize:9,fontWeight:700,color:C.tx3,letterSpacing:1,textTransform:"uppercase",marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="Atas de Reunião" && (
          <div style={{ display:"grid",gridTemplateColumns:"1fr 320px",gap:16 }}>
            {/* Form */}
            <div style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,padding:"20px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
                <div style={{ fontSize:14,fontWeight:700,color:C.gold,display:"flex",alignItems:"center",gap:8 }}>
                  <BookMarked size={16} color={C.gold}/>Nova Ata de Reunião
                </div>
                <div style={{ display:"flex",gap:8 }}>
                  <button style={{ padding:"6px 12px",background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:7,color:C.tx2,fontSize:11,cursor:"pointer" }}>Preview</button>
                  <button style={{ padding:"6px 14px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:7,color:"#0a0a0a",fontSize:11,fontWeight:700,cursor:"pointer" }}>+ Criar</button>
                </div>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr",gap:10 }}>
                  <Input label="Identificação — Título da Reunião *" placeholder="Ex: Reunião semanal, Visita técnica..."/>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                  <Input label="Data *" placeholder="15/09/2026" type="date"/>
                  <Input label="Horário" placeholder="10:00" type="time"/>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                  <Input label="Local" placeholder="Escritório, obra, online..."/>
                  <Select label="Tipo" options={["Alinhamento geral","Visita técnica","Reunião semanal","Outro"]}/>
                </div>
                <div>
                  <div style={{ fontSize:10,fontWeight:600,color:C.tx3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:8 }}>Participantes</div>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {["Matheus","Tharyque","Laio","João (Mestre)","Engenheiro","Investidor"].map(p=>(
                      <div key={p} style={{ display:"flex",alignItems:"center",gap:5,padding:"4px 10px",background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:20,cursor:"pointer" }}>
                        <Users2 size={10} color={C.tx3}/>
                        <span style={{ fontSize:11,color:C.tx2 }}>{p}</span>
                      </div>
                    ))}
                    <button style={{ padding:"4px 10px",background:"none",border:`1px dashed ${C.bd}`,borderRadius:20,color:C.tx3,fontSize:11,cursor:"pointer" }}>+ Outro</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:10,fontWeight:600,color:C.tx3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:8 }}>Pauta</div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:8,marginBottom:6 }}>
                    <span style={{ fontSize:11,color:C.tx3 }}>1.</span>
                    <input placeholder="Item 1 da pauta..." style={{ flex:1,background:"none",border:"none",outline:"none",fontSize:12,color:C.tx }}/>
                  </div>
                  <button style={{ fontSize:11,color:C.gold,background:"none",border:"none",cursor:"pointer",padding:"4px 0" }}>+ Adicionar item à pauta</button>
                </div>
                <div>
                  <div style={{ fontSize:10,fontWeight:600,color:C.tx3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:8 }}>Conteúdo da Ata</div>
                  <div style={{ background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:8 }}>
                    <div style={{ display:"flex",gap:8,padding:"8px 12px",borderBottom:`1px solid ${C.bdSubtle}` }}>
                      {["B","I","U","•","1.","H1","H2","ℹ"].map(t=>(
                        <button key={t} style={{ padding:"3px 7px",background:"none",border:"none",cursor:"pointer",color:C.tx3,fontSize:12,fontWeight:t==="B"?"bold":"normal",borderRadius:4 }}>{t}</button>
                      ))}
                    </div>
                    <textarea placeholder="Descreva o que foi discutido..." style={{ width:"100%",background:"none",border:"none",outline:"none",padding:"12px",fontSize:12,color:C.tx,resize:"none",minHeight:100 }}/>
                  </div>
                </div>
              </div>
            </div>
            {/* Atas list */}
            <div style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,padding:"16px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <span style={{ fontSize:12,fontWeight:700,color:C.tx }}>Atas Registradas</span>
                <div style={{ display:"flex",alignItems:"center",gap:7,background:C.bgCard2,border:`1px solid ${C.bd}`,borderRadius:7,padding:"5px 8px" }}>
                  <Search size={10} color={C.tx3}/>
                  <input placeholder="Buscar..." style={{ background:"none",border:"none",outline:"none",fontSize:11,color:C.tx2,width:80 }}/>
                </div>
              </div>
              <div style={{ textAlign:"center",padding:"40px 10px" }}>
                <BookMarked size={32} color={C.tx3} style={{ margin:"0 auto 10px" }}/>
                <div style={{ fontSize:12,color:C.tx2,marginBottom:4 }}>Nenhuma ata registrada</div>
                <div style={{ fontSize:11,color:C.tx3 }}>Preencha o formulário ao lado para criar a primeira ata.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: LANÇAMENTOS
// ═══════════════════════════════════════════════════════════════════════════════
function LancamentosPage() {
  const [tabActive,setTabActive] = useState("Lançamentos");
  const [filterObra,setFilterObra] = useState("");
  const [filterStatus,setFilterStatus] = useState("");
  const [filterTipo,setFilterTipo] = useState("");
  const [search,setSearch] = useState("");

  const filtered = LANCAMENTOS_DATA.filter(l => {
    if (filterObra   && l.obra   !== filterObra)   return false;
    if (filterStatus && l.status !== filterStatus) return false;
    if (filterTipo   && l.tipo   !== filterTipo)   return false;
    if (search && !l.desc.toLowerCase().includes(search.toLowerCase()) && !l.forn.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalCustos = filtered.reduce((s,l)=>s+l.total,0);
  const totalPago   = filtered.reduce((s,l)=>s+l.pago,0);
  const pendente    = totalCustos - totalPago;
  const saldo       = totalPago - totalCustos;

  const summaryCards = [
    { label:"Total Custos", value:fmtMoney(totalCustos), sub:`${filtered.length} lançamentos`, color:C.blue,  icon:Banknote },
    { label:"Total Pago",   value:fmtMoney(totalPago),   sub:`${Math.round((totalPago/totalCustos||0)*100)}% do total`, color:C.green, icon:CheckCheck },
    { label:"Pendente",     value:fmtMoney(pendente),    sub:"a pagar",                        color:C.amber, icon:Clock },
    { label:"Saldo",        value:fmtMoney(saldo),       sub:saldo>=0?"positivo":"negativo",   color:saldo>=0?C.green:C.red, icon:Wallet },
  ];

  const colWidths = "72px 80px 1fr 140px 72px 120px 100px 96px 96px 56px 88px 32px 72px 80px";
  // [label, align]
  const lancColDefs: [string,"left"|"right"|"center"][] = [
    ["DATA","left"], ["OBRA","left"], ["DESCRIÇÃO","left"], ["FORNECEDOR","left"],
    ["TIPO","left"], ["CATEGORIA","left"], ["SUBCAT.","left"],
    ["TOTAL","right"], ["PAGO","right"],
    ["FORMA","center"], ["STATUS","center"], ["NF","center"],
    ["PAGO POR","left"], ["AÇÕES","center"],
  ];
  const cols = lancColDefs.map(c=>c[0]);

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1,overflow:"hidden" }}>
      <Header title="Lançamentos" sub={`Controle financeiro · ${LANCAMENTOS_DATA.length} registros`}
        actions={
          <>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 10px",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}><RefreshCw size={12}/>Atualizar</button>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 10px",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}><Download size={12}/>PDF</button>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 10px",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}><Download size={12}/>CSV</button>
            <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}><Plus size={13}/>Novo Lançamento</button>
          </>
        }
      />
      {/* Tabs */}
      <div style={{ display:"flex",padding:"0 24px",borderBottom:`1px solid ${C.bdSubtle}`,background:C.bgDeep,flexShrink:0 }}>
        {["Lançamentos","Entradas de Capital","Consolidado"].map(t=>(
          <button key={t} onClick={()=>setTabActive(t)} style={{
            padding:"10px 16px",border:"none",background:"none",cursor:"pointer",
            fontSize:12,fontWeight:tabActive===t?700:400,color:tabActive===t?C.gold:C.tx3,
            borderBottom:tabActive===t?`2px solid ${C.gold}`:"2px solid transparent",marginBottom:-1,
          }}>{t}</button>
        ))}
      </div>
      <div style={{ flex:1,overflow:"hidden",display:"flex",flexDirection:"column",padding:"20px 24px",gap:14 }}>
        {/* 4 summary cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,flexShrink:0 }}>
          {summaryCards.map(c=>{
            const Icon=c.icon;
            return (
              <div key={c.label} style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderTop:`3px solid ${c.color}`,borderRadius:12,padding:"14px 16px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
                  <span style={{ fontSize:9,fontWeight:700,color:c.color,letterSpacing:1,textTransform:"uppercase" }}>{c.label}</span>
                  <div style={{ width:26,height:26,borderRadius:7,background:c.color+"18",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <Icon size={13} color={c.color}/>
                  </div>
                </div>
                <div style={{ fontSize:20,fontWeight:800,color:C.tx,letterSpacing:-0.6,lineHeight:1,marginBottom:4 }}>{c.value}</div>
                <div style={{ fontSize:10,color:C.tx3 }}>{c.sub}</div>
              </div>
            );
          })}
        </div>
        {/* Filters */}
        <div style={{ display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",flexShrink:0 }}>
          {[
            {label:"Obras",   val:filterObra,   set:setFilterObra,   opts:["","OBR-001","OBR-002","OBR-003","OBR-004","OBR-005"]},
            {label:"Status",  val:filterStatus, set:setFilterStatus, opts:["","Pago","Aguardando","Não pago","Parcial","Cancelado"]},
            {label:"Tipo",    val:filterTipo,   set:setFilterTipo,   opts:["","Indireto","Material","Serviço","Mão de Obra","Locação"]},
          ].map(f=>(
            <select key={f.label} value={f.val} onChange={e=>f.set(e.target.value)} style={{
              background:C.bgCard,border:`1px solid ${f.val?C.gold:C.bd}`,color:f.val?C.gold:C.tx3,
              borderRadius:8,padding:"6px 10px",fontSize:12,cursor:"pointer",outline:"none",
            }}>
              {f.opts.map(o=><option key={o} value={o}>{o||f.label}</option>)}
            </select>
          ))}
          <div style={{ display:"flex",alignItems:"center",gap:7,background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:8,padding:"6px 10px",flex:1,minWidth:180 }}>
            <Search size={11} color={C.tx3}/>
            <input placeholder="Buscar por descrição, fornecedor ou valor..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ background:"none",border:"none",outline:"none",fontSize:12,color:C.tx,width:"100%" }}/>
          </div>
          {(filterObra||filterStatus||filterTipo||search) && (
            <button onClick={()=>{setFilterObra("");setFilterStatus("");setFilterTipo("");setSearch(""); }} style={{
              display:"flex",alignItems:"center",gap:5,background:C.redBg,border:`1px solid ${C.red}40`,borderRadius:8,padding:"6px 10px",cursor:"pointer",color:C.red,fontSize:12,
            }}><X size={12}/>Limpar</button>
          )}
          <span style={{ fontSize:11,color:C.tx3,marginLeft:"auto" }}>{filtered.length} de {LANCAMENTOS_DATA.length}</span>
        </div>
        {/* Table */}
        <div style={{ flex:1,overflow:"auto",background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12 }}>
          <div style={{ display:"grid",gridTemplateColumns:colWidths,padding:"10px 16px",gap:8,background:C.bgCard2,borderBottom:`2px solid ${C.bd}`,position:"sticky",top:0,zIndex:1,minWidth:1200 }}>
            {lancColDefs.map(([h,a])=>(
              <span key={h} style={{ fontSize:9,fontWeight:700,color:C.tx3,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap",textAlign:a,display:"block" }}>{h}</span>
            ))}
          </div>
          {filtered.length===0 && (
            <div style={{ padding:"40px",textAlign:"center",color:C.tx3,fontSize:13 }}>Nenhum lançamento encontrado.</div>
          )}
          {filtered.map((l,i)=>(
            <div key={l.id} style={{
              display:"grid",gridTemplateColumns:colWidths,padding:"12px 16px",gap:8,
              borderBottom:`1px solid ${C.bdSubtle}`,transition:"background 0.1s",
              animation:`fade-up 0.2s ${i*0.02}s ease both`,minWidth:1200,alignItems:"center",
            }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background=C.bgHover; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background="transparent"; }}
            >
              <span style={{ fontSize:11,color:C.tx3,whiteSpace:"nowrap" }}>{l.data}</span>
              <div><Badge label={l.obra} color={C.gold} size="xs"/></div>
              <span style={{ fontSize:12,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }} title={l.desc}>{l.desc}</span>
              <span style={{ fontSize:11,color:C.tx2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }} title={l.forn}>{l.forn||"—"}</span>
              <span style={{ fontSize:11,color:C.tx3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }}>{l.tipo}</span>
              <span style={{ fontSize:11,color:C.tx2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }} title={l.cat}>{l.cat}</span>
              <span style={{ fontSize:11,color:C.tx3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }} title={l.subcat}>{l.subcat||"—"}</span>
              <span style={{ fontSize:12,fontWeight:700,color:C.tx,textAlign:"right",display:"block",whiteSpace:"nowrap" }}>{fmtMoney(l.total)}</span>
              <span style={{ fontSize:12,color:l.pago===l.total?C.green:l.pago>0?C.amber:C.tx3,fontWeight:600,textAlign:"right",display:"block",whiteSpace:"nowrap" }}>{fmtMoney(l.pago)}</span>
              <span style={{ fontSize:11,color:C.tx3,textAlign:"center",display:"block" }}>{l.forma}</span>
              <div style={{ display:"flex",justifyContent:"center" }}><Badge label={l.status} color={statusColor(l.status)} size="xs"/></div>
              <div style={{ textAlign:"center",fontSize:12 }}>{l.nf?<span style={{ color:C.green,fontWeight:700 }}>✓</span>:<span style={{ color:C.tx3 }}>—</span>}</div>
              <span style={{ fontSize:11,color:C.tx3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }}>{l.pagoPor}</span>
              <div style={{ display:"flex",gap:2,justifyContent:"center" }}>
                <button style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:3 }} title="Ver"><Eye size={12}/></button>
                <button style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:3 }} title="Editar"><Pencil size={12}/></button>
                <button style={{ background:"none",border:"none",cursor:"pointer",color:C.red+"70",padding:3 }} title="Excluir"><Trash2 size={12}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: PEDIDOS
// ═══════════════════════════════════════════════════════════════════════════════
function PedidosPage() {
  const [filterObra,setFilterObra] = useState("Todas as obras");
  const [filterStatus,setFilterStatus] = useState("Todos");
  const [showForm,setShowForm] = useState(false);

  const aguardando = PEDIDOS_DATA.filter(p=>p.status==="Aguardando");
  const confirmado = PEDIDOS_DATA.filter(p=>p.status==="Confirmado");
  const totalAPagar= PEDIDOS_DATA.filter(p=>p.status!=="Confirmado").reduce((s,p)=>s+p.valor,0);
  const vencidos   = aguardando.reduce((s,p)=>s+p.valor,0);
  const proximos   = PEDIDOS_DATA.filter(p=>p.status==="Aprovado").reduce((s,p)=>s+p.valor,0);
  const wppPeds    = PEDIDOS_DATA.filter(p=>p.wpp);

  const filtered = PEDIDOS_DATA.filter(p=>{
    if (filterObra!=="Todas as obras" && p.obra!==filterObra) return false;
    if (filterStatus!=="Todos" && p.status!==filterStatus) return false;
    return true;
  });

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1,overflow:"hidden" }}>
      <Header title="Pedidos" sub="Solicitações de pagamento"
        actions={
          <button onClick={()=>setShowForm(!showForm)} style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>
            <Plus size={13}/>Novo Pedido
          </button>
        }
      />
      <div style={{ flex:1,overflowY:"auto",padding:"20px 24px",display:"flex",flexDirection:"column",gap:16 }}>
        {/* Filtro obra */}
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontSize:12,color:C.tx3,fontWeight:500 }}>Filtrar obra:</span>
          <select value={filterObra} onChange={e=>setFilterObra(e.target.value)} style={{ background:C.bgCard,border:`1px solid ${C.bd}`,color:C.tx2,borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer",outline:"none" }}>
            <option>Todas as obras</option>
            {OBRAS_LIST.map(o=><option key={o.id}>{o.id}</option>)}
          </select>
        </div>

        {/* TOTAL A PAGAR card */}
        <div style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderLeft:`4px solid ${C.red}`,borderRadius:12,overflow:"hidden" }}>
          <div style={{ padding:"20px 24px",borderBottom:`1px solid ${C.bdSubtle}` }}>
            <div style={{ fontSize:9,fontWeight:700,color:C.red,letterSpacing:1,textTransform:"uppercase",marginBottom:8 }}>Total a Pagar</div>
            <div style={{ fontSize:36,fontWeight:900,color:C.red,letterSpacing:-1.5,lineHeight:1 }}>{fmtMoney(totalAPagar)}</div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr" }}>
            <div style={{ padding:"16px 24px",borderRight:`1px solid ${C.bdSubtle}` }}>
              <div style={{ fontSize:9,fontWeight:700,color:C.red,letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Vencidos / Hoje</div>
              <div style={{ fontSize:22,fontWeight:800,color:C.red,letterSpacing:-0.8 }}>{fmtMoney(vencidos)}</div>
              <div style={{ fontSize:11,color:C.tx3,marginTop:4 }}>{aguardando.length} aguardando aprovação</div>
            </div>
            <div style={{ padding:"16px 24px" }}>
              <div style={{ fontSize:9,fontWeight:700,color:C.blue,letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Próximos</div>
              <div style={{ fontSize:22,fontWeight:800,color:C.blue,letterSpacing:-0.8 }}>{fmtMoney(proximos)}</div>
              <div style={{ fontSize:11,color:C.tx3,marginTop:4 }}>{PEDIDOS_DATA.filter(p=>p.status==="Aprovado").length} aprovados</div>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,overflow:"hidden" }}>
          <div style={{ padding:"12px 16px",borderBottom:`1px solid ${C.bdSubtle}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <MessageSquare size={14} color="#25d366"/>
              <span style={{ fontSize:12,fontWeight:700,color:C.tx }}>Pedidos via WhatsApp</span>
              <Badge label={String(wppPeds.length)} color="#25d366" size="xs"/>
            </div>
            <button style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 10px",background:"none",border:`1px solid ${C.bd}`,borderRadius:7,color:C.tx3,fontSize:11,cursor:"pointer" }}>
              <RefreshCw size={11}/>Atualizar
            </button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)" }}>
            {[
              {l:"Aguardando",v:String(wppPeds.filter(p=>p.status==="Aguardando").length),c:C.amber},
              {l:"Enviado",   v:"0",                                                       c:C.blue},
              {l:"Pago",      v:String(wppPeds.filter(p=>p.status==="Confirmado").length), c:C.green},
              {l:"A Pagar",   v:fmtMoney(wppPeds.filter(p=>p.status!=="Confirmado").reduce((s,p)=>s+p.valor,0)), c:C.red},
            ].map((c,i)=>(
              <div key={c.l} style={{ padding:"14px 18px",borderRight:i<3?`1px solid ${C.bdSubtle}`:"none",textAlign:"center" }}>
                <div style={{ fontSize:22,fontWeight:800,color:c.c,letterSpacing:-0.5,marginBottom:4 }}>{c.v}</div>
                <div style={{ fontSize:9,fontWeight:700,color:C.tx3,letterSpacing:1,textTransform:"uppercase" }}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* New pedido form (inline, collapsible) */}
        {showForm && (
          <div style={{ background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,overflow:"hidden",animation:"fade-up 0.25s ease" }}>
            <div style={{ padding:"14px 20px",borderBottom:`1px solid ${C.bdSubtle}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bgCard2 }}>
              <span style={{ fontSize:13,fontWeight:700,color:C.tx }}>Novo Pedido de Pagamento</span>
              <button onClick={()=>setShowForm(false)} style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3 }}><X size={14}/></button>
            </div>
            <div style={{ padding:"20px",display:"flex",flexDirection:"column",gap:0 }}>
              {[
                { label:"Identificação", icon:Hash, fields:(
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                    <Select label="Obra *" options={["— Selecione a obra —",...OBRAS_LIST.map(o=>o.id)]}/>
                    <Input label="Data de Vencimento *" placeholder="15/09/2026" type="date"/>
                    <div style={{ gridColumn:"1/-1" }}><Input label="Descrição" placeholder="Ex: Pagamento de frete do obra — clientes física à..."/></div>
                  </div>
                )},
                { label:"Fornecedor", icon:Truck, fields:(
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                    <Input label="Fornecedor" placeholder="Digite para buscar fornecedor"/>
                    <Input label="CPF / CNPJ (opcional)" placeholder="Preencha apenas quando referência (contrato ou nota fiscal)"/>
                  </div>
                )},
                { label:"Classificação", icon:Layers, fields:(
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12 }}>
                    <Select label="Tipo *"         options={["— Tipo —","Serviço","Material","Locação","Mão de Obra"]}/>
                    <Select label="Categoria *"    options={["— Categoria —","Obra","Projeto","Equipamento"]}/>
                    <Select label="Subcategoria *" options={["— Subcategoria —"]}/>
                    <Select label="Obra Destino"   options={["— (Padrão) —",...OBRAS_LIST.map(o=>o.id)]}/>
                  </div>
                )},
                { label:"Valor e Pagamento", icon:Banknote, fields:(
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                    <Input label="Valor Total (R$) *" placeholder="0,00" type="number"/>
                    <Select label="Forma de Pagamento *" options={["— Selecionar —","PIX","Boleto","Cartão","Cheque","TED"]}/>
                    <div style={{ gridColumn:"1/-1" }}>
                      <Select label="Origem do Recurso *" options={["— Selecionar conta de recurso —","Capital ACASA","Sócio-Matheus","Sócio-Tharyque"]}/>
                    </div>
                    <Select label="Responsável pelo Pagamento *" options={["— Selecionar —","Matheus","Tharyque"]}/>
                  </div>
                )},
              ].map(({label,icon:Icon,fields},idx)=>(
                <div key={label} style={{ borderBottom:idx<3?`1px solid ${C.bdSubtle}`:"none",paddingBottom:16,marginBottom:16 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
                    <Icon size={13} color={C.gold}/>
                    <span style={{ fontSize:10,fontWeight:700,color:C.gold,letterSpacing:1,textTransform:"uppercase" }}>{label}</span>
                  </div>
                  {fields}
                </div>
              ))}
              <div style={{ display:"flex",justifyContent:"flex-end",gap:8,marginTop:4 }}>
                <button onClick={()=>setShowForm(false)} style={{ padding:"8px 16px",background:"none",border:`1px solid ${C.bd}`,borderRadius:8,color:C.tx2,fontSize:12,cursor:"pointer" }}>Cancelar</button>
                <button style={{ padding:"8px 20px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,border:"none",borderRadius:8,color:"#0a0a0a",fontSize:12,fontWeight:700,cursor:"pointer" }}>Enviar Pedido</button>
              </div>
            </div>
          </div>
        )}

        {/* Pedidos list */}
        <div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
            <span style={{ fontSize:10,fontWeight:700,color:C.tx3,letterSpacing:1.2,textTransform:"uppercase" }}>Todos os Pedidos ({filtered.length})</span>
            <div style={{ display:"flex",gap:4 }}>
              {["Todos","Aguardando","Aprovado","Confirmado"].map(s=>(
                <button key={s} onClick={()=>setFilterStatus(s)} style={{
                  padding:"5px 12px",borderRadius:7,border:`1px solid ${filterStatus===s?C.gold:C.bd}`,
                  background:filterStatus===s?C.goldBg:"transparent",
                  color:filterStatus===s?C.gold:C.tx3,fontSize:11,fontWeight:filterStatus===s?600:400,cursor:"pointer",
                }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {filtered.map((p,i)=>{
              const sc=statusColor(p.status);
              return (
                <div key={p.id} style={{
                  background:C.bgCard,border:`1px solid ${C.bd}`,borderRadius:12,padding:"14px 20px",
                  display:"flex",alignItems:"center",gap:14,cursor:"pointer",
                  animation:`fade-up 0.25s ${i*0.05}s ease both`,transition:"border-color 0.2s",
                }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=C.gold+"60"; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=C.bd; }}
                >
                  <div style={{ flexShrink:0,minWidth:96 }}>
                    <div style={{ fontSize:12,fontWeight:700,color:C.gold }}>{p.id}</div>
                    <div style={{ fontSize:10,color:C.tx3,marginTop:2 }}>Venc: {p.venc}</div>
                  </div>
                  <div style={{ width:1,alignSelf:"stretch",background:C.bdSubtle }}/>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontSize:13,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{p.desc}</div>
                    <div style={{ fontSize:11,color:C.tx3,marginTop:2,display:"flex",gap:8,alignItems:"center" }}>
                      <span>Resp: {p.resp}</span><span>·</span><span>{p.forma}</span>
                      {p.wpp && <span style={{ color:"#25d366",display:"flex",alignItems:"center",gap:3 }}><MessageSquare size={9}/>WhatsApp</span>}
                    </div>
                  </div>
                  <Badge label={p.obra} color={C.gold} size="xs"/>
                  <div style={{ textAlign:"right",flexShrink:0 }}>
                    <div style={{ fontSize:16,fontWeight:800,color:C.tx,letterSpacing:-0.4 }}>{fmtMoney(p.valor)}</div>
                  </div>
                  <Badge label={p.status} color={sc}/>
                  <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                    {p.status==="Aguardando" && (
                      <button style={{ background:C.green+"20",border:`1px solid ${C.green}40`,borderRadius:7,padding:"5px 10px",cursor:"pointer",color:C.green,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:5 }}>
                        <CheckCheck size={12}/>Aprovar
                      </button>
                    )}
                    <button style={{ background:"none",border:"none",cursor:"pointer",color:C.tx3,padding:4 }}><Eye size={13}/></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTER + ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [route,setRoute] = useState("/analise");

  function Page() {
    if (route==="/lancamentos")    return <LancamentosPage/>;
    if (route==="/pedidos")        return <PedidosPage/>;
    if (route==="/contratos")      return <ContratosPage/>;
    if (route==="/fornecedores")   return <FornecedoresPage/>;
    if (route==="/diario")         return <DiarioGlobalPage setRoute={setRoute}/>;
    if (route.startsWith("/diario/")) {
      const idx = parseInt(route.replace("/diario/","")) - 1;
      return <DiarioObraPage obraIdx={idx} setRoute={setRoute}/>;
    }
    return <DashboardPage setRoute={setRoute}/>;
  }

  return (
    <div style={{ display:"flex",height:"100vh",background:C.bgBase,overflow:"hidden" }}>
      <Sidebar route={route} setRoute={setRoute}/>
      <div style={{ flex:1,display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden" }}>
        <Page/>
      </div>
      <AIButton/>
    </div>
  );
}
