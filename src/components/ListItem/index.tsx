import { FC, SyntheticEvent, useState } from 'react';
import { QueryClient } from 'react-query'
import Student from '../../classes/Student';
import roundTo2DecimalPlaces from '../../utils/roundTo2DecimalPlaces';
import Minus from '../Icons/MinusIcon';
import Plus from '../Icons/PlusIcon';
import Input from '../Input';
import './ListItem.scss';

const ListItem: FC<{ 
  student: Student, 
}> = ({ 
  student
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
  const tags = student.tags;

  function onKeyDownHandler(e: any) {
    const inputEl = e.target

    if (e.key === 'Enter') {
      tags.push(inputEl.value);
      inputEl.value = '';
    }
  }

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
          Average: { roundTo2DecimalPlaces(student.average) }%
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
              tags.map((tag, i) => (
                <li key={ i }>
                  { tag }
                </li>
              ))
            }
          </ul>
          <Input 
            placeholder='Add a tag' 
            onKeyDown={ onKeyDownHandler }
            onChange={ undefined }
          />
        </li>
      </ul>
      <div className='col-sm-2'>
        <button  onClick={ () => setShowGrades(!showGrades) }>
          { showGrades ? <Minus /> : <Plus /> }
        </button>
      </div>
    </li>
  )
}

export default ListItem;

// var reverse = function (x) {
//   let rev = 0;
//   while (x !== 0) {
//     const digit = x % 10;
//     x = ~~(x / 10);
//     rev = rev * 10 + digit;
//     if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
//       return 0;
//     }
//   }
//   return rev;
// };