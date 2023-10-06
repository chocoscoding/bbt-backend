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
interface SearchStyleInput {
  searchQuery: string;
}
