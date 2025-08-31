# Custom Furniture & Bars Project

## Project info

**URL**: https://lovable.dev/projects/807b734e-31c8-4b53-96b5-5787e5784c0e

## Image Management Guide

### How to Replace Images

All images are now organized in the `/public/images/` directory with descriptive names. To replace any image:

1. **Replace the file directly**: Simply put your new image in `/public/images/` with the same filename
2. **Update image config**: Modify `/src/lib/imageConfig.ts` if you need different paths

### Image Structure

#### Main Images
- `/public/images/hero-background.png` - Hero section background
- `/public/images/hero-door-left.png` - Left door animation 
- `/public/images/hero-door-right.png` - Right door animation
- `/public/images/pain-value.jpg` - Pain point illustration

#### Capability Images
- `/public/images/capability-bars.jpg` - Commercial bars showcase
- `/public/images/capability-home-bars.jpg` - Home bar designs
- `/public/images/capability-outdoor.jpg` - Outdoor space projects
- `/public/images/capability-furniture.jpg` - Custom furniture work

#### Project Gallery Images
- `/public/images/project-mamo-1.png` to `/public/images/project-mamo-4.png` - MAMO restaurant
- `/public/images/project-riverside-bar-1.png` to `/public/images/project-riverside-bar-3.png` - Riverside bar
- `/public/images/project-findlaters-2.png` - Findlaters project detail
- `/public/images/project-summit-inn.jpg` - Summit Inn project
- `/public/images/project-abbey.jpg` - Abbey project
- `/public/images/project-findlaters.jpg` - Findlaters main image

#### Team & Social Proof
- `/public/images/maker-profile.jpg` - Team member photo
- `/public/images/client-testimonial.jpg` - Client testimonial photo

#### Promise/Feature Icons
- `/public/images/promise-precision.png` - Precision craftsmanship icon
- `/public/images/promise-real-spaces.png` - Real spaces icon  
- `/public/images/promise-unique-results.png` - Unique results icon

#### Additional Images
- `/public/images/custom-bar-interior.png` - Custom bar interior showcase

### Adding New Images

1. Add the image file to `/public/images/` with a descriptive name
2. Update `/src/lib/imageConfig.ts` to include the new image path
3. Use the image in your components via the config: `imageConfig.yourNewImage`

### Image Optimization Tips

- Use WebP format for better compression when possible
- Keep image sizes reasonable (under 1MB for web)
- Use descriptive filenames for better SEO
- Consider lazy loading for images below the fold

### Technical Implementation

All images are now served directly from `/public/images/` via URL paths instead of imports. This approach:
- ✅ Reduces bundle size
- ✅ Enables easy image replacement without code changes
- ✅ Improves build performance
- ✅ Simplifies image management

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/807b734e-31c8-4b53-96b5-5787e5784c0e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/807b734e-31c8-4b53-96b5-5787e5784c0e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
