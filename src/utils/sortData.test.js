import sortData from "./sortData";

describe("Sort data function", () => {
  const arrayOfNumStartStringOnly = ["15 months", "11 apple", "3 banana"];
  const arrayOfNumStartStringWithoutSpace = ["15months", "11apple", "3banana"];
  const arrayOfNumStartStringWithAndWithoutSpace = [
    "15 months",
    "11apple",
    "3banana",
  ];
  const arrayOfNumAndNoNumStrings = ["4 doors", "cookies", "55 cars", "cat"];
  const arrayOfSameNumDiffWords = ["5 cars", "5 pens", "5 dogs"];
  const arrayOfNoNumStringsOnly = ["pillow", "bike", "tree"];
  const arrayOfNumStringCaseInsensitive = [
    "3 Kites",
    "3Kids",
    "3kings",
    "3 kettles",
  ];

  it("should resolve array of string starts with number only", () => {
    const result = sortData(arrayOfNumStartStringOnly);
    expect(result).toStrictEqual(`3 banana\n11 apple\n15 months\n`);
  });
  it("should resolve array of string starts with number and no space inbetween", () => {
    const result = sortData(arrayOfNumStartStringWithoutSpace);
    expect(result).toStrictEqual(`3banana\n11apple\n15months\n`);
  });
  it("should resolve array of string starts with number that are with/without space inbetween", () => {
    const result = sortData(arrayOfNumStartStringWithAndWithoutSpace);
    expect(result).toStrictEqual(`3banana\n11apple\n15 months\n`);
  });
  it("should resolve array of string starts with/without number", () => {
    const result = sortData(arrayOfNumAndNoNumStrings);
    expect(result).toStrictEqual(`4 doors\n55 cars\ncat\ncookies\n`);
  });
  it("should resolve array of string starts with same number but different words", () => {
    const result = sortData(arrayOfSameNumDiffWords);
    expect(result).toStrictEqual(`5 cars\n5 dogs\n5 pens\n`);
  });
  it("should resolve array of no number strings only", () => {
    const result = sortData(arrayOfNoNumStringsOnly);
    expect(result).toStrictEqual(`bike\npillow\ntree\n`);
  });
  it("should resolve array of number strings and be case insensitive", () => {
    const result = sortData(arrayOfNumStringCaseInsensitive);
    expect(result).toStrictEqual(`3 kettles\n3Kids\n3kings\n3 Kites\n`);
  });
});
