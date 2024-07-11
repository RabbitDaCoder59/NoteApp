import { formatDate } from "../utils/formatdate";
import { getRandomColor } from "../utils/Randomcolor";
import { generateId } from "../utils/generateId";

export const notes = [
  {
    id: generateId(),
    title: "Note Title 1",
    content:
      "This is the content of the note. You can write any text here that you want to include in your note card.",
    date: formatDate(new Date()),
    notecolor: getRandomColor(),
  },
  {
    id: generateId(),
    title: "Note Title 2",
    content:
      "This is the content of the note. You can write any text here that you want to include in your note card.",
    date: formatDate(new Date()),
    notecolor: getRandomColor(),
  },
  {
    id: generateId(),
    title: "Note Title 3",
    content:
      "This is the content of the note. You can write any text here that you want to include in your note card.",
    date: formatDate(new Date()),
    notecolor: getRandomColor(),
  },
  {
    id: generateId(),
    title: "Another Note Title 1",
    content:
      "This is another content of the note. You can write any text here that you want to include in your note card.",
    date: formatDate(new Date()),
    notecolor: getRandomColor(),
  },
  {
    id: generateId(),
    title: "Another Note Title 2",
    content:
      "This is another content of the note. You can write any text here that you want to include in your note card.",
    date: formatDate(new Date()),
    notecolor: getRandomColor(),
  },
  {
    id: generateId(),
    title: "Another Note Title 3",
    content: "",
    date: formatDate(new Date()),
    notecolor: getRandomColor(),
  },
  // Add more notes as needed
];
