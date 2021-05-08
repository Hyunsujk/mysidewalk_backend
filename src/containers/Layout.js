import { useState } from "react";
import { Button, makeStyles, Grid, Typography, Box } from "@material-ui/core";
import sortData from "../utils/sortData";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  customFilledButton: {
    backgroundColor: "#05677e",
    color: "#fff",
  },
});

const Layout = () => {
  const { input, customFilledButton } = useStyles();
  const [arrOfUploadedStrings, setArrOfUploadedStrings] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleChooseFileClick = (e) => {
    const uploadedFile = e.target.files[0];
    setFileName(uploadedFile.name.replace(".txt", ""));
    parseDataFromUploadedFile(uploadedFile);
  };

  const parseDataFromUploadedFile = (file) => {
    const textType = /text.*/;
    if (file && file.type.match(textType)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = reader.result;
        setArrOfUploadedStrings(content.split(/\r\n|\n/));
      };
      reader.readAsText(file);
      setIsFileUploaded(true);
    }
  };

  const handleSortDownloadClick = () => {
    const sortedData = sortData(arrOfUploadedStrings);
    handleDownload(sortedData);
  };

  const handleDownload = (sortedData) => {
    const element = document.createElement("a");
    const blob = new Blob([sortedData], { type: "text/plain" });
    element.href = URL.createObjectURL(blob);
    element.download = `sorted-${fileName}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    setIsFileUploaded(false);
  };

  return (
    <Box m="40px">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item>
          <Typography variant="h4">mySidewalk Backend Challenge</Typography>
        </Grid>
        <Grid item>
          <input
            accept=".txt"
            id="file-input"
            type="file"
            className={input}
            onChange={handleChooseFileClick}
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
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={customFilledButton}
            onClick={handleSortDownloadClick}
            disabled={!isFileUploaded}
          >
            sort the data &amp; download
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
