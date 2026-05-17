// src/components/Loader.tsx
import "./Loader.css";

interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export default function Loader({ size = 24, color = "currentColor", className = "" }: Readonly<Props>) {
  return (
    <div 
      className={`loader ${className}`}
      style={{ 
        width: size, 
        height: size,
        color: color 
      }}
    >
      <div className="loader-spinner"></div>
    </div>
  );
}