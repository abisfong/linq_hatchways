import { FC, useContext, useState } from 'react';
import Student from '../../classes/Student';
import TrieContext from '../../context/TrieContext';
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
  const [tags, setTags] = useState<string[]>(student.tags);
  const { 
    pic,
    firstName, 
    lastName, 
    email, 
    company, 
    skill, 
    grades
  } = student
  const trie = useContext(TrieContext);

  function onKeyDownHandler(e: any) {
    const inputEl = e.target;
    const input = inputEl.value;

    if (e.key === 'Enter') {
      trie?.insert('tags', input, student);
      student.tags.push(inputEl.value);
      setTags([...student.tags]);
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
                <li className='tag' key={ i }>
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

// const myComparison = (prevProps, nextProps) => {
  
// }

export default ListItem;