# CustomTee - T-Shirt Customization Website

A modern, fully-featured T-shirt customization website built with Next.js (App Router), React, Tailwind CSS, and Fabric.js.

## 🎨 Features

### Pages
- **Home Page**: Beautiful landing page with hero section, featured products, and call-to-action buttons
- **Products Page**: Grid display of all available T-shirts with filtering capabilities
- **Customizer Page**: Interactive design editor with live preview
- **Cart Page**: Shopping cart with order summary and checkout flow

### Customization Features
- ✅ Select T-shirt color from 12+ variations
- ✅ Add custom text with editable fonts (Arial, Helvetica, Impact, Comic Sans, etc.)
- ✅ Upload images/logos to the design
- ✅ Drag, resize, and rotate elements on canvas
- ✅ Adjust text properties (font size, color, family)
- ✅ Live preview with Fabric.js canvas
- ✅ Download final design as PNG image
- ✅ Auto-save designs to localStorage
- ✅ Full responsive design (mobile + desktop)

### UI/UX
- Modern, minimal aesthetic with Tailwind CSS
- Clean three-column layout on desktop:
  - Left sidebar: Design tools
  - Center: Live canvas preview
  - Right sidebar: Object properties editor
- Mobile-responsive with optimized touch interactions
- Smooth animations and transitions
- Loading states and user feedback

### Technical Features
- Client-side state management with React hooks
- Context API for cart management
- localStorage for temporary design persistence
- Fabric.js for advanced canvas manipulation
- TypeScript for type safety
- SEO-friendly component structure
- Proper error handling and edge cases

## 📁 Project Structure

```
app/
├── components/
│   ├── Navbar.tsx                 # Navigation header
│   ├── HeroSection.tsx            # Landing hero banner
│   ├── ProductCard.tsx            # Reusable product card
│   ├── LeftSidebar.tsx            # Design tools panel
│   ├── RightSidebar.tsx           # Properties editor panel
│   └── CustomizerContent.tsx      # Main customizer logic
├── context/
│   └── CartContext.tsx            # Cart state management
├── customizer/
│   └── page.tsx                   # Customizer page
├── products/
│   └── page.tsx                   # Products listing page
├── cart/
│   └── page.tsx                   # Shopping cart page
├── page.tsx                       # Home page
├── layout.tsx                     # Root layout with providers
├── globals.css                    # Global Tailwind styles
└── favicon.ico

public/                            # Static assets
tailwind.config.ts                 # Tailwind configuration
postcss.config.mjs                 # PostCSS configuration
next.config.ts                     # Next.js configuration
package.json                       # Dependencies
tsconfig.json                      # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to project directory**
```bash
cd "d:/Coding File/next-laravel/my-app"
```

2. **Install dependencies** (already done, but for reference):
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will automatically reload when you make changes to files.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

```bash
npm run start
```

Runs the production server on port 3000.

## 🎯 How to Use the Customizer

1. **Navigate to Designer**: Click "Start Designing" on homepage or go to `/customizer`

2. **Design Your T-Shirt**:
   - **Select Color**: Choose from 12 colors in the left sidebar
   - **Add Text**: Type text and click "Add Text" to place it on canvas
   - **Upload Image**: Click file input to upload your logo/image
   - **Edit Properties**: Select any element and adjust properties on the right:
     - Font size and family (for text)
     - Text color
     - Rotation angle
     - Scale (width/height)

3. **Interactions**:
   - Click elements on canvas to select them
   - Drag to move
   - Use corner handles to resize
   - Rotate using the rotation handle

4. **Download & Cart**:
   - Click "Download Design" to save as PNG
   - Click "Add to Cart" to add to shopping cart
   - Click "Save Design" to persist to localStorage

## 💾 Data Persistence

- **Current Design**: Saved to localStorage with key `current_design`
- **Shopping Cart**: Saved to localStorage with key `cart`
- Auto-saves every 1 second while editing

To clear saved data:
```javascript
localStorage.removeItem('current_design');
localStorage.removeItem('cart');
```

## 🛒 Shopping Cart Features

- Add items with custom designs
- View cart summary with pricing
- Remove individual items
- Clear entire cart
- Real-time item count badge
- Persists across browser sessions

## 📱 Responsive Design

- **Mobile**: Single column layout, full-width canvas
- **Tablet**: Two-column (canvas + sidebar)
- **Desktop**: Three-column (tools, canvas, properties)
- Touch-friendly controls on all devices

## 🎨 Customization Options

### T-Shirt Colors
White, Black, Navy, Red, Green, Purple, Orange, Gray, Pink, Brown, Gold, and more

### Text Fonts
- Arial
- Helvetica
- Times New Roman
- Courier New
- Georgia
- Verdana
- Comic Sans MS
- Impact

### Canvas Properties
- Font size: 10-120px
- Text color: Any hex color
- Rotation: 0-360°
- Scale: 10-300%

## 🔧 Technologies Used

- **Next.js 16.2**: React framework with App Router
- **React 19**: UI library with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Fabric.js 7**: Canvas manipulation library
- **Lucide React**: Icon library
- **@tailwindcss/postcss**: PostCSS plugin for Tailwind v4

## 📦 Key Dependencies

```json
{
  "next": "16.2.2",
  "react": "19.2.4",
  "fabric": "^7.2.0",
  "tailwindcss": "^4.2.2",
  "lucide-react": "^1.7.0"
}
```

## 🐛 Troubleshooting

**Canvas not rendering?**
- Clear localStorage: `localStorage.clear()`
- Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console for errors

**Designs not saving?**
- Ensure cookies/localStorage enabled in browser
- Check localStorage quota: `console.log(localStorage)`

**Images not uploading?**
- Verify file is a valid image format (PNG, JPG, GIF, WebP)
- Check file size (should be <5MB for smooth performance)
- Canvas may need image CORS configuration in production

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
The project builds to static HTML + JavaScript, deployable to:
- Netlify
- GitHub Pages
- AWS Amplify
- Any static hosting

Run `npm run build` then deploy the `.next` folder.

## 📝 Environment Variables

Create `.env.local` file:
```
# Add any future API endpoints here
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🔒 Security Considerations

- All data stored client-side (localStorage)
- No backend server interactions
- Image uploads processed locally
- XSS protection via React's built-in escaping
- No sensitive data transmission

## 🎓 Development Notes

### Adding New Features

1. **New T-Shirt Color**: Edit color array in `LeftSidebar.tsx`
2. **New Font**: Add to `FONTS` array in `RightSidebar.tsx`
3. **New Tool**: Create component and import in `CustomizerContent.tsx`
4. **New Page**: Create file in `app/[route]/page.tsx`

### Extending Cart

To connect to a backend:
1. Create API route in `app/api/`
2. Update `CartContext.tsx` to call your API
3. Implement order processing

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork and submit pull requests with improvements!

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Check localStorage for saved data
4. Verify all dependencies are installed: `npm install`

---

**Enjoy designing! 🎉**
