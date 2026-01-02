fetch("data/posts.json")
  .then(response => response.json())
  .then(posts => {
    const blogList = document.querySelector(".blog-list");

    // Convert object → array so we can sort
    const postEntries = Object.entries(posts);

    // Sort by date (newest first)
    postEntries.sort(([, a], [, b]) => new Date(b.date) - new Date(a.date));

    postEntries.forEach(([key, post]) => {

      // 🔹 AUTO-GENERATE META TEXT FROM DATE
      const dateObj = new Date(post.date);
      const metaText = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long"
      });

      const article = document.createElement("article");
      article.classList.add("blog-post");

      article.innerHTML = `
        <h2 class="headings blog-title">
          <a href="post.html?post=${key}">${post.title}</a>
        </h2>
        <p class="blog-meta">${metaText}</p>
        <p class="blog-excerpt">${post.excerpt}</p>
      `;

      blogList.appendChild(article);
    });
  })
  .catch(error => {
    console.error("Error loading blog posts:", error);
  });
