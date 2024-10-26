import { Injectable } from '@nestjs/common';

type Student = {
    id: number,
    name: string,
    age: number,
    course: string
}

@Injectable()
export class StudentService {
    private idCounter:number = 1
    private students:Student[] = []

    addStudent(name: string,age: number,course: string): Student{
        const newStudent = {
            id: this.idCounter,
            name: name,
            age: age,
            course: course 
        }
        this.students.push(newStudent)
        
        const response = this.students.find( student => student.id === this.idCounter)
        this.idCounter++
        return response
    }
    getStudents(){
        return this.students
    }
    getStudentById(id: number ):Student
    {
        const response = this.students.find(student => student.id === id )

        return response
    }
    updateStudent(id: number, data: Partial<Student>): Student{
        this.students.map((student)=>{
            if(student.id === id){
                student.name = data.name || student.name
                student.age = data.age || student.age
                student.course = data.course || student.course
            } 
        })
        const response = this.students.find(student => student.id === id )
        return response
    }
    deleteStudent(id: number): Boolean{
        const studentToRemove = this.students.find(student => student.id === id )
        const index = this.students.indexOf(studentToRemove)
        this.students.splice(index)
        return true
    }
}
