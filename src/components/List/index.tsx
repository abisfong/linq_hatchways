import { useState, FC } from 'react';
import { useQuery } from 'react-query';
import debounce from '../../utils/debounce';
import { fetchStudents } from '../../utils/studentApi';
import Trie from '../../classes/Trie';
import ListItem from '../ListItem';
import './List.scss';
import Student from '../../classes/Student';
import Input from '../Input';
import Spinner from '../Icons/Spinner';

const List: FC = () => {
  const [trie] = useState<Trie>(new Trie(undefined));
  const [students, setStudents] = useState<Student[]>([]);
  const useQueryOptions = {
    refetchOnWindowFocus: false,
    onSuccess: (data: { students: Student[] }) => { 
      const students = Student.fromArray(data.students);

      students.forEach(student => {
        student.names().forEach(name => trie.insert(name, student));
      })
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
  
  return (
    <div className='list container'>  
      <div className='row py-4 justify-content-center align-items-center'>
        <ul className='col-9'>
          <Input 
            placeholder='Search by name'
            onChange={ debounce(onChangeHandler) }
            onSubmit={ undefined }
          />
          <Input
            placeholder='Search by tag'
            onChange={debounce(onChangeHandler)}
            onSubmit={ undefined }
          />
          { 
            !(isLoading || !students) ?
              <Spinner /> :
              students.map(student => {
                return (
                  <ListItem student={student} key={student.id} />
                )
              })
          }
        </ul>
      </div>
    </div>
  );
}

export default List;