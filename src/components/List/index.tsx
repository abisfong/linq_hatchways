import React, { FC } from 'react';
import { useQuery } from 'react-query';
import IStudent from '../../interfaces/IStudent';
import { fetchStudents } from '../../utils/studentApi';
import ListItem from '../ListItem';
import './List.scss';

const List: FC = () => {
  const useQueryOptions = {
    refetchOnWindowFocus: false,
  };
  const { data, isLoading } = useQuery<{ students: IStudent[] }, Error>(
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
          data?.students.map(student => {
            return (
              <ListItem student={student} key={student.id}/>
            )
          })
        }
      </ul>
    </div>
  );
}

export default List;