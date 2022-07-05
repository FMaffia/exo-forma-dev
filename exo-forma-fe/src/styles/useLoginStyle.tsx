import { makeStyles } from "@material-ui/core/styles";

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  loginBody: {
    background:
      "linear-gradient(0deg, rgba(106,27,154,1) 0%, rgba(121,71,166,1) 50%, rgba(78,25,143,1) 100%)",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    minWidth: "100vw",
  },
}));

const useLoginStyle = () => {
  return useStyles();
};
export default useLoginStyle as any;
