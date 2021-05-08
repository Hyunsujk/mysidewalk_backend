import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  customButton: {
    backgroundColor: "#05677e",
    color: "#fff",
  },
});

const Layout = () => {
  const { input, customButton } = useStyles();
  const [arrOfUnsortedStrings, setArrOfUnsortedStrings] = useState([]);

  const handleUploadedFile = (e) => {
    const uploadedFile = e.target.files[0];
    handleDataFromUploadedFile(uploadedFile);
  };

  const handleDataFromUploadedFile = (file) => {
    const textType = /text.*/;
    if (file && file.type.match(textType)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = reader.result;
        setArrOfUnsortedStrings(content.split(/\r\n|\n/));
      };
      reader.readAsText(file);
    }
  };
  console.log(arrOfUnsortedStrings);

  return (
    <>
      <input
        accept=".txt"
        id="file-input"
        type="file"
        // className={input}
        onChange={handleUploadedFile}
      />
      <label htmlFor="file-input">
        <Button variant="contained" className={customButton} component="span">
          Choose File
        </Button>
      </label>

      <Button variant="outlined" className={customButton}>
        Upload
      </Button>
    </>
  );
};

export default Layout;
