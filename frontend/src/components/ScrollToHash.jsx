import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToHash = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const offset = rect.top + window.scrollY;
                    const middley = offset - window.innerHeight / 2 + rect.height / 2;

                    window.scrollTo({ top: middley, behavior: 'smooth' })
                }
            }, 0)
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [hash]);

    return null;
};

export default ScrollToHash;