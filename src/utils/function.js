export function filterPost(posts, searchWord=""){
    return posts.sort((a, b) => a.createdAt < b.createdAt ? 1: -1)
                .filter(post => post.title.toLowerCase().includes(searchWord.toLowerCase()) 
                        || post.content.toLowerCase().includes(searchWord.toLowerCase()));
}


export function dateDiff(dateStr) {
    const now = new Date();
    const diff = now - new Date(dateStr);
  
    const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
    const heures = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((diff % (1000 * 60)) / 1000);  
  
    if (jours > 0) {
      return `Il y a ${jours} jour${jours > 1 ? 's' : ''}`;
    } else if (heures > 0) {
      return `Il y a ${heures} heure${heures > 1 ? 's' : ''}`;
    } else if(minutes > 0){
      return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    else {
        return `Il y a ${secondes} seconds`;
    }
  }