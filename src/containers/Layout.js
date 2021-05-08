import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  hiddens: {
    display: "none",
  },
  customFilledButton: {
    backgroundColor: "#05677e",
    color: "#fff",
  },
  customOutlinedButton: {
    color: "#05677e",
  },
});

const Layout = () => {
  const { hidden, customFilledButton, customOutlinedButton } = useStyles();
  const [arrOfStrings, setArrOfStrings] = useState([]);
  let stringsStartWithNum = [];
  let stringsWithoutNum = [];
  let combinedSortedArr = [];
  let outputData = "";

  const handleUploadedFile = (e) => {
    const uploadedFile = e.target.files[0];
    parseDataFromUploadedFile(uploadedFile);
  };

  const parseDataFromUploadedFile = (file) => {
    const textType = /text.*/;
    if (file && file.type.match(textType)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = reader.result;
        setArrOfStrings(content.split(/\r\n|\n/));
      };
      reader.readAsText(file);
    }
  };

  const sortData = () => {
    const regexStringStartsWithNumber = /^\d+/;
    arrOfStrings.forEach((string) => {
      if (string.match(regexStringStartsWithNumber)) {
        stringsStartWithNum.push(string);
      } else {
        stringsWithoutNum.push(string);
      }
    });
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
    const sortedstringsStartWithNumArray = stringsStartWithNum.sort(
      collator.compare
    );
    const sortedStringsWithoutNumArray = stringsWithoutNum.sort();
    combinedSortedArr = [
      ...sortedstringsStartWithNumArray,
      ...sortedStringsWithoutNumArray,
    ];
    combinedSortedArr.forEach((string) => (outputData += `${string}\n`));
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const blob = new Blob([outputData], { type: "text/plain" });
    element.href = URL.createObjectURL(blob);
    element.download = "sorted.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <>
      <input
        accept=".txt"
        id="file-input"
        type="file"
        className={hidden}
        onChange={handleUploadedFile}
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          className={customFilledButton}
          component="span"
        >
          choose file
        </Button>
      </label>

      <Button
        variant="outlined"
        className={customOutlinedButton}
        onClick={sortData}
      >
        sort the text file
      </Button>

      <Button
        variant="contained"
        className={customFilledButton}
        onClick={handleDownload}
      >
        download sorted text file
      </Button>
    </>
  );
};

export default Layout;
