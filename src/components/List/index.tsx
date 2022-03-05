import { useState, FC, useContext } from 'react';
import { useQuery } from 'react-query';
import debounce from '../../utils/debounce';
import { fetchStudents } from '../../utils/studentApi';
import ListItem from '../ListItem';
import './List.scss';
import Student from '../../classes/Student';
import Input from '../Input';
import Spinner from '../Icons/SpinnerIcon';
import TrieContext from '../../context/TrieContext';
import sortStudents from '../../utils/sortStudents';

const List: FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchInput] = useState<{ [key: string]: string }>({})
  const trie = useContext(TrieContext);
  const useQueryOptions = {
    onSuccess: (students: Student[]) => { 
      students.forEach(student => {
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

  function onChangeHandler(branchName: string): Function {
    const branchNames = ['students', 'tags'];

    return (e: any) => {
      const input = e.target.value;
      // const searchResults = branchNames.map(branchName => {
      //   return trie.search(branchName, input);
      // })
      // const studentsHash = searchResults.reduce((acc, students) => {
      //   for (const key in students)
      //     acc[key] = students[key];
      //   return acc;
      // }, {});
      // const students = sortStudents(Object.values(studentsHash));

      searchInput[branchName] = input;
      const searchResults = branchNames.map(branchName => {
        return trie.search(branchName, input);
      })
      const studentsHash = searchResults.reduce((acc, students) => {
        for (const key in students)
          acc[key] = students[key];
        return acc;
      }, {});
      const students = sortStudents(Object.values(studentsHash));

  
      if (studentsQuery.data && !input.length)
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