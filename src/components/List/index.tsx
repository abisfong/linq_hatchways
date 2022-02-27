import { useState, FC } from 'react';
import { useQuery } from 'react-query';
import debounce from '../../utils/debounce';
import sortStudents from '../../utils/sortStudents';
import { fetchStudents } from '../../utils/studentApi';
import Trie from '../../classes/Trie';
import ListItem from '../ListItem';
import Search from '../Search';
import './List.scss';
import Student from '../../classes/Student';

const List: FC = () => {
  const [trie, setTrie] = useState<Trie>(new Trie(undefined));
  const [students, setStudents] = useState<Student[]>([]);
  const useQueryOptions = {
    refetchOnWindowFocus: false,
    onSuccess: (data: { students: Student[] }) => { 
      const students = sortStudents(data.students);
      
      trie.setStudents(students);
      trie.populate();
      setTrie(trie);
      setStudents(students);
    }
  };
  const { data, isLoading } = useQuery<{ students: Student[] }, Error>(
    'students',
    fetchStudents,
    useQueryOptions
  );

  function onChangeHandler(e: any) {
    const input = e.target.value;
    const students: Student[] = trie.search(input);

    if (data)
      if (!input.length)
        setStudents(data.students);
      else
        setStudents(students);
  }

  if (isLoading || !students)
    return <div>Loading...</div>
  
  return (
    <div className='list container'>  
      <div className='row py-4 justify-content-center align-items-center'>
        <ul className='col-9'>
          <Search trie={trie} onChange={ debounce(onChangeHandler) }/>
          {
            students.map(student => {
              return (
                <ListItem student={student} key={student.id}/>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default List;