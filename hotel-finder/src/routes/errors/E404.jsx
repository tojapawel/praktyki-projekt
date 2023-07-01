import { Link } from "react-router-dom";

function E404() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h4 className="mb-4">ヽ( ﾟロ ﾟ)ﾉ</h4>
      <h1 className="display-5 fw-bold text-body-emphasis">Błąd 404</h1>
      <h1 className="display-5 fw-bold text-body-emphasis"></h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Wygląda na to, że strona której szukasz nie istnieje :&#40;</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/" className="btn btn-primary btn-lg px-4 gap-3">
            Strona główna
          </Link>
        </div>
      </div>
    </div>
  );
}

export default E404;
