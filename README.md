# OmniReal — O Futuro de Morar Bem

Landing page institucional da **OmniReal**, imobiliária de alto padrão com linguagem futurista:
catálogo de imóveis com filtros, simulador de financiamento (Tabela Price), seção Sobre,
depoimentos e formulário de contato.

## Tecnologias
- HTML5 + CSS3 (glassmorphism, dark mode, responsivo)
- JavaScript vanilla (sem dependências)
- Servidor de desenvolvimento: Node.js (`server.js`)

## Como rodar localmente
```bash
npm start
# ou
node server.js
```
Abra http://localhost:3000/

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
As ilustrações dos imóveis são SVGs gerados por `tools/gen-imagens.js` (vetoriais, alta resolução).
Para regerar: `node tools/gen-imagens.js`.

## Deploy
- **Vercel**: import este repositório no dashboard da Vercel (framework: Other / Static).
- O `vercel.json` já configura cache dos assets.
