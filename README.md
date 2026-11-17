# OmniReal — O Futuro de Morar Bem

Landing page institucional da **OmniReal**, imobiliária de alto padrão com linguagem futurista:
catálogo de imóveis com filtros, simulador de financiamento (Tabela Price), seção Sobre,
depoimentos e formulário de contato.

## Tecnologias
- HTML5 + CSS3 (glassmorphism, dark mode, responsivo)
- JavaScript vanilla (sem dependências)
- Site 100% estático — hospede em qualquer serviço de arquivos estáticos

## Como visualizar localmente
Opção 1 — abra diretamente o arquivo `index.html` no navegador.

Opção 2 — sirva com qualquer servidor estático:
```bash
npx serve .
# ou
python -m http.server 3000
```
Acesa em http://localhost:3000/ (ou a porta indicada).

## Simulador
Cálculo pelo sistema Price (parcelas fixas):
`P = S * i / (1 - (1+i)^-n)`, onde `S = valor - entrada`, `i = taxa mensal`, `n = parcelas`.

## Formulário de contato
O envio usa [Formspree](https://formspree.io). Para ativar:
1. Crie uma conta gratuita no Formspree e crie um formulário.
2. Cole o endpoint em `script.js`:
   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/SEU_ID";
   ```
Sem o endpoint, o formulário funciona em modo demonstração (validação + feedback visual).

## Imagens
As ilustrações dos imóveis são SVGs vetoriais de alta resolução gerados
especialmente para o projeto (pasta `assets/images/`).

## Deploy
- **Vercel**: import este repositório no dashboard da Vercel (framework: Other / Static).
- O `vercel.json` já configura cache dos assets.

## Licença
Uso reservado — projeto interno OmniReal.
