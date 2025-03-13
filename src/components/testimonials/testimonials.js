import React from "react";
import "./testimonials.css";
import AVTR1 from "../../assects/testimonials/profile.jpg";
import AVTR2 from "../../assects/testimonials/profile.jpg";
import AVTR3 from "../../assects/testimonials/profile.jpg";
import AVTR4 from "../../assects/testimonials/profile.jpg";

// Import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const data = [
    {
        avatar: AVTR1,
        name: "Rakesh Shah",
        review:
            "Rakesh’s contribution to the project is noteworthy with his value addition of various available options available with him for development of website front end & connecting the same with back end.He has good communication & analytical skills which gives him an edge over the other team members which contributed immensely to the firm’s project. ",
    },
    {
        avatar: AVTR2,
        name: "Person name",
        review:
            "clients reviews are here. lets here i am taking review of twenty words. client can say his/her openions on my project in review section. clients reviews are here. lets here i am taking review of twenty words. client can say his/her openions on my project in review section",
    },
    {
        avatar: AVTR3,
        name: "Person name",
        review:
            "clients reviews are here. lets here i am taking review of twenty words. client can say his/her openions on my project in review section. clients reviews are here. lets here i am taking review of twenty words. client can say his/her openions on my project in review section",
    },
    {
        avatar: AVTR4,
        name: "Person name",
        review:
            "clients reviews are here. lets here i am taking review of twenty words. client can say his/her openions on my project in review section. clients reviews are here. lets here i am taking review of twenty words. client can say his/her openions on my project in review section",
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials">
            {/* <h5 className='text-white text-center'>Review from clients</h5> */}
            <h2 className='text-white text-center'>Testimonials</h2>
            <Swiper
                className="container testimonial__container"
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                {data.map(({ avatar, name, review }, index) => {
                    return (
                        <SwiperSlide key={index} className="testimonial">
                            <div className="client__avatar">
                                <img src={avatar} alt={`Avatar ${index + 1}`} />
                            </div>
                            <h5 className="client__name text-white">{name}</h5>
                            <small className="client__review text-white" 
                            style={{
                                fontSize: '20px',
                                fontFamily: 'monospace'
                            }}
                            >{review}</small>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
};

export default Testimonials;
