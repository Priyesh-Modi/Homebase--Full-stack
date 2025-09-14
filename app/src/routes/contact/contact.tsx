import "./contactPage.scss";

const ContactPage: React.FC = () => {
    return (
        <div className="contactPage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">Get in Touch</h1>
                    <p>
                        Have questions? We're here to help. Whether you're looking to buy,
                        sell, or rent, our team is ready to assist you. Reach out to us via
                        phone, email, or by filling out the form below.
                    </p>
                    <div className="contactInfo">
                        <div className="infoBox">
                            <h2>Phone</h2>
                            <p>+1 234 567 890</p>
                        </div>
                        <div className="infoBox">
                            <h2>Email</h2>
                            <p>support@homebase.com</p>
                        </div>
                        <div className="infoBox">
                            <h2>Address</h2>
                            <p>360 Huntington Ave, Boston, MA</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="formContainer">
                <form className="contactForm">
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;
