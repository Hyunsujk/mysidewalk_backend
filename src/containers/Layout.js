import { useState, useEffect } from "react";
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
  const [file, setFile] = useState(null);
  const [arrOfStrings, setArrOfStrings] = useState([]);

  const handleUploadedFile = (e) => {
    console.log("handle", e.target);

    console.log("uploaded file", e.target.files[0]);

    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const textType = /text.*/;
    if (file.type.match(textType)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = reader.result;
        setArrOfStrings(content.split(/\r\n|\n/));
        console.log(content);
      };
      reader.readAsText(file);
    }
    console.log("lines-----", arrOfStrings);
    // const uploadedFile = new FormData();
    // uploadedFile.append("file", file);
    // console.log(Array.from(uploadedFile));
  };

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

      <Button
        variant="outlined"
        className={customButton}
        onClick={handleFileUpload}
      >
        Upload
      </Button>
    </>
  );
};

export default Layout;
