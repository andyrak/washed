import fs from "fs";
import path from "path";

export const fmtMSS = (seconds: number) => {
  return new Date(seconds).toISOString().substring(15, 15 + 4);
};

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "morning";
  }

  if (currentHour >= 12 && currentHour < 17) {
    return "afternoon";
  }

  return "evening";
};

const getCongrats = () => {
  const fileContents = fs.readFileSync(
    path.resolve(process.cwd(), "./src/utils/words/congrats.txt"),
    "utf8"
  );
  return getRandomWord(fileContents);
};

const getSorry = () => {
  const fileContents = fs.readFileSync(
    path.resolve(process.cwd(), "./src/utils/words/sorry.txt"),
    "utf8"
  );
  return getRandomWord(fileContents);
};

const getNoun = () => {
  const fileContents = fs.readFileSync(
    path.resolve(process.cwd(), "./src/utils/words/nouns.txt"),
    "utf8"
  );
  return getRandomWord(fileContents);
};

const getRandomWord = (fileContents: string) => {
  const words = fileContents.split("\n");
  return words[Math.floor(Math.random() * words.length)];
};

export const getIsWashed = (yearDelta: number) => {
  return yearDelta >= 10;
};

export const getWashedPhrase = (yearDelta: number) => {
  const isWashed = getIsWashed(yearDelta);
  const phrase = `${
    isWashed ? getSorry() : getCongrats()
  } ${getNoun()}, you're ${isWashed ? "" : "not "}`;
  return phrase;
};
