# Coderift Technologies - Static Website

A complete, professional, responsive static website built with modern web technologies and glassmorphism design principles.

## 🚀 Features

- **Modern Glassmorphism Design** - Translucent frosted panels with backdrop filters and subtle borders
- **Fully Responsive** - Mobile-first design optimized for all devices (360px to 1920px+)
- **Accessible** - ARIA labels, keyboard navigation, screen reader support
- **Performance Optimized** - Lazy loading, optimized assets, minimal JavaScript
- **SEO Ready** - Meta tags, Open Graph, JSON-LD structured data
- **Interactive Components** - Sticky header, mobile navigation, testimonials carousel
- **Form Handling** - Client-side validation with multiple backend integration options

## 📁 Project Structure

```
coderift-site/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── technologies.html       # Technologies page
├── careers.html           # Careers page
├── contact.html           # Contact page
├── css/
│   └── styles.css         # Main stylesheet with glassmorphism design
├── js/
│   └── main.js           # Interactive functionality
├── assets/
│   ├── images/           # Image assets
│   └── icons/            # SVG icons and favicons
└── README.md            # This file
```

## 🎨 Design System

### Glassmorphism Components
- **Glass Cards** - Translucent cards with backdrop blur
- **Glass Navigation** - Sticky header with blur effect
- **Glass Forms** - Form inputs with glass styling
- **Glass Buttons** - Interactive buttons with hover effects

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Accent**: #06b6d4 (Cyan)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive Sizing**: Fluid typography with CSS clamp()

## 📱 Responsive Breakpoints

- **Mobile**: 360px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px - 1919px
- **Ultra-wide**: 1920px+

## 🛠️ Technologies Used

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern CSS with custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No frameworks, optimized for performance
- **SVG Icons** - Scalable vector graphics for crisp display
- **Google Fonts** - Inter font family for modern typography

## 🚀 Deployment Options

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (leave empty for static sites)
3. Set publish directory: `/` (root)
4. Deploy automatically on every push

### Vercel
1. Import your GitHub repository to Vercel
2. Vercel will automatically detect it's a static site
3. Deploy with zero configuration

### Manual Deployment
1. Upload all files to your web server
2. Ensure proper MIME types are configured
3. Test all functionality on the live server

## 📧 Form Handling Options

### Option 1: Formspree (Recommended)
1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form action in `contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Update the endpoint in `js/main.js`:
   ```javascript
   const endpoint = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

### Option 2: Getform
1. Sign up at [Getform](https://getform.io)
2. Create a new form and get your endpoint URL
3. Update the form action and JavaScript endpoint

### Option 3: Netlify Forms
1. Add `netlify` attribute to your form:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```
2. Add hidden input for Netlify:
   ```html
   <input type="hidden" name="form-name" value="contact">
   ```

### Option 4: Custom Backend
Create a simple backend endpoint that accepts POST requests:

```javascript
// Example Express.js endpoint
app.post('/api/contact', (req, res) => {
  const { full_name, email, project_details, budget } = req.body;
  
  // Process the form data
  // Send email, save to database, etc.
  
  res.json({ success: true, message: 'Form submitted successfully' });
});
```

## 🔧 Configuration

### Form Endpoints
Update the form handling in `js/main.js`:

```javascript
// Configure form endpoint
const endpoint = 'YOUR_FORM_ENDPOINT_HERE';
```

### Social Media Links
Update placeholder links in all HTML files:
- Instagram: `https://instagram.com/coderift`
- LinkedIn: `https://linkedin.com/company/coderift`
- Email: `hello@coderift.tech`

### Company Information
Update company details in:
- All HTML files (address, phone, email)
- JSON-LD structured data in `index.html`
- Footer sections across all pages

## 🎯 Performance Optimization

### Image Optimization
- Use WebP format for better compression
- Implement responsive images with `srcset`
- Add `loading="lazy"` for non-critical images
- Compress images before deployment

### CSS Optimization
- Minify CSS for production
- Remove unused CSS rules
- Use CSS containment for better rendering

### JavaScript Optimization
- Minify JavaScript for production
- Use `defer` or `async` for non-critical scripts
- Implement code splitting if needed

## 🧪 Testing

### Cross-Device Testing
1. **Mobile Testing**
   - Test on actual devices (iPhone, Android)
   - Use browser dev tools device simulation
   - Check touch interactions and tap targets

2. **Desktop Testing**
   - Test on different screen sizes
   - Verify hover states and interactions
   - Check keyboard navigation

3. **Performance Testing**
   - Use Google PageSpeed Insights
   - Test with Lighthouse
   - Check Core Web Vitals

### Accessibility Testing
1. **Screen Reader Testing**
   - Use NVDA (Windows) or VoiceOver (Mac)
   - Test keyboard navigation
   - Verify ARIA labels

2. **Color Contrast**
   - Use WebAIM contrast checker
   - Test with color blindness simulators

## 🔒 Security Considerations

### Form Security
- Implement CSRF protection
- Validate all inputs server-side
- Use HTTPS for form submissions
- Consider rate limiting

### Content Security Policy
Add CSP headers to prevent XSS attacks:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
               font-src fonts.gstatic.com;">
```

## 📈 Analytics & Monitoring

### Google Analytics
Add Google Analytics tracking:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring
Consider adding error monitoring services:
- Sentry for JavaScript errors
- LogRocket for user session recording
- Hotjar for user behavior analytics

## 🚀 Launch Checklist

- [ ] Test all forms and form validation
- [ ] Verify all links work correctly
- [ ] Check responsive design on all devices
- [ ] Test accessibility with screen readers
- [ ] Optimize images and assets
- [ ] Set up analytics and monitoring
- [ ] Configure form handling backend
- [ ] Test performance with Lighthouse
- [ ] Verify SEO meta tags
- [ ] Check cross-browser compatibility

## 📞 Support

For technical support or questions about this website:

- **Email**: hello@coderift.tech
- **Website**: https://coderift.tech
- **Documentation**: This README file

## 📄 License

This project is proprietary to Coderift Technologies. All rights reserved.

---

**Built with ❤️ by Coderift Technologies**

*Transforming ideas into powerful digital solutions*
