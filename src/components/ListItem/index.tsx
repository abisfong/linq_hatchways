import React, { useState, FC } from 'react';
import { useQuery } from 'react-query';
import IStudent from '../../interfaces/IStudent';
import { fetchStudents } from '../../utils/studentApi';
import { randomNumber } from '../../utils';
import './ListItem.scss';

const ListItem: FC<{ student: IStudent }> = (props): JSX.Element => {
  return (
    <li className='list-item'>
    </li>
  )
}

export default ListItem;