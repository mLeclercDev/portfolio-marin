import React, { useEffect } from "react";
import Image from 'next/image';
import '../../styles/components/global/cursor.scss';

const Cursor = () => {
    useEffect(() => {
        const cursorContainers = document.querySelectorAll("[data-cursor-container]");

        const moveCursors = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorContainers.forEach(cursor => {
                cursor.style.left = `${posX}px`;
                cursor.style.top = `${posY}px`;
            });
        }

        const handleMouseEnter = (e) => {
            const index = e.target.getAttribute('data-index');
            const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
            if (cursor) {
                cursor.classList.add('active');
            }
        };

        const handleMouseLeave = (e) => {
            const index = e.target.getAttribute('data-index');
            const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
            if (cursor) {
                cursor.classList.remove('active');
            }
        };

        window.addEventListener("mousemove", moveCursors);

        const reviews = document.querySelectorAll('.review');
        reviews.forEach(review => {
            review.addEventListener('mouseenter', handleMouseEnter);
            review.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("mousemove", moveCursors);
            reviews.forEach(review => {
                review.removeEventListener('mouseenter', handleMouseEnter);
                review.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor-container" data-index="1" data-cursor-container>
                <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
            </div>
            <div className="cursor-container" data-index="2" data-cursor-container>
                <Image className='fit-cover' src="/Images/layer-2.png" alt="Mon image" width={1150} height={520} />
            </div>
            <div className="cursor-container" data-index="3" data-cursor-container>
                <Image className='fit-cover' src="/Images/layer-3.png" alt="Mon image" width={1150} height={520} />
            </div>
        </>
    );
};

export default Cursor;
