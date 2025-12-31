const posts = {
    "slow-stories": {
        title: "On Slow Stories",
        meta: "March 2025",
        content: `
            <p>Some stories don’t want to be rushed.</p>

            <p>
                They unfold in pauses, in atmosphere, in what’s left unsaid.
                They ask the reader not for speed, but for attention.
            </p>

            <p>
                Writing slowly isn’t indulgence — it’s fidelity to the kind of
                story being told.
            </p>
        `
    },

    "quiet-worlds": {
        title: "Building Quiet Worlds",
        meta: "February 2025",
        content: `
            <p>
                Worldbuilding doesn’t always live in maps and histories.
            </p>

            <p>
                Sometimes it’s in habit. In silence. In the way characters
                move through familiar spaces.
            </p>
        `
    }
};

const params = new URLSearchParams(window.location.search);
const postKey = params.get("post");

if (posts[postKey]) {
    document.getElementById("post-title").innerText = posts[postKey].title;
    document.getElementById("post-meta").innerText = posts[postKey].meta;
    document.getElementById("post-content").innerHTML = posts[postKey].content;
} else {
    document.getElementById("post-title").innerText = "Post not found";
    document.getElementById("post-content").innerHTML =
        "<p>This post doesn’t exist yet.</p>";
}