// Grab the container where posts will go
const blogContainer = document.querySelector(".blog-list");

// Fetch posts.json
fetch("posts.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load posts.json");
    return response.json();
  })
  .then(posts => {
    // Convert object to array for sorting
    const postEntries = Object.entries(posts);

    // Sort by date descending (latest first)
    postEntries.sort(([, a], [, b]) => new Date(b.date) - new Date(a.date));


    // Clear existing content (if any)
    blogContainer.innerHTML = "";

    // Loop through posts and create article elements
    postEntries.forEach(([slug, post], index) => {
      const article = document.createElement("article");
      article.classList.add("blog-post");

      // Highlight the latest 3 posts
      if (index < 3) article.classList.add("highlight-latest");

      article.innerHTML = `
        <h2 class="headings blog-title">
          <a href="post.html?post=${slug}">${post.title}</a>
        </h2>
        <p class="blog-meta">${post.meta}</p>
        <p class="blog-excerpt">${post.excerpt || ""}</p>
      `;

      blogContainer.appendChild(article);
    });
  })
  .catch(err => {
    console.error(err);
    blogContainer.innerHTML = "<p>Could not load blog posts.</p>";
  });
