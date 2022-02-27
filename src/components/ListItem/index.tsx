import React, { FC } from 'react';
import IStudent from '../../interfaces/IStudent';
import './ListItem.scss';

const ListItem: FC<{ student: IStudent }> = ({ student }): JSX.Element => {
  const { 
    pic,
    firstName, 
    lastName, 
    email, 
    company, 
    skill, 
    grades
  } = student
  const average = grades.reduce(
    (acc, grade) => acc + parseInt(grade), 0
  ) / grades.length


  return (
    <li className='list-item row'>
      <div className='img-container col-3'>
        <img src={pic} alt="user" />
      </div>
      <ul className='student-information col-9'>
        <li className='name'>
          {`${firstName} ${lastName}`}
        </li>
        <li>Email: { email }</li>
        <li>Company: { company }</li>
        <li>Skill: { skill }</li>
        <li>
          Average: { average }
        </li>
      </ul>
    </li>
  )
}

export default ListItem;