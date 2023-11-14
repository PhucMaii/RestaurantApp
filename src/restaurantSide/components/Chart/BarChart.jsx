import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

export default function BarChart({todayOrders}) {
    const [foodFrequencyData, setFoodFrequencyData] = useState([]);
    const [numberOfItems, setNumberOfItems] = useState(5);
    const { t } = useTranslation();

    useEffect(() => {
        setFoodFrequencyData(calculateQuantity(todayOrders));
    }, [todayOrders])
    
    const calculateQuantity = (data) => {
        const foodFrequency = {};
        for(let order of data) {
            for(let item of order.items) {
                if(!foodFrequency[item.name]) {
                    foodFrequency[item.name] = item.quantity;
                } else {
                    foodFrequency[item.name] += item.quantity;
                }
            }
        }
        return foodFrequency;
    }

    const renderChartBar = (foodFrequency, numberOfItems) => {
        const sortedData = Object.keys(foodFrequency)
                        .sort((key1, key2) => foodFrequency[key2] - foodFrequency[key1])
                        .slice(0, numberOfItems)
                        .reduce((obj, key) => {
                            return {...obj, [key]: foodFrequency[key]}
                        }, {});
        return sortedData;
    }

    const series = [{
        data: [...Object.values(renderChartBar(foodFrequencyData, numberOfItems))]
    }]

    const options = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: t('Most Popular Items')
      },
      xaxis: {
        categories: [...Object.keys(renderChartBar(foodFrequencyData, numberOfItems))],
      }
    }
    
    return (
        <Grid container>
            <Grid item xs={12} sm={3} >
            <TextField 
                fullWidth
                label={t("Number of Most Popular Items")}
                onChange={(e) => setNumberOfItems(e.target.value)}
                type="number"
                value={numberOfItems}
            />
            </Grid>
            <Grid item xs={12}>
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </Grid>
        </Grid>
    )
}

BarChart.propTypes = {
    todayOrders: PropTypes.array.isRequired
}