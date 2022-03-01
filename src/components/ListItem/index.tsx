import { FC, useState } from 'react';
import { QueryClient } from 'react-query'
import Student from '../../classes/Student';
import roundTo2DecimalPlaces from '../../utils/roundTo2DecimalPlaces';
import Minus from '../Icons/MinusIcon';
import Plus from '../Icons/PlusIcon';
import Input from '../Input';
import './ListItem.scss';

const ListItem: FC<{ 
  student: Student, 
  queryClient: QueryClient 
}> = ({ 
  student, 
  queryClient 
}): JSX.Element => {
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
  const allTags = queryClient.getQueryData<{ [ key: number]: string[] }>('tags');
  const studentTags = allTags ? allTags[student.id] : [];


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
          <ul className={ `grades ${ showGrades ? 'open-grades' : '' }` }>
            {
              grades.map((grade, i) => (
                <li key={ i }>
                  <span className='test-number'>{`Test ${ i + 1 }:`}</span>
                  <span className='test-grade'>{grade}%</span>
                </li>
              ))
            }
          </ul>
        </li>
        <li className='tags'>
          <ul>
            {
              studentTags.map((tag, i) => (
                <li key={ i }>
                  { tag }
                </li>
              ))
            }
          </ul>
          <Input 
            placeholder='Add a tag' 
            onChange={ undefined } 
            onSubmit={ (e) => {
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