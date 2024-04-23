import React, {useEffect,useState} from 'react';
import mingtar from './asset/img/Mingtar.jpg';
import praewa from './asset/img/Praewa.jpg';
import Tee from './asset/img/Tee.jpg';
import jin from './asset/img/jin_webpro.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const Aboutus = () =>{
    
    const [significantDays, setSignificantDays] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    let rooturl = `https://calendarific.com/api/v2/holidays?&api_key=NaDWnnvoH75FggStSBydTrKYSFTqfYsF&country=TH&year=2023`;
    useEffect(() => {
        fetch(rooturl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            //fetch data from the public web service
            .then((data1) => {
                const days = {};
                const holiday = data1.response.holidays;
                holiday.forEach(day => {
                    const date = (day.date.datetime)
                    const dateStr = `${date.year}-${date.month}-${date.day}`;
                    days[dateStr] = day.name;
                });
                setSignificantDays(days);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); 
    const tileContent = ({ date }) => {
       //get name of the day
        const dateStr = `${date.getFullYear()-1}-${date.getMonth() + 1}-${date.getDate()}`;
        if (significantDays[dateStr]) {
            return <p >{significantDays[dateStr]}</p>;
        }
        return null;
    };
    return ( 
        <div>
            <div class=" items-center text-center justify-center text-5xl pt-6">About us</div>
       <div class="flex flex-wrap self-auto pt-6 items-center justify-center max-w-full max-h-full ">
        <div class="flex flex-col text-center">
            <img src={mingtar} alt="" loading="lazy" class="max-w-96 max-h-96  pr-4" />
            <div class="text-lg font-mono font-semibold">Jakkaphat Jumratboonsum</div>
        </div>
        <div class="flex flex-col text-center ">
            <img src={praewa} alt="" loading="lazy" class="max-w-96 max-h-96 pr-4"/>
            <div class="text-lg font-mono font-semibold">Praewa Chan-on</div>
        </div>
        <div class="flex flex-col  text-center">
            <img src={Tee} alt="" loading="lazy"class="max-w-96 max-h-96 pr-4"/>
            <div class="text-lg font-mono font-semibold">Kasidis Boonchu</div>
        </div>
        <div class="flex flex-col  text-center">
            <img src={jin} alt="" loading="lazy"class="max-w-96 max-h-96 pr-4"/>
            <div class="text-lg font-mono font-semibold">Jinjutha Jindapunpaisan</div>
        </div>
        </div>
        <div class=" items-center text-center justify-center text-5xl pt-6">Our journey</div>
        <div class="flex flex-col pt-6 pr-4 pl-4 mr-56 ml-56 mt-5">According to the report of footwear market, the global sneaker market size was valued at USD 389.23 billion in 202, thus, the sneakers have become one of the most popular accessories for people whenever they wore it for the various events. Therefore, our group started to establish Stock-Y, which is a brand-new business that sells sneakers to customers by using online websites. We work as a middleman who buys products from many brands and sells them to customers. Our products come from many popular sneaker brands such as Nike, Adidas, Reebok, Vans, and Converse. 
We sell all categories of sneakers, including cross training, walking, and running shoes. These are for customers of all ages, from small kids and teenagers, to mens and womens. We also buy and sell limited edition sneakers, which are sometimes hard to find. All sneakers we buy are from companies that are based in Thailand. Occasionally, our store offers sales and promotions.
</div> 
<div class=" items-center text-center justify-center text-5xl pt-6 mt-6">Our Closing Day</div>
<div className="flex flex-col  mr-56 ml-56 mt-10 mb-10 items-center justify-center">
                <Calendar className="items-center justify-center rounded-2xl "
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={tileContent}
                />
            </div>
        </div>)
}
 
export default Aboutus;
