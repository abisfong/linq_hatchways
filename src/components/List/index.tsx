import { useState, FC } from 'react';
import { useQuery } from 'react-query';
import IStudent from '../../interfaces/IStudent';
import sortStudents from '../../utils/sortStudents';
import { fetchStudents } from '../../utils/studentApi';
import Trie from '../../utils/Trie';
import ListItem from '../ListItem';
import Search from '../Search';
import './List.scss';

const List: FC = () => {
  const [trie, setTrie] = useState<Trie>(new Trie(undefined));
  const [students, setStudents] = useState<IStudent[]>([]);
  const useQueryOptions = {
    refetchOnWindowFocus: false,
    onSuccess: (data: { students: IStudent[] }) => { 
      const students = sortStudents(data.students);
      
      trie.setStudents(students);
      trie.populate();
      setTrie(trie);
      setStudents(students);
    }
  };
  const { data, isLoading } = useQuery<{ students: IStudent[] }, Error>(
    'students',
    fetchStudents,
    useQueryOptions
  );

  function onChangeHandler(e: any) {
    const input = e.target.value;
    const students: IStudent[] = trie.search(input);

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
          <Search trie={trie} onChange={ onChangeHandler }/>
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