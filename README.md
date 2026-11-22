# Dopamine Spike Components

## Icons

SVG icons exported from the **Icon repo** section of the *WIP – Dopamine Spike* Figma file. All icons are 24×24 (`viewBox="0 0 24 24"`).

Each icon has two variants: a regular one and a `-bold` one. Phone has a `-filled` variant instead.

| Icon | Regular | Bold / Filled |
|---|---|---|
| arrow-up | `icons/arrow-up.svg` | `icons/arrow-up-bold.svg` |
| arrow-down | `icons/arrow-down.svg` | `icons/arrow-down-bold.svg` |
| arrow-left | `icons/arrow-left.svg` | `icons/arrow-left-bold.svg` |
| arrow-right | `icons/arrow-right.svg` | `icons/arrow-right-bold.svg` |
| check | `icons/check.svg` | `icons/check-bold.svg` |
| chevron-up | `icons/chevron-up.svg` | `icons/chevron-up-bold.svg` |
| chevron-down | `icons/chevron-down.svg` | `icons/chevron-down-bold.svg` |
| chevron-left | `icons/chevron-left.svg` | `icons/chevron-left-bold.svg` |
| chevron-right | `icons/chevron-right.svg` | `icons/chevron-right-bold.svg` |
| close | `icons/close.svg` | `icons/close-bold.svg` |
| phone-telephone | `icons/phone-telephone.svg` | `icons/phone-telephone-filled.svg` |
| plus | `icons/plus.svg` | `icons/plus-bold.svg` |
| search | `icons/search.svg` | `icons/search-bold.svg` |

## Storybook

```bash
npm install
npm run storybook        # dev server on http://localhost:6006
npm run build-storybook  # static build in storybook-static/
```

Stories live under **Foundations / Icon**: `Playground`, `All Icons`, `Inherits Color`, `Sizes`.

### `<Icon />` component

```tsx
import { Icon } from './src';

<Icon name="arrow-right" />
<Icon name="check" bold size={20} color="#30A46C" />
<Icon name="phone-telephone" bold label="Call" />   // bold → filled variant
```

| Prop | Type | Default | |
|---|---|---|---|
| `name` | `IconName` | — | One of the 13 icons above |
| `bold` | `boolean` | `false` | Bold variant (`filled` for phone-telephone) |
| `size` | `number` | `24` | Pixel size |
| `color` | `string` | `currentColor` | Icons inherit text colour by default |
| `label` | `string` | — | Accessible name; omit for decorative icons |

The SVG files in `icons/` are untouched Figma exports; the component swaps their black fills/strokes for `currentColor` at load time.
