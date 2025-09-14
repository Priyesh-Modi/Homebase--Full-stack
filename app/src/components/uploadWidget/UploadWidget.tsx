import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext<{ loaded: boolean }>({
  loaded: false,
});

interface UploadWidgetProps {
  uwConfig: object;  // You can replace `object` with the actual type of your `uwConfig`
  setPublicId: (publicId: string) => void; // Function to handle setting the public ID
  setState: React.Dispatch<React.SetStateAction<string[]>>;  // Assuming state holds an array of strings (URLs)
}

interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
  };
}

function UploadWidget({ uwConfig, setPublicId, setState }: UploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    const uwScript = document.getElementById("uw");
    if (!uwScript) {
      // If not loaded, create and load the script
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "uw");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    } else {
      // If already loaded, update the state
      setLoaded(true);
    }
  }, []);  // Empty dependency array means this runs once when the component mounts

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = (window as any).cloudinary.createUploadWidget(  // Cast window to any
          uwConfig,
          (error: any, result: CloudinaryResult) => {  // Add types for error and result
            if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);
              setState((prev) => [...prev, result.info.secure_url]);  // Add the uploaded image URL to state
            }
          }
      );

      // Open the widget when the button is clicked
      myWidget.open();
    }
  };

  return (
      <CloudinaryScriptContext.Provider value={{ loaded }}>
        <button
            id="upload_widget"
            className="cloudinary-button"
            onClick={initializeCloudinaryWidget}
        >
          Upload
        </button>
      </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
