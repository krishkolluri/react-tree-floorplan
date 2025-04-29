import React, { useEffect, useRef, useState } from "react";

interface SvgViewerProps {
  src?: string; // e.g., "floor1.svg"
}

const SvgViewer: React.FC<SvgViewerProps> = ({ src }) => {
  const objectRef = useRef<HTMLObjectElement | null>(null);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const currentRef = objectRef.current;
    const onError = () => {
      console.error("SVG failed to load:", `/assets/${src}`);
      setLoadingError(true);
    };

    if (currentRef) {
      currentRef.addEventListener("error", onError);
      return () => currentRef.removeEventListener("error", onError);
    }
  }, [src]);

  return (
    <div>
      <p>Loading floorplan: <strong>{`/assets/${src}`}</strong></p>
      {loadingError ? (
        <p style={{ color: "red" }}>
          ❌ Failed to load floorplan. Make sure `/assets/{src}` exists in the **public** folder.
        </p>
      ) : (
        <object
          ref={objectRef}
          type="image/svg+xml"
          data={`/assets/${src}`}
          style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
        />
      )}
    </div>
  );
};

export default SvgViewer;
