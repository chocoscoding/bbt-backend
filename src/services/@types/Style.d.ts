import { Style } from "@prisma/client";
interface CreateStyleInput {
  name: string;
  description: string;
  stylePictures: string[];
  coverPicture: string;
  averageTime: number;
  categoryName: string;
  note?: string;
}
interface EditStyleInput extends Partial<CreateStyleInput> {
  id: string;
}

interface DeleteStyleInput {
  id: string;
}
interface DeleteManyStylesInput {
  ids: string[];
}

interface GetOneStyleInput {
  name: string
}
interface GetStylesInput {
  page: number;
}

interface SearchStyleInput {
  searchQuery: string;
}