#!/bin/sh
set -e

for pkg in "@types/jest" "@types/jsdom" "@types/testing-library__jest-dom" \
           "@vitejs/plugin-react" "@vitejs/plugin-react-swc" "globals" \
           "jsdom" "lint-staged" "vite" "vite-tsconfig-paths"
do
  echo "🔄 Updating $pkg..."
  pnpm update $pkg@latest
  echo "✅ $pkg updated. Building..."
  pnpm build
  echo "✅ Build successful for $pkg"
  git add .
  git commit -m "chore: update $pkg to latest"
done

echo "🎉 All selected packages updated safely!"
