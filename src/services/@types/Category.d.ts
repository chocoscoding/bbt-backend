import { Category, Style } from "@prisma/client";

interface CreateCategoryInputType {
  name: string;
  coverImage: string;
}

interface GetOneCategoryInputType {
    name: string;
}
interface CategoryInputType {
    id: string;
}

interface CategoriesType extends Category {
  styles: Style[];
}
