// Get ?post= value from URL
const params = new URLSearchParams(window.location.search);
const postKey = params.get("post");

// Grab DOM elements
const titleEl = document.getElementById("post-title");
const metaEl = document.getElementById("post-meta");
const contentEl = document.getElementById("post-content");

// Fetch posts.json
fetch("posts.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load posts.json");
    return response.json();
  })
  .then(posts => {
    if (postKey && posts[postKey]) {
      const post = posts[postKey];

      titleEl.textContent = post.title;
      metaEl.textContent = post.meta;

      // Fetch the HTML content for the post
      fetch(post.contentFile)
        .then(resp => {
          if (!resp.ok) throw new Error("Failed to load post content");
          return resp.text();
        })
        .then(html => {
          contentEl.innerHTML = html;
        })
        .catch(err => {
          contentEl.innerHTML = "<p>Sorry, this post couldn’t be loaded.</p>";
          console.error(err);
        });

    } else {
      // Fallback for no ?post= param or invalid key
      titleEl.textContent = "Blog Post";
      metaEl.textContent = "";
      contentEl.innerHTML = `
        <p>This page displays individual blog posts.</p>
        <p>Please return to the <a href="blog.html">blog page</a> to choose an article.</p>
      `;
    }
  })
  .catch(err => {
    titleEl.textContent = "Error";
    contentEl.innerHTML = "<p>Could not load blog posts.</p>";
    console.error(err);
  });
