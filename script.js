// ===== CHART =====
function openCharts(symbol){
    [60,15,5,3].forEach((t,i)=>{
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
    
    {title:"EMA 9 & 15", file:"EMA 9 & 15.txt"},

    {title:"EMA Background", file:"EMA Background.txt"},

    {title:"Adaptive Centric Moving Average [LuxAlgo]", file:"Adaptive Centric Moving Average [LuxAlgo].txt"},

    {title:"Smart Money Concepts [LuxAlgo]", file:"Smart Money Concepts [LuxAlgo].txt"},

    {title:"EMA Background + Adaptive Centric Moving Average", file:"EMA Background + Adaptive Centric Moving Average.txt"},

    {title:"EMA + Adaptive MA + SMC", file:"EMA + Adaptive MA + SMC.txt"}
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

// ===== IH SECRET CLICK =====
let ihClickCount = 0;
let ihTimer;

document.getElementById("ih-btn").addEventListener("click", () => {
    ihClickCount++;

    clearTimeout(ihTimer);

    ihTimer = setTimeout(() => {
        ihClickCount = 0;
    }, 1500);

    if (ihClickCount === 5) {
        document.getElementById("codePanel").style.display = "block";
        renderCodes();
        ihClickCount = 0;
    }
});
