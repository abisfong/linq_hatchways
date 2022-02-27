import { FC, useState } from 'react';
import Student from '../../classes/Student';
import roundTo2DecimalPlaces from '../../utils/roundTo2DecimalPlaces';
import Minus from '../Icons/minus';
import Plus from '../Icons/plus';
import './ListItem.scss';

const ListItem: FC<{ student: Student }> = ({ student }): JSX.Element => {
  const [showGrades, setShowGrades] = useState<boolean>(false);
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
      <div className='img-container col-lg-3 col-6'>
        <img src={pic} alt="user" />
      </div>
      <ul className='student-information col-lg-8 col-11'>
        <li className='name'>
          {`${firstName} ${lastName}`}
        </li>
        <li>Email: { email }</li>
        <li>Company: { company }</li>
        <li>Skill: { skill }</li>
        <li>
          Average: { roundTo2DecimalPlaces(average) }%
        </li>
      </ul>
      <button className='col-1' onClick={ () => setShowGrades(!showGrades)}>
        { showGrades ? <Minus /> : <Plus /> }
      </button>
    </li>
  )
}

export default ListItem;