/* ============================================================
   OmniReal — Script principal
   ============================================================ */

// Cole aqui o endpoint do Formspree (ex: https://formspree.io/f/xxxxxxx)
// Enquanto estiver vazio, o formulário funciona em modo demonstração.
const FORMSPREE_ENDPOINT = "";

// ---------------- Formatação ----------------
const fmtBRL = (v) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(v);

// ---------------- Catálogo de imóveis ----------------
const imoveis = [
  {
    id: 1, tipo: "casa", nome: "Mansão Futurista",
    img: "assets/images/imovel1.svg",
    preco: 4800000, m2: 780, quartos: 6, vagas: 4,
    cidade: "São Paulo — SP",
    descricao: "Residência inteligente com vista panorâmica, automação total e acabamento de alto padrão.",
  },
  {
    id: 2, tipo: "apto", nome: "Penthouse Skyline",
    img: "assets/images/imovel2.svg",
    preco: 3200000, m2: 420, quartos: 4, vagas: 3,
    cidade: "Rio de Janeiro — RJ",
    descricao: "Cobertura duplex com terraço privativo, piscina aquecida e skyline completo.",
  },
  {
    id: 3, tipo: "casa", nome: "Villa Horizon",
    img: "assets/images/imovel3.svg",
    preco: 2100000, m2: 520, quartos: 5, vagas: 3,
    cidade: "Campinas — SP",
    descricao: "Casa conceito em condomínio fechado, integrada à natureza e energia solar.",
  },
  {
    id: 4, tipo: "apto", nome: "Azure Tower 32º",
    img: "assets/images/imovel4.svg",
    preco: 1450000, m2: 210, quartos: 3, vagas: 2,
    cidade: "Balneário Camboriú — SC",
    descricao: "Apartamento de frente para o mar com lazer completo e vista permanente.",
  },
  {
    id: 5, tipo: "casa", nome: "Refúgio Serra Azul",
    img: "assets/images/imovel5.svg",
    preco: 980000, m2: 340, quartos: 4, vagas: 2,
    cidade: "Campos do Jordão — SP",
    descricao: "Chalé de montanha com lareira, sauna e privacidade total para temporada ou moradia.",
  },
  {
    id: 6, tipo: "apto", nome: "Loft Centro Criativo",
    img: "assets/images/imovel6.svg",
    preco: 690000, m2: 96, quartos: 2, vagas: 1,
    cidade: "Curitiba — PR",
    descricao: "Loft moderno no centro, planta inteligente e mobília planejada inclusa.",
  },
];

function cardHTML(i) {
  return `
    <article class="card" data-tipo="${i.tipo}">
      <img src="${i.img}" alt="Imagem do imóvel ${i.nome}" loading="lazy">
      <div class="card-body">
        <span class="badge badge-${i.tipo}">${i.tipo === "casa" ? "Casa" : "Apartamento"}</span>
        <h3>${i.nome}</h3>
        <p class="card-desc">${i.descricao}</p>
        <ul class="card-meta">
          <li>${i.m2} m²</li>
          <li>${i.quartos} quartos</li>
          <li>${i.vagas} vaga${i.vagas > 1 ? "s" : ""}</li>
        </ul>
        <p class="card-price">${fmtBRL(i.preco)}</p>
        <p class="card-city">📍 ${i.cidade}</p>
      </div>
    </article>`;
}

function render(data) {
  const grid = document.getElementById("imoveis-grid");
  if (!grid) return;
  grid.innerHTML = data.length
    ? data.map(cardHTML).join("")
    : `<p class="empty">Nenhum imóvel encontrado para este filtro.</p>`;
}

function filterImoveis(tipo) {
  render(tipo === "all" ? imoveis : imoveis.filter((i) => i.tipo === tipo));
  document
    .querySelectorAll(".filters button")
    .forEach((b) => b.classList.toggle("active", b.dataset.tipo === tipo));
}

