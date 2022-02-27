import { useState, FC } from 'react';
import { useQuery } from 'react-query';
import IStudent from '../../interfaces/IStudent';
import { fetchStudents } from '../../utils/studentApi';
import Trie from '../../utils/Trie';
import ListItem from '../ListItem';
import Search from '../Search';
import './List.scss';

const List: FC = () => {
  const [trie, setTrie] = useState<Trie>(new Trie(undefined));
  const useQueryOptions = {
    refetchOnWindowFocus: false,
    onSuccess: (data: { students: IStudent[] }) => { 
      trie.setStudents(data.students);
      trie.populate();
      setTrie(trie);
    }
  };
  const { data, isLoading } = useQuery<{ students: IStudent[] }, Error>(
    'students',
    fetchStudents,
    useQueryOptions
  );

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className='list container'>  
      <div className='row py-4 justify-content-center align-items-center'>
        <ul className='col-9'>
          <Search trie={trie}/>
          {
            data?.students.map(student => {
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