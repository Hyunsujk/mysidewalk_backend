const sortData = (arrOfUploadedStrings) => {
  let stringsStartWithNum = [];
  let stringsStartWithChar = [];
  let combinedSortedArr = [];
  let outputData = "";

  const regexStringStartsWithNumber = /^\d+/;
  if (arrOfUploadedStrings) {
    arrOfUploadedStrings.forEach((string) => {
      if (string.match(regexStringStartsWithNumber)) {
        stringsStartWithNum.push(string);
      } else {
        stringsStartWithChar.push(string);
      }
    });
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
      ignorePunctuation: true,
    });
    const sortedstringsStartWithNumArray = stringsStartWithNum.sort(
      collator.compare
    );
    const sortedStringsWithoutNumArray = stringsStartWithChar.sort();
    combinedSortedArr = [
      ...sortedstringsStartWithNumArray,
      ...sortedStringsWithoutNumArray,
    ];

    combinedSortedArr.forEach((string) => (outputData += `${string}\n`));
    return outputData;
  }
};

export default sortData;
