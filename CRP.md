# Critical Rendering Path (CRP)

### Lets start with a simple example - Branch: example-1-inline-critical-css

Demonstration of how a large stylesheet can impact the Critical Rendering Path (CRP) and affect page load performance. Let's create a simple example that will clearly show this effect.

First, let me check what files we currently have in the workspace.

Ran tool
Let me check the current content of the index.html file to see what we're working with.

Read file: index.html
I'll help you create a demonstration that shows how a large stylesheet can block the Critical Rendering Path. We'll create two scenarios:

1. A page with a large stylesheet that blocks rendering
2. A page with the same stylesheet but optimized for CRP

Let's create the necessary files:

Now, let's create a large stylesheet that will demonstrate the blocking behavior:

Now, let's create an optimized version of the page that demonstrates how to improve the Critical Rendering Path:

I've created a demonstration that shows how large stylesheets can affect the Critical Rendering Path. Here's what I've set up:

1. `index.html` - The unoptimized version that loads a large stylesheet synchronously
2. `styles.css` - A large stylesheet with many unused rules to simulate a real-world scenario
3. `optimized.html` - An optimized version that demonstrates better CRP practices

To demonstrate the difference:

1. Open `index.html` in your browser and observe how the page loads. You'll notice that the page appears blank until the large stylesheet is fully loaded and parsed.

2. Then open `optimized.html` and you'll see that the above-the-fold content appears immediately, while the rest of the styles load asynchronously.

The key differences in the optimized version are:

1. Critical CSS is inlined in the `<head>` using a `<style>` tag
2. Non-critical CSS is loaded asynchronously using `preload` and `onload`
3. The page structure is the same, but the loading strategy is different

---

4. Use Chrome DevTools' Network tab to simulate slow connections
5. Use the Performance tab to record and analyze the rendering process
6. Compare the First Contentful Paint (FCP) and Largest Contentful Paint (LCP) metrics between both versions
