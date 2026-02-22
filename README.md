# Mahjong Kaszëbë 🀄

Strona internetowa Trójmiejskiego Klubu Mahjonga.

## Spis treści

- [Struktura folderów](#struktura-folderów)
- [Dodawanie treści](#dodawanie-treści)
- [Praca z Zolą](#praca-z-zolą)
- [Vibe-coding z OpenCode](#vibe-coding-z-opencode)
- [Wdrażanie](#wdrażanie)

## Struktura folderów

```
mahjongkaszebe/
├── config.toml          # Konfiguracja Zoli (URL, tytuł, etc.)
├── content/             # Treści strony (pliki Markdown)
│   ├── _index.md       # Strona główna
│   ├── kontakt.md      # Strona kontaktowa
│   └── blog/           # Sekcja aktualności
│       ├── _index.md   # Lista postów
│       └── *.md        # Posty (np. moj-post.md)
├── templates/           # Szablony HTML
│   ├── base.html       # Główny szablon (nagłówek, stopka, CSS)
│   ├── index.html      # Szablon strony głównej
│   ├── section.html    # Szablon dla sekcji (blog)
│   └── page.html       # Szablon dla pojedynczych stron
├── static/             # Pliki statyczne (obrazy, CSS, JS)
│   ├── logo.jpg        # Logo klubu
│   └── *.jpg           # Zdjęcia do postów
├── .github/
│   └── workflows/      # GitHub Actions
│       └── main.yml    # Automatyczne wdrażanie
└── public/             # Zbudowana strona (nie commitować!)
```

## Dodawanie treści

### Nowa strona

Utwórz plik `.md` w `content/`:

```markdown
+++
title = "Tytuł strony"
+++

Treść strony w Markdown.
```

### Nowy post na blogu

Utwórz plik w `content/blog/`:

```markdown
+++
title = "Tytuł wpisu"
date = 2026-02-22
+++

Treść wpisu w Markdown.

![Zdjęcie](/photo1.jpg)
```

### Zdjęcia

1. Wrzuć zdjęcie do `static/`
2. W treści użyj `![Opis](/nazwa-zdjęcia.jpg)`

## Praca z Zolą

### Instalacja (Arch Linux)

```bash
sudo pacman -S zola
```

### Budowanie strony

```bash
zola build
```

Strona zostanie wygenerowana w folderze `public/`.

### Podgląd na żywo

```bash
zola serve
```

Strona będzie dostępna pod `http://127.0.0.1:1111`

### Sprawdzenie błędów

```bash
zola check
```

## Vibe-coding z OpenCode

OpenCode to AI-assistant CLI do pracy z kodem. Umożliwia edycję plików, wykonywanie poleceń i nie tylko - wszystko przez czat w terminalu.

### Instalacja

```bash
# Na Linux/macOS
curl -sL https://opencode.ai/install | sh

# Lub przez Cargo
cargo install opencode
```

### Konfiguracja

Po pierwszym uruchomieniu będziesz potrzebować klucza API (np. OpenAI, Anthropic, etc.). Postępuj z instrukcjami wyświetlonymi na ekranie.

### Praca z repozytorium

1. **Sklonuj repozytorium:**
   ```bash
   git clone git@github.com:MahjongKaszebe/mahjongkaszebe.github.io.git
   cd mahjongkaszebe.github.io
   ```

2. **Uruchom OpenCode:**
   ```bash
   opencode
   ```

3. **Przydatne komendy OpenCode:**
   - `read <plik>` - przeczytaj plik
   - `edit` - edytuj plik
   - `write` - napisz nowy plik
   - `glob` - znajdź pliki
   - `grep` - szukaj w kodzie
   - `bash` - wykonaj polecenie powłoki

4. **Typowy workflow:**
   ```
   opencode
   > przeczytaj content/blog/_index.md
   > dodaj nowy post o nadchodzącym turnieju
   > zbuduj stronę i pokaż mi wynik
   > wyślij zmiany na GitHub
   ```

### Przydatne skróty

- Zbuduj i podejrzyj: `zola build && open public/index.html`
- Dodaj zmiany: `git add -A && git commit -m "opis" && git push`
- Zobacz status: `git status`

## Wdrażanie

Strona jest automatycznie wdrażana przez GitHub Actions po każdym commicie do gałęzi `main`.

1. Wprowadź zmiany lokalnie
2. Commit i push:
   ```bash
   git add -A
   git commit -m "Opis zmian"
   git push
   ```
3. GitHub Actions zbuduje i wdroży stronę
4. Strona będzie dostępna pod: https://mahjongkaszebe.github.io

## Stylizacja

Strona używa kolorów:
- Tło: żółty (`#FFE600`)
- Tekst: czarny (`#000000`)
- Menu: czarne z żółtym tekstem
- Aktywny element menu: czerwony (`#FF0000`)

Edytuj `templates/base.html` aby zmienić style CSS.

---

🀄 **Mahjong Kaszëbë** - Gramy, uczymy i promujemy mahjonga!
