import { useState, FC } from 'react';
import { useQuery } from 'react-query';
import debounce from '../../utils/debounce';
import { fetchStudents } from '../../utils/studentApi';
import Trie from '../../classes/Trie';
import ListItem from '../ListItem';
import './List.scss';
import Student from '../../classes/Student';
import Input from '../Input';
import Spinner from '../Icons/SpinnerIcon';

const List: FC = () => {
  // const [trie] = useState<Trie>(new Trie());
  const [students, setStudents] = useState<Student[]>([]);
  const useQueryOptions = {
    onSuccess: (students: Student[]) => { 
      const trie = trieQuery.data;

      students.forEach(student => {
        // console.log(student);
        student.names().forEach(name => trie?.insert('students', name, student));
      })
      setStudents(students);
    }
  };
  const studentsQuery = useQuery<Student[], Error>(
    'students',
    fetchStudents,
    useQueryOptions
  );
  const trieQuery = useQuery<Trie>(
    'trie', 
    () => new Trie(), 
  );

  function onChangeHandler(branchName: string): Function {
    return (e: any) => {
      const input = e.target.value;
      const trie = trieQuery.data;
      const students = trie ? trie.search(branchName, input) : [];
  
      if (studentsQuery.data)
        if (!input.length)
          setStudents(studentsQuery.data);
        else
          setStudents(students);
    }
  }
  
  return (
    <div className='list container'>  
      <div className='row py-4 justify-content-center align-items-center'>
        <ul className='col-9'>
          <Input 
            placeholder='Search by name'
            onChange={ debounce(onChangeHandler('students')) }
            onKeyDown={ undefined }
          />
          <Input
            placeholder='Search by tag'
            onChange={debounce(onChangeHandler('tags'))}
            onKeyDown={undefined}
          />
          { 
            (studentsQuery.isLoading || !students) ?
              <Spinner /> :
              students.map(student => {
                return (
                  <ListItem 
                    student={ student } 
                    key={ student.id } 
                  />
                )
              })
          }
        </ul>
      </div>
    </div>
  );
}

export default List;