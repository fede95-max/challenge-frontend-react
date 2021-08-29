const ShowWithStyleInfo = ({ label, value }) => (
  <div className="d-flex flex-row ml-2">
    <label>{`${label}:`}</label>
    <div className="ml-1">{value} </div>
  </div>
);
export default ShowWithStyleInfo;
