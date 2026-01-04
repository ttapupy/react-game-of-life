#!/bin/sh
set -e

# Frissítendő major csomagok listája (router 6 megtartva)
for pkg in vite @vitejs/plugin-react @vitejs/plugin-react-swc vite-tsconfig-paths jsdom lint-staged
do
  echo "🔄 Updating $pkg to latest major..."
  pnpm update "$pkg@latest"
  echo "✅ $pkg updated. Building..."
  pnpm build
  echo "✅ Build successful for $pkg"
  git add .
  git commit -m "chore: update $pkg to latest major"
done

echo "🎉 All major packages updated safely!"
