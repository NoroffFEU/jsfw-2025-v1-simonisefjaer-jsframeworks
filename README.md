# Online Shop

A React online shop built with Vite, TypeScript, TanStack Router, and TanStack Query using the noroff API. Project is created by me SimIceDev.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NoroffFEU/jsfw-2025-v1-simonisefjaer-jsframeworks.git
   ```

2. Navigate to the project folder:
   ```bash
   cd jsfw-2025-v1-simonisefjaer-jsframeworks
   ```

3. ## Dependencies

This project was set up with the following installations:

### Core
```bash
npm install react react-dom
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install @tanstack/react-query
```

### Styling
```bash
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init
npx shadcn@latest add button
```

### UI Components
```bash
npm install @headlessui/react @heroicons/react
npm install lucide-react
npm install radix-ui
npm install class-variance-authority clsx tailwind-merge
```

### Forms & Validation
```bash
npm install zod
```

### Dev Dependencies
```bash
npm install -D vite @vitejs/plugin-react
npm install -D typescript @types/react @types/react-dom @types/node
npm install -D @tanstack/router-plugin
npm install -D @tanstack/react-query-devtools
npm install -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
npm install -D msw
npm install -D tw-animate-css
```

## Running the Project

### Development Server
```bash
npm run dev
```
Opens the app at [http://localhost:5173](http://localhost:5173)

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Testing

```bash
npm run test        # Watch mode
npm run test:once   # Single run
```

## Linting

```bash
npm run lint
```

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS & ShadCn
- Vitest + Testing Library

## AI Usage/Questions for stuff i needed a deeper explanation on to understand

- please explain to me when i add a new route how it works in correlation with the main root. It explained the process of when first creating a new route in a different file i then import it inside of the <outlet> are of my __root folder to render it.

- Please help me resolve the "any" type issue i have in my onlineShop "Reviews" object - keyValue pairs. It helped explain me how i could both add it and understand it.

- Will shadcn properly make a folder inside of my already existing components folder? Yes it will.

- What are the random name generated tanstack files? It was temporary cached files which i then added to .gitignore

- ASked if FC (funciton component) is even nescesary anymore, which it really wasnt, so i refactored my type definition on my component to have the interface definition at the end of my const function instead of using FC. example of what it looks like now: 
```typescript
interface SpecificProductCardProps {
    id: string;
    title: string;
    price: number;
    discountedPrice: number;
    imageUrl: string;
}

const SpecificProductCard = ({ id, title, price, discountedPrice, imageUrl }: SpecificProductCardProps) => {

}

// used to be like this
const SpecificProductCard: React.FC<SpecificProductCardProps> = ({ id, title, price, discountedPrice, imageUrl }) => {

}
```




# SimIceDev