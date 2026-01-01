// 1. Post metadata only
const posts = {
    "slow-stories": {
        title: "On Slow Stories",
        meta: "March 2025",
        file: "../posts/slow-stories.html"
    },
    "quiet-worlds": {
        title: "Building Quiet Worlds",
        meta: "February 2025",
        file: "../posts/quiet-worlds.html"
    }
};

// 2. Get ?post= value from URL
const params = new URLSearchParams(window.location.search);
const postKey = params.get("post");

// 3. Grab DOM elements once
const titleEl = document.getElementById("post-title");
const metaEl = document.getElementById("post-meta");
const contentEl = document.getElementById("post-content");

// 4. If post exists, load it
if (posts[postKey]) {
    const post = posts[postKey];

    titleEl.textContent = post.title;
    metaEl.textContent = post.meta;

    fetch(post.file)
        .then(response => {
            if (!response.ok) {
                throw new Error("Post file not found");
            }
            return response.text();
        })
        .then(html => {
            contentEl.innerHTML = html;
        })
        .catch(error => {
            contentEl.innerHTML =
                "<p>Sorry, this post couldn’t be loaded.</p>";
            console.error(error);
        });

} else {
    // 5. Fallback if URL is wrong
    titleEl.textContent = "Post not found";
    metaEl.textContent = "";
    contentEl.innerHTML =
        "<p>This post doesn’t exist yet.</p>";
}
