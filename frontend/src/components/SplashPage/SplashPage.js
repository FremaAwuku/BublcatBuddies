import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'


import {getEvents} from '../../store/event'
