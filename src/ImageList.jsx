import React, { useEffect, useRef, useState } from 'react'
import ImageItem from './ImageItem';
import './App.css'

export default function ImageList({ images }) {

    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [count, setCount] = useState(0);
    const slideContentRef = useRef();
    const slideImgRef = useRef();

    const getHandleClick = (data) => {
        if (data.length > 0) {
            setOpen(data[1])
            setSlideIndex(data[0])
        }
    }

    const getMeta = (url) => {
        const modal = document.querySelector('.modal');

        let img = new Image();
        img.onload = function () {
            slideImgRef.current.style.width = this.width + 'px'
            slideImgRef.current.style.height = this.height + 'px'
            modal.style.height = this.height + 'px'
        };
        img.src = url;
    }

    const handleShowSlider = (direction) => {
        slideContentRef.current.classList.add('fade');

        if (direction === 'next') {
            setCount(slideIndex + 1);
            if (count === images.length) {
                setSlideIndex(1);
            } else {
                setSlideIndex(count)
            }
        } else {
            setCount(slideIndex - 1)
            if (count === 0) {
                setSlideIndex(images.length)
            } else {
                setSlideIndex(count - 1)
            }
        }
    }


    useEffect(() => {
        for (let index = 0; index < images.length; index++) {
            if (images[index].id === slideIndex) {
                setTimeout(() => {
                    slideImgRef.current.src = images[index].image;
                    getMeta(images[index].image)
                    let parentElement = slideImgRef.current.nextElementSibling;
                    parentElement.firstChild.innerHTML = images[index].title;
                    parentElement.lastChild.innerHTML = images[index].description;
                    slideContentRef.current.classList.remove('fade')
                }, 500);
            }
        }
    }, [slideIndex, images])


    return (
        <>
            <div className={`container`}>

                {
                    images.map((item) => (
                        <ImageItem changeClick={(data) => getHandleClick(data)} key={item.id} item={item} />
                    ))
                }
            </div>
            <div className={`modal-wrapper ${open ? 'showModal' : ''}`}>
                <div className={`modal `}>

                    <svg className="btn-close"
                        onClick={() => setOpen(false)}
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray"
                        viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>


                    <div className="modal-content" ref={slideContentRef}>
                        <img ref={slideImgRef} src="" alt='' />
                        <div className="modal-content-title">
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <svg className="btn-prev" onClick={() => handleShowSlider('prev')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray"
                        viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <svg className="btn-next" onClick={() => handleShowSlider('next')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray"
                        viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </div>
        </>
    )
}


// function getMeta(url) {
//     var img = new Image();
//     img.onload = function () {
//         alert(this.width + " " + this.height);
//     };
//     img.src = url;
// }