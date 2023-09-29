import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { convertToDay } from '../../utils/time';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { ThemeContext } from '../../Provider/ThemeContext';
import { blue, blueGrey, grey } from '@mui/material/colors';

export default function LineChart({
    comparedDate,
    comparedDayOrders,
    handleDateChange,
    todayOrders,
}) {
    const {isDarkTheme} = useContext(ThemeContext);
    const getCategories = () => {
        const categories = [];
        for (let i = 1; i <= 24; i++) {
            categories.push(i);
        }
        return categories;
    }

    const calculateTotalSalesPerHour = (data) => {
        let total = {};
        for (let order of data) {
            let hour = 0;
            const totalSales = order.items.reduce((prevItem, currItem) => {
                return prevItem + currItem.totalPrice;
            }, 0)
            let hoursArr = order.hours.split(':');
            // Round hours
            if (hoursArr[1] >= 30) {        
                hour = parseInt(hoursArr[0]) + 1;
            } else {
                hour = hoursArr[0]
            }

            if (!total[hour]) {
                total[hour] = totalSales;
            } else {
                total[hour] += totalSales;
            }
        }
        return total;
    }

    const renderChart = (daySales) => {
        let renderArray = [];
        for (let i = 1; i <= 24; i++) {
            if (daySales[i]) {
                renderArray[i - 1] = daySales[i];
            } else {
                renderArray[i - 1] = 0;
            }
        }
        return renderArray;
    }

    var options = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: isDarkTheme ? [blue[700], blueGrey[500]] : ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Today Sales vs Last Week Sales',
            align: 'left',
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: isDarkTheme ? [grey[700], grey[200]] : ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: [...getCategories()],
            title: {
                text: 'Month'
            }
        },
        yaxis: {
            title: {
                text: 'Total Sales'
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };

    const series = [
        {
            name: "Today",
            data: renderChart(calculateTotalSalesPerHour(todayOrders))
        },
        {
            name: convertToDay(comparedDate.$d),
            data: renderChart(calculateTotalSalesPerHour(comparedDayOrders))
        }
    ];

    return (
        <Grid container rowGap={2}>
            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} >
                        <DatePicker
                            disableFuture={true}
                            label="Compared Date"
                            value={comparedDate}
                            onChange={handleDateChange}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </Grid>
        </Grid>
    )
}

LineChart.propTypes = {
    comparedDate: PropTypes.object.isRequired,
    comparedDayOrders: PropTypes.array.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    todayOrders: PropTypes.array.isRequired
}