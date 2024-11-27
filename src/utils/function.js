export function filterPost(posts, searchWord = ""){
    return posts.sort((a, b) => a.createdAt < b.createdAt ? 1: -1)
                .filter(post => post.title.toLowerCase().includes(searchWord.toLowerCase()) 
                        || post.content.toLowerCase().includes(searchWord.toLowerCase()));
}


export function dateDiff(dateStr) {
  
    const dateNow = new Date();
    dateStr = new Date(dateStr);
    const diff = dateNow - dateStr;
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
    if (days > 0) {
      return (days > 31) ? dateStr.toLocaleDateString(): `${days} day${days > 1 ? 's' : ''}`;
    }
    else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } 
    else{
        return (minutes < 1) ?  "1 minute" :`${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  }

  

export function sumComment(posts){
  return  posts.map((post) => post.comment.length)
  .reduce((acc, current) => acc + current, 0)
}
 