# Crimes Digitais — apresentação

Slides da disciplina **Contexto Social e Profissional da Engenharia de Computação** (CEFET-MG, Campus Timóteo).

Tema: *Crimes Digitais: limites entre atividade profissional e conduta criminosa.*

## Compilação

Engine: **LuaLaTeX**. Na raiz do repositório:

```bash
./compile.sh
```

Saída: `main.pdf`.

Requer TeX Live com Beamer, `fontspec`, `fontawesome5` e `tcolorbox`. Sem as fontes TTF em `tex-config/tipografia/`, o tema usa Fira Sans / Fira Mono.

## Estrutura

| Ficheiro | Uso |
|----------|-----|
| `main.tex` | Capa, metadados e inclusão das secções |
| `sections/` | Um ficheiro por slide obrigatório |
| `beamerthemecefetmg.sty` | Tema visual |
| `tex-config/tipografia/` | Loader de fontes (TTF locais opcionais) |
| `assets/images/` | Fundo da capa e do encerramento |
