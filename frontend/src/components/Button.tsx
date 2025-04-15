import { FC } from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
}

export const Button: FC<ButtonProps> = ({ text, onClick, variant = "primary" }) => {
    const styles = {
        primary: { backgroundColor: "blue", color: "white", padding: "10px 16px", borderRadius: "4px", border: "none" },
        secondary: { backgroundColor: "gray", color: "black", padding: "10px 16px", borderRadius: "4px", border: "none" }
    };

    return (
        <button
            onClick={onClick}
        >
            {text}
        </button>
    );
};
