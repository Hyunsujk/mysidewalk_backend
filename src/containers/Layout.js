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
  const [file, setFile] = useState(null);

  const handleUploadedFile = (e) => {
    console.log("handle", e.target);

    console.log("uploaded file", e.target.files[0]);

    setFile(e.target.files[0]);
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
    </>
  );
};

export default Layout;
