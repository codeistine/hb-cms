import React, { useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import * as actions from '../../redux/actions/index';
import {
    config
} from '../../config/config';

const onFilterParams = (location, search, user, mobile_number, startDate, endDate, status) => {

    let params = ''
    if (location === 'transactions') {
        if (search && (status !== 'any') && startDate && endDate) {
            return params = `text=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
        } else if (user && (status !== 'any')) {
            return params = `user=${user}&status=${status}`;
        } else if (mobile_number && (status !== 'any')) {
            return params = `mobile_number=${mobile_number}&status=${status}`;
        } else if (!search && startDate && endDate) {
            return params = `status=${status}&startDate=${startDate}&endDate=${endDate}`;
        } else if (startDate) {
            return params = `startDate=${startDate}`;
        } else if (status !== 'any' && search) {
            return params = `status=${status}&text=${search}`;
        } else if (status !== 'any') {
            return params = `status=${status}`;
        } else if (search) {
            return params = `text=${search}`
        } else {
            return params = ''
        };
    }
    return params;
}

const refreshPage = () => {
    window.location.reload(false);
}

const Filter = ({ page, session }) => {
    const dispatch = useDispatch();
    const { control, handleSubmit, getValues, setValue } = useForm();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const formatDateChange = (dateArg, which) => {
        const date = dateArg ? format(dateArg, 'yyyy-MM-dd HH:mm') : null;
        if (which === 'start') {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
        console.log(date, dateArg, 'OnCHANGE')
    };

    const onFilterSubmit = (data) => {

        let params = onFilterParams(page, data.search, data.user, data.mobile_number, startDate, endDate, data.status);
     
        if (page === 'transactions') {
            dispatch(actions.onFilterTransactions(params));
            // console.log('test', data.user)
      } else {
            return false;
        }
    };

    // const exportParams = () => {
    //     let params = onFilterParams(page, getValues("search"), (getValues("user")), startDate, endDate, getValues("status"));
    //     return params;
    // }

    const onFilterReset = () => {
        setValue("search", "");
        setStartDate(null);
        setEndDate(null)
        setValue("status", "any")
        dispatch(actions.onFetchTransactions());
    }

    const filterContent = (pageLocation) => {
        let filter = null;
         if (pageLocation === 'transactions') {
            return filter = (
                <form className="Filter__form">
                    <Controller
                        name="search"
                        control={control}
                        render={({ field }) =>
                            <TextField {...field}
                                type="text"
                                placeholder="SEARCH"
                                label="SEARCH"
                            />}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            autoOk
                            format="yyyy-MM-dd HH:mm"
                            label="Start Date"
                            value={startDate}
                            clearable
                            error={false}
                            helperText={null}
                            onChange={(d) => formatDateChange(d, 'start')}
                        />
                        <DateTimePicker
                            autoOk
                            format="yyyy-MM-dd HH:mm"
                            label="End Date"
                            value={endDate}
                            clearable
                            helperText={null}
                            error={false}
                            onChange={(d) => formatDateChange(d, 'end')}
                        />
                    </MuiPickersUtilsProvider>

                    <Controller
                        name="status"
                        control={control}
                        defaultValue="any"
                        render={({ field }) =>
                            <Select {...field}>
                                <MenuItem value='any'>ANY</MenuItem>
                                <MenuItem value='valid'>VALID</MenuItem>
                                <MenuItem value='invalid'>INVALID</MenuItem>
                                <MenuItem value='pending'>PENDING</MenuItem>
                            </Select>}
                    />
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onFilterSubmit)}>Filter</Button>
                    <Button variant="contained" color="secondary" onClick={onFilterReset}>RESET</Button>
                    <Button variant="contained" color="primary" onClick={refreshPage}>REFRESH</Button>
                    {/* <Button variant="contained" color="primary" type="submit" as={Link} target="__blank" href={`${config.exportTransaction}/export${exportParams() ? `?${exportParams()}&` : '?'}perPage=500`}> Export </Button> */}
                </form>
            )
        }
        return filter;

    };

    const filter = filterContent(page);
    return (
        <div className="Filter">
            {filter}
        </div>
    )
}

export default Filter;
