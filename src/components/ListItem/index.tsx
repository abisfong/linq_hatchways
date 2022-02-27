import { FC, useState } from 'react';
import Student from '../../classes/Student';
import roundTo2DecimalPlaces from '../../utils/roundTo2DecimalPlaces';
import Minus from '../Icons/Minus';
import Plus from '../Icons/Plus';
import Input from '../Input';
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
      <div className='img-container col-lg-3 col-md-8 col-sm-10'>
        <img src={pic} alt="user" />
      </div>
      <ul className='student-information col-lg-7 col-md-12'>
        <li className='name'>
          {`${firstName} ${lastName}`}
        </li>
        <li className='email'>Email: { email }</li>
        <li>Company: { company }</li>
        <li>Skill: { skill }</li>
        <li>
          Average: { roundTo2DecimalPlaces(average) }%
          <ul className={ `grades ${showGrades ? 'open-grades' : ''}` }>
            {
              grades.map((grade, i) => (
                <li>
                  <span className='test-number'>{`Test ${i + 1}:`}</span>
                  <span className='test-grade'>{grade}%</span>
                </li>
              ))
            }
          </ul>
        </li>
        <li className='tags'>
          <Input 
            placeholder='Add a tag' 
            onChange={undefined} 
            onSubmit={(e) => {
              e.preventDefault();

            }
          }/>
        </li>
      </ul>
      <div className='col-sm-2'>
        <button  onClick={ () => setShowGrades(!showGrades)}>
          { showGrades ? <Minus /> : <Plus /> }
        </button>
      </div>
    </li>
  )
}

export default ListItem;