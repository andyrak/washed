import fs from "fs";
import path from "path";

export const getGreeting = () => {
  // Get the current date and time
  const now = new Date();

  // Calculate the UTC time in milliseconds
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  // Get the user's local time in milliseconds
  const localTime = new Date(utcTime);

  // Extract the current hour in the user's local timezone
  const currentHour = localTime.getHours();

  // Determine the greeting based on the hour
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
