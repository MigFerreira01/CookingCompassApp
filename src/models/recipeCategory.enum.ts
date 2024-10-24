export enum RecipeCategory {
    AppetizersandSnacks = 0,
    Soups = 1,
    Salads = 2,
    MainDishes = 3,
    SideDishes = 4,
    Desserts = 5,
    Bread = 6,
    Sauces = 7,
    Drinks = 8
}

export const RecipeCategoryLabels = {
    [RecipeCategory.AppetizersandSnacks]: 'Appetizers and Snacks',
    [RecipeCategory.Soups]: 'Soups',
    [RecipeCategory.Salads]: 'Salads',
    [RecipeCategory.MainDishes]: 'Main Dishes',
    [RecipeCategory.SideDishes]: 'Side Dishes',
    [RecipeCategory.Desserts]: 'Desserts',
    [RecipeCategory.Bread]: 'Bread',
    [RecipeCategory.Sauces]: 'Sauces',
    [RecipeCategory.Drinks]: 'Drinks',
};

export const RecipeCategories = Object.values(RecipeCategory).map((value) => ({
    value, 
    label: RecipeCategoryLabels[value as RecipeCategory],
}));