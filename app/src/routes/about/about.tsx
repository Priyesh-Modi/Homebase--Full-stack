import "./aboutPage.scss";

// Functional component with no props
const AboutPage: React.FC = () => {
    return (
        <div className="aboutPage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">About HomeBase</h1>
                    <p>
                        At HomeBase, we are committed to helping you find your dream property.
                        With over 16 years of experience in the real estate industry, we’ve
                        built a reputation for trust, excellence, and a deep understanding of the market.
                    </p>
                    <p>
                        Our mission is to connect people with their ideal homes by offering
                        a seamless and transparent experience. Whether youre buying, selling,
                        or renting, HomeBase is your trusted partner every step of the way.
                    </p>
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Excellence</h2>
                        </div>
                        <div className="box">
                            <h1>5000+</h1>
                            <h2>Happy Clients</h2>
                        </div>
                        <div className="box">
                            <h1>3000+</h1>
                            <h2>Properties Listed</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/realestate1.jpg" alt="About Us" />
            </div>
        </div>
    );
}

export default AboutPage;
