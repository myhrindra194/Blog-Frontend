export function filterPost(posts, searchWord){
    return posts.sort((a, b) => a.createdAt < b.createdAt ? 1: -1)
                .filter(post => post.title.includes(searchWord) || post.content.includes(searchWord));
}
