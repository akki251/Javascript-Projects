getRandomMeal();
fetchFavouriteMeals();

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

const mealPopup = document.getElementById("meal-popup");
const popCloseBtn = document.getElementById("close-popup");
const meals = document.getElementById("meals");
const favContainer = document.querySelector(".fav-meals");
const mealInfoEl = document.getElementById("meal-info");
async function getRandomMeal() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const responseData = await response.json();
  const randomMeal = responseData.meals[0];
  //   console.log(randomMeal);

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const resp = await meal.json();

  const mealData = resp.meals[0];
  return mealData;
}

async function getMealBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();

  const meals = respData.meals;
  console.log(meals);
  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `

          <div class="meal-header">
            

          ${random ? `<span class="random"> Random Recipe </span>` : ""}

            <img

              src="    ${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
          </div>
          <div class="meal-body">
            <h4>  ${mealData.strMeal} </h4>
            <button class="fav-btn"><i class="fas fa-heart "></i></button>
          </div>
 `;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (btn.classList.contains("active")) {
      removeMealsFromLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
      addMealToLocalStorage(mealData.idMeal);
    }
    favContainer.innerHTML = "";
    fetchFavouriteMeals();
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  meals.appendChild(meal);
}

function removeMealsFromLS(mealId) {
  const mealIds = getMealFromLocalStorage();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function addMealToLocalStorage(mealId) {
  const mealIds = getMealFromLocalStorage();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function getMealFromLocalStorage() {
  const mealsId = JSON.parse(localStorage.getItem("mealIds"));

  return mealsId === null ? [] : mealsId;
}

async function fetchFavouriteMeals() {
  const mealIds = getMealFromLocalStorage();
  const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    const singleMeal = await getMealById(mealId);
    meals.push(singleMeal);

    addMealToFavourite(singleMeal);
  }
}

function addMealToFavourite(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
  

  <img
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"
  /><span>${mealData.strMeal} </span>
  <button><i class="far fa-trash-alt clear"></i></button>
   `;

  btn = favMeal.querySelector("button");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    removeMealsFromLS(mealData.idMeal);
    favContainer.innerHTML = "";
    fetchFavouriteMeals();
  });
  favContainer.appendChild(favMeal);

  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
}

function showMealInfo(mealData) {
  mealInfoEl.innerHTML = "";
  const mealEl = document.createElement("div");
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  // console.log("check", ingredients);
  mealEl.classList.add("meal-info");
  mealPopup.classList.remove("hidden");
  mealInfoEl.appendChild(mealEl);

  mealEl.innerHTML = ` <h1> ${mealData.strMeal}</h1>
  <img
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"
  />

  <p>
  ${mealData.strInstructions}
  </p>
  <h3>Ingredients :</h3>
  <ul>
  
  ${ingredients
    .map(
      (ing) => `
  <li>
  ${ing}</li>
`
    )
    .join("")}
  
  </ul>
  `;
}

searchBtn.addEventListener("click", async () => {
  meals.innerHTML = "";
  const search = searchTerm.value;

  const searchMeals = await getMealBySearch(search);

  if (searchMeals) {
    searchMeals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

popCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
