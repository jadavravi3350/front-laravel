# Quick Start Guide - CustomTee

## ⚡ Get Started in 2 Minutes

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Application
- Go to [http://localhost:3000](http://localhost:3000)

### 3. Explore Features
- ✅ **Home**: See featured products and hero section
- ✅ **Products**: Browse all available T-shirts
- ✅ **Design**: Customize a T-shirt with your own designs
- ✅ **Cart**: Manage your shopping cart

## 🎨 Quick Design Tips

1. **Add Text**
   - Type in left panel text input
   - Click "Add Text" to place on canvas
   - Click text on canvas to edit or delete

2. **Change Colors**
   - Click color squares in left panel to change shirt color

3. **Upload Logo**
   - Click file input to select an image
   - Image appears on canvas ready to resize

4. **Edit Properties**
   - Select any element on canvas
   - Adjust font, size, color, rotation, scale on right panel

5. **Save & Download**
   - "Save Design" saves to browser storage
   - "Download Design" downloads as PNG image
   - "Add to Cart" saves to shopping cart

## 📁 File Structure at a Glance

```
Key Files:
- app/page.tsx              → Home page
- app/products/page.tsx     → Products listing
- app/customizer/page.tsx   → T-shirt designer
- app/cart/page.tsx         → Shopping cart

Components:
- Navbar, HeroSection, ProductCard
- LeftSidebar (tools), RightSidebar (properties)
- CustomizerContent (main editor logic)
```

## 🔧 Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## 💡 Pro Tips

- Designs auto-save every 1 second
- Cart persists across browser sessions
- Download designs as high-quality PNG
- Use Ctrl+Z in canvas for undo (if using edge mode)
- Mobile-friendly - works great on phones!

## 🚀 Next Steps

1. **Customize Design Tools**: Edit `app/components/LeftSidebar.tsx`
2. **Add Products**: Modify `PRODUCTS` array in `app/page.tsx`
3. **Connect Backend**: Update `app/context/CartContext.tsx`
4. **Deploy**: Run `npm run build` then deploy `.next` folder

## ❓ Need Help?

Check the full README:
```bash
cat README-CUSTOMTEE.md
```

Or open any `.tsx` file - they're well commented!

---

Happy designing! 🎉
