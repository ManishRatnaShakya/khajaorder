import { createSelector } from 'reselect';
import {initialState} from './reducers';
const selectBanner = state =>state.Banner|| initialState;
// const selectRestuarantData= state=>state.data|| initialState;

export const makeSelectBanner=()=>
    createSelector(
        selectBanner,
        banner=>banner.data
    )
