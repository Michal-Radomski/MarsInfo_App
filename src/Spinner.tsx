import "./styles/App.scss";

const Spinner = (): JSX.Element => {
  return (
    <div className="center">
      <p style={{textAlign: "center", marginBottom: "10px", fontSize: "160%", fontWeight: "bolder"}}>Loading...</p>
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
