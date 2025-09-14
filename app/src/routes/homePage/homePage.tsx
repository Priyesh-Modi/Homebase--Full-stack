import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

// Assuming currentUser has a defined structure
interface User {
  avatar: string | null;
  username: string;
}

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation('common');

  const { currentUser } = useContext(AuthContext);

  return (
      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">{t('Title')}</h1>
            <p>{t('Desc')}</p>
            <SearchBar />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src="/realestate.png" alt="Real estate" />
        </div>
      </div>
  );
}

export default HomePage;
