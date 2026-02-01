# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend Effects Playground - A pure vanilla JavaScript platform for showcasing CSS animations, UI components, and visual effects. No build tools or frameworks required.

## Development

### Running the Project

```bash
# Python 3
python3 -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000

# Node.js
npx http-server -p 3000

# Then open in browser
open http://localhost:3000
```

### No Build Step

This is a pure static project. All JS files are ES6 modules loaded directly by the browser via `type="module"`.

## Architecture

### Module System

All JavaScript uses ES6 module imports/exports:

```javascript
// Import pattern used throughout
import { StateManager } from './state.js';
import { $, $$, debounce, copyToClipboard } from './utils.js';
import { AnimationEffects } from './effects/animations.js';
```

### Core Modules

| File | Purpose |
|------|---------|
| `js/app.js` | Main application entry (`PlaygroundApp` class) |
| `js/state.js` | State management with pub-sub pattern (`StateManager`) |
| `js/router.js` | Hash-based routing (`Router` class) |
| `js/utils.js` | DOM helpers, debounce, animation utilities |

### Effect Registry System

Effects are defined in `js/effects/` and automatically registered into `effectRegistry` in `app.js`:

```javascript
// Effect object structure
{
    id: 'effectId',
    name: 'Display Name',
    desc: 'Description',
    category: 'css-basic',  // maps to categories config
    render: () => htmlString,  // renders to preview stage
    html: '...',
    css: '...',
    js: '...'
}
```

### Adding New Effects

1. Create effect in appropriate file under `js/effects/`
2. Export it in the module
3. Register in `app.js` effectRegistry with category mapping

### Category System

18 main categories mapping to sidebar navigation:

- **CSS动效**: `css-basic`, `css-advanced`, `css-3d`
- **交互组件**: `ui-basic`, `ui-nav`, `ui-form`, `ui-content`, `ui-advanced`
- **数据可视化**: `chart-basic`, `chart-advanced`, `chart-display`
- **视觉效果**: `visual-modern`, `visual-bg`, `visual-text`, `visual-border`
- **交互游戏**: `game-mouse`, `game-scroll`, `game-demo`
- **现代特性**: `feature-css`, `feature-js`, `feature-responsive`

## CSS Architecture

### CSS Variables (main.css)

```css
:root {
    /* Colors */
    --primary: #6366f1;
    --secondary: #ec4899;
    /* Dimensions */
    --sidebar-width: 260px;
    --panel-width: 280px;
    --navbar-height: 60px;
}

/* Light theme override */
[data-theme="light"] {
    --bg-primary: #ffffff;
    --text-primary: #1e293b;
}
```

### Layout System

Three-column layout using flexbox:
- Left sidebar (`.sidebar`) - fixed position with transform for collapse
- Main content (`.content-area`) - flex: 1, uses margin for spacing
- Right panel (`.properties-panel`) - fixed position with transform for collapse

**Important**: Sidebar collapse uses body classes (`sidebar-collapsed`, `panel-collapsed`) instead of sibling selectors due to HTML structure limitations.

### CSS File Organization

| File | Content |
|------|---------|
| `main.css` | Base variables, reset, layout structure |
| `animations.css` | @keyframes, animation utility classes |
| `components.css` | UI component styles |
| `effects.css` | Special effect styles |
| `themes.css` | Theme switching styles |

## State Management

```javascript
// Usage in app.js
const state = new StateManager({
    currentCategory: 'css-basic',
    currentEffect: null,
    theme: 'dark',
    sidebarCollapsed: false,
    panelCollapsed: false
});

// Get/set
state.set('theme', 'light');
const theme = state.get('theme');

// Subscribe
state.subscribe('theme', (newValue) => this.applyTheme(newValue));
```

## Code Conventions

- **Classes**: PascalCase (`PlaygroundApp`, `StateManager`)
- **Constants**: camelCase (`AnimationEffects`, `categories`)
- **CSS classes**: kebab-case (`.preview-stage`, `.anim-fadeIn`)
- **CSS animation classes**: `anim-*` prefix (`.anim-bounce`, `.anim-pulse`)
- **JSDoc**: File headers with basic description

## External Dependencies (CDN)

- Font Awesome 6.4.0 (icons)
- Prism.js 1.29.0 (code syntax highlighting)
