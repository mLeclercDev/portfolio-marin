import React from "react";
import { SplitText } from "@cyriacbr/react-split-text";

// Animation de l’introduction
const AnimatedTitle = ({ children, textRef }) => {
    return (
        <SplitText
            ref={textRef}
            LineWrapper={({ children }) => <div className="line-wrapper"><span className="line">{children}</span></div>}
            WordWrapper={({ children }) => (
                <>{children}</>
            )}
            LetterWrapper={({ children }) => (
                <>{children}</>
            )}
        >
            {children}
        </SplitText>
    );
}

export default AnimatedTitle;
