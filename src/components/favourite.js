import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faCloudSun, faCloudRain, faCloudShowersHeavy, faDroplet, faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons'
import Chart from "chart.js/auto";
import { UserContext } from "../userContext";
import { useContext } from "react";

function FavouritesCity(props) {


    const [displayedHourTime, setDisplayedHourTime] = useState(
        Math.ceil(props.cities.weather.byHour[0].hourTime.length * 0.3)
    );
    const [displayedHourTemp, setDisplayedHourTemp] = useState(
        Math.ceil(props.cities.weather.byHour[0].hourTemperature.length * 0.3)
    );
    const [displayedHourWind, setDisplayedHourWind] = useState(
        Math.ceil(props.cities.weather.byHour[0].hourWind.length * 0.3)
    );
    const [displayedHourPrecip, setDisplayedHourPrecip] = useState(
        Math.ceil(props.cities.weather.byHour[0].hourHumidity.length * 0.3)
    );
    const [displayedHourStatus, setDisplayedHourStatus] = useState(
        Math.ceil(props.cities.weather.byHour[0].hourWeatherStatus.length * 0.3)
    );
    const [displayPercentage, setDisplayPercentage] = useState(30);

    const handleToggle = () => {
        setIsHidden(!isHidden);
    };

    const handleHourInfoClick = () => {
        if (displayPercentage === 30) {
            setDisplayedHourTime(Math.ceil(props.cities.weather.byHour[0].hourTime.length * 0.7));
            setDisplayedHourTemp(Math.ceil(props.cities.weather.byHour[0].hourTemperature.length * 0.7));
            setDisplayedHourWind(Math.ceil(props.cities.weather.byHour[0].hourWind.length * 0.7));
            setDisplayedHourPrecip(
                Math.ceil(props.cities.weather.byHour[0].hourHumidity.length * 0.7)
            );
            setDisplayedHourStatus(
                Math.ceil(props.cities.weather.byHour[0].hourWeatherStatus.length * 0.7)
            );
            setDisplayPercentage(70);
        } else if (displayPercentage === 70) {
            setDisplayedHourTime(props.cities.weather.byHour[0].hourTime.length);
            setDisplayedHourTemp(props.cities.weather.byHour[0].hourTemperature.length);
            setDisplayedHourWind(props.cities.weather.byHour[0].hourWind.length);
            setDisplayedHourPrecip(props.cities.weather.byHour[0].hourHumidity.length);
            setDisplayedHourStatus(props.cities.weather.byHour[0].hourWeatherStatus.length);
            setDisplayPercentage(100);
        } else {
            setDisplayedHourTime(Math.ceil(props.cities.weather.byHour[0].hourTime.length * 0.3));
            setDisplayedHourTemp(Math.ceil(props.cities.weather.byHour[0].hourTemperature.length * 0.3));
            setDisplayedHourWind(Math.ceil(props.cities.weather.byHour[0].hourWind.length * 0.3));
            setDisplayedHourPrecip(
                Math.ceil(props.cities.weather.byHour[0].hourHumidity.length * 0.3)
            );
            setDisplayedHourStatus(
                Math.ceil(props.cities.weather.byHour[0].hourWeatherStatus.length * 0.3)
            );
            setDisplayPercentage(30);
        }
    };

    const getWeatherIcon = (status) => {
        switch (status) {
            case "jasno":
                return faSun;
            case "oblačno":
                return faCloud;
            case "delno oblačno":
                return faCloudSun;
            case "pretežno oblačno":
                return faCloud;
            case "zmerno oblačno":
                return faCloud;
            case "v oblakih":
                return faCloud;
            case "pretežno jasno":
                return faSun;
            case "dež":
                return faCloudRain;
            case "rahel dež":
                return faCloudRain;
            case "Plohe":
                return faCloudShowersHeavy;
            case "Nekaj ploh":
                return faCloudShowersHeavy;
            case "Nevihte z grmenjem":
                return faCloudShowersHeavy;
            case "pretežno sončno":
                return faSun;
            case "Sončno":
                return faSun;
            case "Jasno":
                return faSun;
            case "Pretežno jasno":
                return faSun;
            case "Delno oblačno":
                return faCloud;
            case "Pretežno sončno":
                return faSun;
            case "Pretežno oblačno":
                return faCloud;
            case "Razpršene nevihte z grmenjem":
                return faCloudShowersHeavy;
            case "Dež":
                return faCloudRain;
            case "Rahel dež":
                return faCloudRain;
            default:
                return faSun;


        }
    };

    const { user } = useContext(UserContext);

    const [isHidden, setIsHidden] = useState(true);
    const chartRef = useRef(null);
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);

    const [isFavourite, setIsFavourite] = useState(user && props.cities.favouritesBy.includes(user._id));



    const [isHiddenTempChartTen, setHiddenTemp] = useState(true);

    const [isHiddenHumidityChartTen, setHiddenHumidity] = useState(false);

    const humidityChartTen = useRef(null);

    const handleToggleTemp = () => {
        setHiddenTemp(!isHiddenTempChartTen);
        setHiddenHumidity(!isHiddenHumidityChartTen);
    };

    const handleToggleHumidity = () => {
        setHiddenHumidity(!isHiddenHumidityChartTen);
        setHiddenTemp(!isHiddenTempChartTen);
    };




    const [isHiddenTempChartHour, setHiddenTempHour] = useState(true);
    const [isHiddenWindChartHour, setHiddenWindHour] = useState(false);

    const windChartHour = useRef(null);

    const handleToggleTempHour = () => {
        setHiddenTempHour(true);
        setHiddenWindHour(false);
    };
    
    const handleToggleWindHour = () => {
        setHiddenWindHour(true);
        setHiddenTempHour(false);
    };
    






    useEffect(() => {
        if (!isHidden && isHiddenTempChartHour && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const hourLabels = props.cities.weather.byHour.flatMap((hour) => hour.hourTime);
            const datasets = props.cities.weather.byHour.map((hour, index) => ({
                label: `Temperatura`,
                data: hour.hourTemperature.map((temp) => parseInt(temp)),
                borderColor: `rgba(75, 192, 192, ${1 - index * 0.1})`,
                backgroundColor: `rgba(75, 192, 192, ${0.2 - index * 0.02})`,
                tension: 0.6,
                pointRadius: 0,
            }));



            const chartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: hourLabels,
                    datasets: datasets,
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            });

            chartRef.current.chart = chartInstance;
        }
    }, [isHidden,isHiddenTempChartHour, props.cities.weather.byHour]);


    useEffect(() => {
        if (isHidden && chartRef2.current) {
            const ctx = chartRef2.current.getContext("2d");

            if (chartRef2.current.windChart) {
                chartRef2.current.windChart.destroy();
            }

            const dayLabels = props.cities.weather.byDay.flatMap((day) => day.dayTime);
            const datasets = props.cities.weather.byDay.map((day, index) => ({
                label: `Veter`,
                data: day.dayWind.map((wind) => {
                    const windSpeed = wind.split(' - ');
                    const minWind = parseInt(windSpeed[0]);
                    const maxWind = parseInt(windSpeed[1].split(' ')[0]);
                    const average = (minWind + maxWind);
                    return average;
                }),
                borderColor: `rgba(75, 192, 192, ${1 - index * 0.1})`,
                backgroundColor: `rgba(75, 192, 192, ${0.2 - index * 0.02})`,
                tension: 0.6,
                pointRadius: 0,
            }));
            const chartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: dayLabels,
                    datasets: datasets,
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            });

            chartRef2.current.windChart = chartInstance;
        }
    }, [isHidden, props.cities.weather.byDay]);


    useEffect(() => {
        if (!isHidden && isHiddenTempChartTen && chartRef3.current) {
            const ctx = chartRef3.current.getContext("2d");

            if (chartRef3.current.chart) {
                chartRef3.current.chart.destroy();
            }

            const dayLabels = props.cities.weather.byDay.flatMap((day) => day.dayTime);
            const datasets = props.cities.weather.byDay.map((day, index) => ({
                label: `Temperatura`,
                data: day.dayTemperature.map((temp) => {
                    const temperatures = temp.split(' do ');
                    const minTemp = parseInt(temperatures[0]);
                    const maxTemp = parseInt(temperatures[1].split(' ')[0]);
                    const average = (minTemp + maxTemp) / 2;
                    return average;
                }),
                borderColor: `rgba(75, 192, 192, ${1 - index * 0.1})`,
                backgroundColor: `rgba(75, 192, 192, ${0.2 - index * 0.02})`,
                tension: 0.6,
                pointRadius: 0,
            }));
            const chartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: dayLabels,
                    datasets: datasets,
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            });

            chartRef3.current.chart = chartInstance;
        }
    }, [isHidden, isHiddenTempChartTen, props.cities.weather.byDay]);



    useEffect(() => {
        if (!isHidden && isHiddenHumidityChartTen && humidityChartTen.current) {
            const ctx = humidityChartTen.current.getContext("2d");

            if (humidityChartTen.current.chart) {
                humidityChartTen.current.chart.destroy();
            }

            const dayLabels = props.cities.weather.byDay.flatMap((day) => day.dayTime);
            const datasets = props.cities.weather.byDay.map((day, index) => ({
                label: `Vlažnost`,
                data: day.dayHumidity.map((temp) => {
                    const temperatures = temp.split(' ');
                    const minTemp = parseInt(temperatures[0]);
                    return minTemp;
                }),
                borderColor: `rgba(75, 192, 192, ${1 - index * 0.1})`,
                backgroundColor: `rgba(75, 192, 192, ${0.2 - index * 0.02})`,
                tension: 0.6,
                pointRadius: 0,
            }));
            const chartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: dayLabels,
                    datasets: datasets,
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            });

            humidityChartTen.current.chart = chartInstance;
        }
    }, [isHidden, isHiddenHumidityChartTen, props.cities.weather.byDay]);




    useEffect(() => {
        if (isHiddenWindChartHour && windChartHour.current) {
            const ctx = windChartHour.current.getContext("2d");
    
            if (windChartHour.current.chart) {
                windChartHour.current.chart.destroy();
            }
    
            const dayLabels = props.cities.weather.byHour.flatMap((hour) => hour.hourTime);
            const datasets = props.cities.weather.byHour.map((hour, index) => ({
                label: `Veter`,
                data: hour.hourWind.map((wind) => {
                    const windSpeed = wind.match(/\d+/);
                    return parseInt(windSpeed[0]);
                }),
                borderColor: `rgba(75, 192, 192, ${1 - index * 0.1})`,
                backgroundColor: `rgba(75, 192, 192, ${0.2 - index * 0.02})`,
                tension: 0.6,
                pointRadius: 0,
            }));
            const chartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: dayLabels,
                    datasets: datasets,
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            });
    
            windChartHour.current.chart = chartInstance;
        }
    }, [isHiddenWindChartHour, props.cities.weather.byHour]);
    
    


















    function handleRemove() {
        const body = {
            userId: user._id
        };
        fetch(`http://localhost:3001/cities/${props.cities._id}/deleteFav`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    // Remove the favorite city from the UI without refreshing the page
                    setIsFavourite(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }







    return (

        <div>

            {isFavourite && (
                <div className="allHour">

                    <div className="all">

                        <div className="namesDiv">

                            <p className="citiesName">{props.cities.name}
                                <div className="hideShow">
                                    <button className="hideShowBtn" onClick={handleToggle}>
                                        {isHidden ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                        {isHidden ? 'Pokaži' : 'Skrij'}
                                    </button>

                                    <button className="removeBtn" onClick={handleRemove}><FontAwesomeIcon icon={faTrash} style={{ marginRight: '7px' }} />Odstrani</button>
                                </div>
                            </p>


                            <div className="citiesData">

                                <p className="citiesCurr">TRENUTNI PODATKI:</p>
                                <p className="citiesTmp">Temperatura: {props.cities.temperature}</p>
                                <p className="citiesHumidity">Vlažnost: {props.cities.humidity}</p>
                                <p className="citiesWind">Veter: {props.cities.wind}</p>
                                <p className="citiesWeatherStatus">Vreme: {props.cities.weatherStatus}</p>

                            </div>

                        </div>

                        {isHidden && (

                            <div className="test">
                                <div className="eightDay">
                                    <p>Veter naslednjih 8 dni</p>
                                </div>
                                <canvas ref={chartRef2}></canvas>
                            </div>

                        )}

                    </div>

                    {!isHidden && (

                        <div className="something">

                            <div style={{ 'display': 'flex', flexDirection: 'row' }}>

                                <div className="hourContainerFav">




                                    <div className="hourInfo" >

                                        <div className="hourName">
                                            <p>{props.cities.name}</p>

                                            <div className="percButtonDiv">
                                                <button className="percButton" onClick={handleHourInfoClick}>
                                                    Trenutna količina podatkov: {displayPercentage}%
                                                </button>
                                            </div>
                                        </div>




                                        <div className="hourWeatherMap">
                                            <div className="hourTimeDiv">
                                                <h4>URE</h4>
                                                {props.cities.weather.byHour.map((hour, index) => {
                                                    let currentDate = new Date(); // Get the current date
                                                    currentDate.setDate(currentDate.getDate() + index); // Increment the date by the index

                                                    return (
                                                        <div key={index} className="hourTime">
                                                            {hour.hourTime.slice(0, displayedHourTime).map((time, subIndex) => {
                                                                if (time === '0:00') {
                                                                    currentDate.setDate(currentDate.getDate() + 1); // Increment the date by 1 when time is 00:00
                                                                    return (
                                                                        <p key={subIndex}>
                                                                            {currentDate.toLocaleDateString().replace(/\//g, '.')} - {time}

                                                                        </p>
                                                                    );
                                                                } else {
                                                                    return <p key={subIndex}>{time}</p>;
                                                                }
                                                            })}
                                                        </div>
                                                    );
                                                })}
                                            </div>


                                            <div className="hourTempDiv">
                                                <h4 onClick={handleToggleTempHour} className="onClickChart">TEMPERATURA</h4>
                                                {props.cities.weather.byHour.map((hour, index) => (
                                                    <div key={index} className="hourTemp">
                                                        {hour.hourTemperature
                                                            .slice(0, displayedHourTemp)
                                                            .map((temp, subIndex) => (
                                                                <p key={subIndex}>{temp}</p>
                                                            ))}
                                                    </div>
                                                ))}
                                            </div>


                                            <div className="hourWindDiv">
                                                <h4 onClick={handleToggleWindHour} className="onClickChart">VETER</h4>
                                                {props.cities.weather.byHour.map((hour, index) => (
                                                    <div key={index} className="hourWind">
                                                        {hour.hourWind
                                                            .slice(0, displayedHourWind)
                                                            .map((wind, subIndex) => (
                                                                <p key={subIndex}>{wind}</p>
                                                            ))}
                                                    </div>
                                                ))}
                                            </div>


                                            <div className="hourPercDiv">
                                                <h4>PADAVINE</h4>
                                                {props.cities.weather.byHour.map((hour, index) => (
                                                    <div key={index} className="hourHumidity">
                                                        {hour.hourHumidity
                                                            .slice(0, displayedHourPrecip)
                                                            .map((precip, subIndex) => (
                                                                <p key={subIndex}><FontAwesomeIcon icon={faDroplet} style={{ marginRight: '5px' }} />{precip}</p>
                                                            ))}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="hourWeatherDiv">
                                                <h4>VREME</h4>
                                                {props.cities.weather.byHour.map((hour, index) => (
                                                    <div key={index} className="hourWeatherStatus">
                                                        {hour.hourWeatherStatus
                                                            .slice(0, displayedHourStatus)
                                                            .map((status, subIndex) => (
                                                                status === 'null' ? (
                                                                    <p key={subIndex}>&nbsp;</p>
                                                                ) : (
                                                                    <p key={subIndex}>
                                                                        {status}
                                                                        <FontAwesomeIcon icon={getWeatherIcon(status)} style={{ marginLeft: '5px' }} />

                                                                    </p>
                                                                )
                                                            ))}
                                                    </div>
                                                ))}
                                            </div>





                                        </div>






                                    </div>


                                </div>



                                <div className="somethingDayDiv">

                                    <div style={{ 'display': 'flex', flexDirection: 'row' }}>

                                        <div className="dayContainer">




                                            <div className="hourInfo" >

                                                <div className="hourName">
                                                    <p>{props.cities.name}</p>
                                                </div>




                                                <div className="dayWeatherMap">

                                                    <div className="hourTimeDiv">
                                                        <h4>URE</h4>
                                                        {props.cities.weather.byDay.map((hour, index) => (
                                                            <div key={index} className="hourTime">
                                                                {hour.dayTime

                                                                    .map((time, subIndex) => (
                                                                        <p key={subIndex}>{time}</p>
                                                                    ))}
                                                            </div>
                                                        ))}
                                                    </div>


                                                    <div className="hourTempDiv">
                                                        <h4 onClick={handleToggleTemp} className="onClickChart">TEMPERATURA</h4>
                                                        {props.cities.weather.byDay.map((hour, index) => (
                                                            <div key={index} className="hourTemp">
                                                                {hour.dayTemperature

                                                                    .map((temp, subIndex) => (
                                                                        <p key={subIndex}>{temp}</p>
                                                                    ))}
                                                            </div>
                                                        ))}
                                                    </div>


                                                    <div className="hourWindDiv">
                                                        <h4>VETER</h4>
                                                        {props.cities.weather.byDay.map((hour, index) => (
                                                            <div key={index} className="hourWind">
                                                                {hour.dayWind

                                                                    .map((wind, subIndex) => (
                                                                        <p key={subIndex}>{wind}</p>
                                                                    ))}
                                                            </div>
                                                        ))}
                                                    </div>


                                                    <div className="dayHumidityDiv">
                                                        <h4 onClick={handleToggleHumidity} className="onClickChart">VLAŽNOST</h4>
                                                        {props.cities.weather.byDay.map((hour, index) => (
                                                            <div key={index} className="dayHumidity">
                                                                {hour.dayHumidity

                                                                    .map((precip, subIndex) => (
                                                                        <p key={subIndex}>{precip}</p>
                                                                    ))}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="hourWeatherDiv">
                                                        <h4>VREME</h4>
                                                        {props.cities.weather.byDay.map((hour, index) => (
                                                            <div key={index} className="hourWeatherStatus">
                                                                {hour.dayWeatherStatus

                                                                    .map((status, subIndex) => (
                                                                        status === 'null' ? (
                                                                            <p key={subIndex}>&nbsp;</p>
                                                                        ) : (
                                                                            <p key={subIndex}>
                                                                                {status}
                                                                                <FontAwesomeIcon icon={getWeatherIcon(status)} style={{ marginLeft: '5px' }} />

                                                                            </p>
                                                                        )
                                                                    ))}
                                                            </div>
                                                        ))}
                                                    </div>



                                                </div>



                                            </div>



                                        </div>

                                    </div>

                                    {isHiddenTempChartHour ? (
                                        <div className="hourTempGraphFav">

                                            <div className="twentyFourFav">
                                                <p>temperatura za naslednjih 24 ur</p>
                                            </div>

                                            <canvas ref={chartRef} />

                                        </div>
                                    ) : (
                                        <div className="hourTempGraphFav">

                                            <div className="twentyFourFav">
                                                <p>veter za naslednjih 24 ur</p>
                                            </div>

                                            <canvas ref={windChartHour} ></canvas>

                                        </div>
                                    )}

                                    {isHiddenTempChartTen ? (
                                        <div className="dayTempGraphFav">

                                            <div className="eightDayTemoFav">
                                                <p>temperatura za naslednjih 8 dni</p>
                                            </div>

                                            <canvas ref={chartRef3}></canvas>
                                        </div>
                                    ) : (
                                        <div className="dayTempGraphFav">

                                            <div className="eightDayTemoFav">
                                                <p>vlažnost za naslednjih 8 dni</p>
                                            </div>

                                            <canvas ref={humidityChartTen}></canvas>
                                        </div>
                                    )}

                                </div>


                            </div>



                        </div>

                    )}




                </div>




            )}

        </div>


    );



}

export default FavouritesCity;
