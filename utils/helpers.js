module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    // get_emoji: () => {
    //   const randomNum = Math.random();
  
    //   // Return a random emoji
    //   if (randomNum > 0.7) {
    //     return `<span for="img" aria-label="lightbulb">💡</span>`;
    //   } else if (randomNum > 0.4) {
    //     return `<span for="img" aria-label="laptop">💻</span>`;
    //   } else {
    //     return `<span for="img" aria-label="gear">⚙️</span>`;
    //   }
    // },
    // renderMealRating: (rating) => {
    //   let stars = '';
    //   for (let i = 0; i < rating; i++) {
    //     stars += '⭐️';
    //   }
    //   return stars;
    // }
    // {{renderMealRating recipe.rating}}
  };
  
  