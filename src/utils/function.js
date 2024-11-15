export function filterPost(posts, searchWord){
    return posts.sort((a, b) => a.createdAt < b.createdAt ? 1: -1)
                .filter(post => post.title.toLowerCase().includes(searchWord.toLowerCase()) 
                        || post.content.toLowerCase().includes(searchWord.toLowerCase()));
}