// ---------------- Simulador (Tabela Price) ----------------
function calcularParcela(saldo, taxaMensalPercent, parcelas) {
  const i = taxaMensalPercent / 100;
  if (i === 0) return saldo / parcelas;
  return (saldo * i) / (1 - Math.pow(1 + i, -parcelas));
}

function simular() {
  const valorEl = document.getElementById("valor");
  const entradaEl = document.getElementById("entrada");
  const taxaEl = document.getElementById("taxa");
  const prazoEl = document.getElementById("prazo");
  const out = document.getElementById("resultado-simulacao");
  if (!valorEl || !out) return;

  const valor = Number(valorEl.value);
  const entrada = Number(entradaEl ? entradaEl.value : 0) || 0;
  const taxa = Number(taxaEl ? taxaEl.value : 0.9) || 0.9;
  const prazo = Number(prazoEl ? prazoEl.value : 240);

  out.className = "sim-result";
  if (!valor || valor <= 0 || isNaN(valor)) {
    out.classList.add("error");
    out.innerText = "⚠️ Informe um valor de imóvel válido.";
    return;
  }
  if (entrada >= valor) {
    out.classList.add("error");
    out.innerText = "⚠️ A entrada deve ser menor que o valor do imóvel.";
    return;
  }
  if (taxa < 0 || taxa > 100) {
    out.classList.add("error");
    out.innerText = "⚠️ A taxa de juros mensal deve estar entre 0% e 100%.";
    return;
  }

  const saldo = valor - entrada;
  const parcela = calcularParcela(saldo, taxa, prazo);
  const anos = prazo / 12;
  out.classList.remove("error");
  out.innerHTML = `
    <p class="sim-main">Parcela estimada: <strong>${fmtBRL(parcela)}</strong></p>
    <p class="sim-detail">Saldo financiado: ${fmtBRL(saldo)} · Taxa: ${taxa.toFixed(2)}% a.m. · Prazo: ${prazo} parcelas (${anos} anos)</p>
    <p class="sim-detail">Total pago: ${fmtBRL(parcela * prazo)} (juros: ${fmtBRL(parcela * prazo - saldo)})</p>`;
}

// ---------------- Formulário de contato ----------------
async function enviarContato(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();
  const btn = form.querySelector("button[type=submit]");
  const msg = document.getElementById("contato-msg");

  if (!nome || !email || !mensagem) {
    msg.className = "form-msg error";
    msg.innerText = "⚠️ Preencha todos os campos obrigatórios.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.className = "form-msg error";
    msg.innerText = "⚠️ Informe um e-mail válido.";
    return;
  }

  btn.disabled = true;
  const original = btn.innerText;
  btn.innerText = "Enviando...";

  try {
    if (!FORMSPREE_ENDPOINT) throw new Error("demo");
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ nome, email, mensagem }),
    });
    if (!res.ok) throw new Error("falha");
    msg.className = "form-msg ok";
    msg.innerText = "✅ Mensagem enviada com sucesso! Retornaremos em breve.";
    form.reset();
  } catch (err) {
    msg.className = "form-msg ok";
    msg.innerText =
      err.message === "demo"
        ? "✅ Modo demonstração: mensagem validada com sucesso! (Configure o FORMSPREE_ENDPOINT em script.js para receber e-mails reais.)"
        : "⚠️ Não foi possível enviar. Tente novamente mais tarde.";
    if (err.message === "demo") form.reset();
  } finally {
    btn.disabled = false;
    btn.innerText = original;
  }
}

// ---------------- Inicialização ----------------
document.addEventListener("DOMContentLoaded", () => {
  render(imoveis);

  // Botão do hero → scroll suave até o catálogo
  const btnHero = document.getElementById("btn-explorar");
  if (btnHero) {
    btnHero.addEventListener("click", () => {
      document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Formulário de contato
  const form = document.getElementById("contact-form");
  if (form) form.addEventListener("submit", enviarContato);

  // Menu mobile
  const toggle = document.getElementById("nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.querySelector("nav ul")?.classList.toggle("open");
    });
  }

  // Ano dinâmico no footer
  const year = document.getElementById("year");
  if (year) year.innerText = new Date().getFullYear();
});
