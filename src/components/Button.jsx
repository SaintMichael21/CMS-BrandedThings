const Button = ({ nameProp }) => {
  return (
    <>
      <div className="col-6">
        <button
          className="btn btn-lg btn-primary rounded-pill w-100 p-2"
          type="submit"
        >
          {nameProp}
        </button>
      </div>
    </>
  );
};

export default Button;
