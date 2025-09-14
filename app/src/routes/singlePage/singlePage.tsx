import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";

// Define the types for the post and user data
interface Post {
  id: string;
  title: string;
  address: string;
  price: number;
  images: string[];
  user: {
    avatar: string;
    username: string;
  };
  userId: string;
  latitude: number;
  longitude: number;
  isSaved: boolean;
  postDetail: {
    desc: string;
    utilities: string;
    pet: string;
    income: string;
    size: number;
    school: number;
    bus: number;
    restaurant: number;
  };
  bedroom: number;
  bathroom: number;
}

interface AuthContextType {
  currentuser: string | null;
  updateUser: (user: string) => void;
}

function SinglePage() {
  const post = useLoaderData() as Post; // Type the loader data as a Post
  const { currentuser } = useContext(AuthContext) as AuthContextType; // Type the context as AuthContextType
  const [saved, setSaved] = useState<boolean>(post.isSaved); // Type the saved state as boolean

  const navigate = useNavigate();

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentuser) {
      redirect("/login");
    }
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  };

  const handelSendMessage = async () => {
    try {
      await apiRequest.post("/chats", { receiverId: post.userId });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowDirection = () => {
    const url = `https://www.google.com/maps?q=${post.latitude},${post.longitude}`;
    window.open(url, '_blank');
  };

  return (
      <div className="singlePage">
        <div className="details">
          <div className="wrapper">
            <Slider images={post.images} />
            <div className="info">
              <div className="top">
                <div className="post">
                  <h1>{post.title}</h1>
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>{post.address}</span>
                  </div>
                  <div className="price">$ {post.price}</div>
                </div>
                <div className="user">
                  <img src={post.user.avatar} alt="" />
                  <span>{post.user.username}</span>
                </div>
              </div>
              <div
                  className="bottom"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.postDetail.desc) }}
              ></div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <p className="title">General</p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Utilities</span>
                  {post.postDetail.utilities === "owner" ? (
                      <p>Owner is responsible</p>
                  ) : (
                      <p>Tenant is responsible</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  {post.postDetail.pet === "Allowed" ? (
                      <p>Pets Allowed</p>
                  ) : (
                      <p>Pets Not Allowed</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Income Policy</span>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>
            <p className="title">Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.postDetail.size} sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bedroom} beds</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{post.bathroom} bathroom</span>
              </div>
            </div>
            <p className="title">Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>{post.postDetail.school}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{post.postDetail.bus}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{post.postDetail.restaurant}m away</p>
                </div>
              </div>
            </div>
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map items={[post]} />
            </div>
            <div className="buttons">
              <button onClick={handelSendMessage}>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button onClick={handleShowDirection}> Show Direction</button>
              <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: saved ? "#fece51" : "white",
                  }}
              >
                <img src="/save.png" alt="" />
                {saved ? "Place Saved" : "Save the Place"}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SinglePage;
