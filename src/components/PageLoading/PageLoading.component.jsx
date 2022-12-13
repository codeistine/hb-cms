import React from 'react';
import { Backdrop } from '@material-ui/core';
import CircleLoader from 'react-spinners/CircleLoader';


const PageLoading = ({ loading }) => {
    return (
        <Backdrop open={loading} style={{zIndex: '150'}}>
            <CircleLoader loading={loading} size={50} color="#fdfdfd"/>
        </Backdrop>
    )
};

export default PageLoading;
