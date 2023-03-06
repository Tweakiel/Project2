const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector(".recipe-name-hb").value.trim();
  const image = document.querySelector(".recipe-img-hb").value.trim();
  const category_id = parseInt(
    document.querySelector(".category-input").value.trim()
  );
  const description = document.querySelector(".recipe-des-hb").value.trim();
  const instructions = document.querySelector(".recipe-ins-hb").value.trim();
  const ingredients = document.querySelector(".recipe-ing-hb").value.trim();

  if (
    name &&
    image &&
    category_id &&
    description &&
    instructions &&
    ingredients
  ) {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      body: JSON.stringify({
        name,
        image,
        category_id,
        description,
        instructions,
        ingredients,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create recipe");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete recipe");
    }
  }
};

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

// document
//   .querySelector(".project-list")
//   .addEventListener("click", delButtonHandler);
