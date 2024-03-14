export interface Recipe {
  id: number,
  uid: string,
  recipeName: string,
  description: string,
  ingredients: Ingredient[],
  steps: string[],
  tags: string[]
}

export interface Ingredient {
  ingredient: string;
  amount: number;
  unit: string;
}
