// ===== CHART =====
function openCharts(symbol){
    [60,15,5,3,1].forEach((t,i)=>{
        setTimeout(()=>{
            window.open(`https://www.tradingview.com/chart/?symbol=${symbol}&interval=${t}`);
        },i*150);
    });
}

function openChartOnly(s){openCharts(s);}
function openFull(s){
    openCharts(s);
    setTimeout(()=>window.open("https://my.exness.com/webtrading"),800);
}

function openTool(url){ window.open(url,"_blank"); }

function scrollToDashboard(){
    document.getElementById('dashboard-grid').scrollIntoView({behavior:'smooth'});
}

// ===== THEME =====
function toggleTheme(){
    const body = document.body;
    const isDark = body.getAttribute('data-theme')==='dark';
    body.setAttribute('data-theme', isDark ? 'light':'dark');
    localStorage.setItem('theme', body.getAttribute('data-theme'));
}
const savedTheme = localStorage.getItem('theme');
if(savedTheme) document.body.setAttribute('data-theme', savedTheme);

// ===== LOAD CODE FILE =====
async function loadCode(file){
    const res = await fetch(`codes/${file}`);
    return await res.text();
}

// ===== DATA (CLEAN 🔥) =====
let codes = [
 {title:"EMA + Adaptive MA + SMC", file:"EMA + Adaptive MA + SMC.txt"},
 {title:"Gold Strategy", file:"gold.txt"}
];

// ===== RENDER =====
function renderCodes(){
    const grid=document.getElementById("codeGrid");
    grid.innerHTML="";
    codes.forEach((c,i)=>{
        const card=document.createElement("div");
        card.className="code-card";
        card.innerHTML=`<h3>${c.title}</h3>`;
        card.onclick=()=>openEditor(i);
        grid.appendChild(card);
    });
}

// ===== EDITOR =====
let currentIndex=null;

async function openEditor(i){
    currentIndex=i;
    document.getElementById("editorPopup").style.display="block";
    codeTitle.value=codes[i].title;

    // 🔥 LOAD FILE CONTENT
    editorArea.value = await loadCode(codes[i].file);
}

function closeEditor(){
    document.getElementById("editorPopup").style.display="none";
}

// ===== SECRET KEY =====
let typedKeys="";

document.addEventListener("keydown",(e)=>{

if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;

if(e.key.length===1){
    typedKeys+=e.key;
    if(typedKeys.length>4)typedKeys=typedKeys.slice(-4);
}

if(typedKeys==="CODE"){
    document.getElementById("codePanel").style.display="block";
    renderCodes();
    typedKeys="";
    return;
}

/* lowercase shortcuts only */
if(e.key===e.key.toLowerCase()){
    switch(e.key){
        case 'n':openChartOnly('NSE:NIFTY');break;
        case 'b':openFull('BTCUSDT');break;
        case 'g':openFull('XAUUSD');break;
        case 'e':openFull('EURUSD');break;
    }
}

});
