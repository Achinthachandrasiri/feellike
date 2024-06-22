import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion";
import './forecast.css'; // Assuming the file is in the same directory

const DAYSOFWEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ data }) => {
    const dayInWeek = new Date().getDay();
    const forecastDays = DAYSOFWEEK.slice(dayInWeek, DAYSOFWEEK.length).concat(DAYSOFWEEK.slice(0, dayInWeek));
    return (
        <div className="main">
            <Accordion allowZeroExpanded>
                {data.list.slice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="days-sec">
                                    <div className="days">
                                        <div className="day">
                                           <img alt="icon" className="icon" src={`/icons/${item.weather[0].icon}.png`} />
                                           <p>{forecastDays[idx]}</p>
                                           <p>{item.weather[0].description}</p>
                                           <p>{Math.round(item.main.temp_min)} °C / {Math.round(item.main.temp_max)} °C</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            {/* Add content for the panel here if needed */}
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Forecast;
