import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ResponsiveDrawer from '../../components/Sidebar/Sidebar';
import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { db } from '../../../../firebase.config';
import { convertToDay, convertToHours } from '../../utils/time';
import { renderSkeleton } from '../../utils/renderUtils';
import { Grid, Typography, Divider } from '@mui/material';
import LineChart from '../../components/Chart/LineChart';
import BarChart from '../../components/Chart/BarChart';
import DataTable from '../../components/DataTable';

export default function AccountPage() {
    const [comparedDate, setComparedDate] = useState(() => {
        const startOfSevenDayAgo = new Date();
        startOfSevenDayAgo.setDate(startOfSevenDayAgo.getDate() - 7);
        return dayjs(startOfSevenDayAgo)
    });
    const [isFetching, setIsFetching] = useState(false);
    const [todayOrders, setTodayOrders] = useState([]);
    const [comparedDayOrders, setComparedDayOrders] = useState([]);
    const [currUser, _setCurrUser] = useLocalStorage('current-user', {});
    const restaurantId = currUser.docId;
    // Get query date => today and same day last week
    const startOfCurrentDate = new Date();
    startOfCurrentDate.setHours(0, 0, 0, 0);
    const endOfCurrentDate = new Date();
    endOfCurrentDate.setHours(23, 59, 59, 999);
    // comparedDate is an object => .$d to get formatted date
    const startFormatCompareDate = comparedDate.startOf('day').$d;
    const endFormatCompareDate = comparedDate.endOf('day').$d;
    const historyCollection = collection(db, 'history');
    const historyQuery = query(
        historyCollection,
        and(
            where('restaurantId', '==', restaurantId),
            or(
                and(
                    where('orderTime', '>=', startOfCurrentDate),
                    where('orderTime', '<=', endOfCurrentDate)
                ),
                and(
                    where('orderTime', '>=', startFormatCompareDate),
                    where('orderTime', '<=', endFormatCompareDate)
                )
            )
        )
    );

    useEffect(() => {
        fetchItemData();
    }, [comparedDate])

    const fetchItemData = async () => {
        setIsFetching(true);
        try {
            const newTodayOrders = [];
            const newcomparedDayOrders = [];
            const today = convertToDay(startOfCurrentDate);
            const sevenDayAgo = convertToDay(comparedDate.$d);
            const querySnapshot = await getDocs(historyQuery);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const date = convertToDay(data.orderTime.toDate());
                let hours = convertToHours(data.orderTime.toDate());
                let hoursArr = hours.split(':');
                if (hours[hours.length - 2] === 'P' && hoursArr[0] !== '12') {
                    let hour = parseInt(hoursArr[0]);
                    hour += 12;
                    hoursArr[0] = hour;
                    hours = hoursArr.join(':');
                }
                const order = { hours, items: data.items }
                if (date === today) {
                    newTodayOrders.push(order);
                }
                if (date === sevenDayAgo) {
                    newcomparedDayOrders.push(order);
                }
            })
            setTodayOrders(newTodayOrders);
            setComparedDayOrders(newcomparedDayOrders);
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            console.log(error)
        }
    }

    const handleDateChange = (date) => {
        setComparedDate(date);
    };

    const account = (
        <Grid container rowGap={3} p={3} mt={3}>
            {
                isFetching ? (
                    <Grid container rowGap={3}>
                        {renderSkeleton(1, 'rounded', 70, 3)}
                        {renderSkeleton(1, 'rounded', 200)}
                        {renderSkeleton(1, 'rounded', 70, 3)}
                        {renderSkeleton(1, 'rounded', 200)}
                        {renderSkeleton(1, 'rounded', 70, 3)}
                        {renderSkeleton(1, 'rounded', 150)}
                    </Grid>
                ) : (
                    <Grid container rowGap={3}>
                        <Grid item xs={12}>
                            <Divider textAlign="left"><Typography variant="h4" fontWeight="bold">Analytics</Typography></Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <LineChart 
                                    comparedDate={comparedDate}
                                    comparedDayOrders={comparedDayOrders}
                                    handleDateChange={handleDateChange}
                                    todayOrders={todayOrders}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <BarChart todayOrders={todayOrders}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DataTable todayOrders={todayOrders}/>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    )
    return (
        <ResponsiveDrawer tab={account} />
    )
}