// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

const Footer = (props) => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary">© 2023 Hotel finder</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary link-underline link-underline-opacity-0" href="#">
              {t("footer.top")}
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
