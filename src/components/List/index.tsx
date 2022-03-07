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
import ITrieNodeStudents from '../../interfaces/ITrieNodeStudents';

const List: FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchInput] = useState<{ [key: string]: string }>({});
  const trie = useContext(TrieContext);
  const useQueryOptions = {
    refetchOnWindowFocus: false,
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
    return (e: any) => {
      searchInput[branchName] = e.target.value;
      const searchResults = searchForStudents();
      const students = sortStudents(Object.values(searchResults));
  
      if (studentsQuery.data && !students.length && !inputIsEmpty())
        setStudents(studentsQuery.data);
      else
        setStudents(students);
    }
  }

  function searchForStudents() {
    const branchNames = ['students', 'tags'];

    return branchNames.reduce((acc: ITrieNodeStudents, branchName) => {
      const searchResult = trie.search(branchName, searchInput[branchName] || '');
      const intersection: ITrieNodeStudents = {};

      if (!searchInput[branchName])
        return acc;

      if (!Object.values(acc).length)
        return searchResult;

      for (const key in searchResult)
        if (acc[key] && searchResult[key])
          intersection[key] = searchResult[key];

      return intersection;
    }, {});
  }

  function inputIsEmpty() {
    return Object.values(searchInput).some(input => input.length > 0);
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