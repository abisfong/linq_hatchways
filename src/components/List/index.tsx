import React, { FC } from 'react';
import { useQuery } from 'react-query';
import IStudent from '../../interfaces/IStudent';
import { fetchStudents } from '../../utils/studentApi';
import ListItem from '../ListItem';
import './list.scss';

const list: FC = () => {
  const list = [1,2,3,4,5];
  const useQueryOptions = {
    refetchOnWindowFocus: false,
  };
  const { isLoading } = useQuery<{ students: IStudent[] }, Error>(
    'students',
    fetchStudents,
    useQueryOptions
  );

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className='list'>
      <ul>
        {
          list.map(student => {
            return (
              <ListItem student={student} key={student.id}/>
            )
          })
        }
      </ul>
    </div>
  );
}

export default list;