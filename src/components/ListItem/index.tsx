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

  return (
    <li className='list-item'>
      <img src={pic} alt="user" />
      <ul className='student-information'>
        <li className='name'>{ `${firstName} ${lastName}` }</li>
        <li>Email: { email }</li>
        <li>Company: { company }</li>
        <li>Skill: { skill }</li>
        <li>
          Average: 
          { 
            grades.reduce((acc, grade) => acc + grade) / grades.length
          }
        </li>
      </ul>
    </li>
  )
}

export default ListItem;