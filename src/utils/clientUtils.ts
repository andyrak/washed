import fs from "fs";
import path from "path";

export const getGreeting = () => {
  // Get the user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get the current date and time in the user's timezone
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: userTimezone,
  });
  const currentHour = parseInt(formatter.format(now), 10);

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
