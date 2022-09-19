import React, {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {

    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/student-list/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an Http errors : ${response.status}`
                    )
                }
                return response.json()
            })
            .then((actualData) => {
                setStudent(actualData);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setStudent(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    // POST
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [roll, setRoll] = useState('');

    const addStudent = (event) => {
        event.preventDefault();
        let data = {name, dept, roll};
        fetch(`http://127.0.0.1:8000/add-student/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => console.log("adding .....", res))
            .catch((err) => {
                console.log(err.message)
            })
    };


    // Delete Student
    const deleteStudent = (id) => {
        fetch(`http://127.0.0.1:8000/delete-student/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((remove) => console.log("removed :", remove))
            .catch((err) => {
                console.log(err.message)
            })
    };


    // Get single data

    const getSingleData = (id) => {
        fetch(`http://127.0.0.1:8000/update-student/${id}/`)
            .then((response) => response.json())
            .then((actualData) => setStudent(actualData))
            .catch((err) => {
                console.log(err.message)
            });
    };

    // POST
    const updateStudent = (event) => {


        event.preventDefault();
        let data = {name, dept, roll};
        fetch(`http://127.0.0.1:8000/update-student/${id}/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => {
            setName(res.name);
            setDept(res.dept);
            setRoll(res.roll);
        })
            .catch((err) => {
                console.log(err.message)
            })

    };


    return (
        <div className={styles.container}>
            <div className="container my-5">
                <h2 className="text-center">Student List</h2>
                <div className="row">
                    <div className="col-md-9 mb-2">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                            Add
                        </button>

                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    <div className="modal-body">
                                        <form action="#">
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value)
                                                }}
                                            />
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Department"
                                                name="dept"
                                                value={dept}
                                                onChange={(e) => {
                                                    setDept(e.target.value)
                                                }}
                                            />
                                            <input
                                                type="number"
                                                className="form-control mb-3"
                                                placeholder="Roll"
                                                name="roll"
                                                value={roll}
                                                onChange={(e) => {
                                                    setRoll(e.target.value)
                                                }}
                                            />
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-success" onClick={addStudent}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-2">
                        <input type="text" className="form-control" placeholder="Search Here .."/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped table-bordered">
                            <thead className="bg-dark text-light text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Dept</th>
                                <th scope="col">Roll</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {student.map((s, index) => (

                                <tr className="text-center" key={index}>
                                    <th scope="row">{s.id}</th>
                                    <td>{s.name}</td>
                                    <td>{s.dept}</td>
                                    <td>{s.roll}</td>
                                    <td>
                                        <Link href={`/update/${s.id}`}>
                                            <a type="button" className="btn btn-primary mx-2" data-bs-toggle="modal"
                                               data-bs-target="#exampleModal2">Edit</a>
                                        </Link>
                                        <div className="modal fade" id="exampleModal2" tabIndex="-1"
                                             aria-labelledby="exampleModal2" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Modal
                                                            title</h5>
                                                        <button type="button" className="btn-close"
                                                                data-bs-dismiss="modal" aria-label="Close"/>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                placeholder="Name"
                                                                name="name"
                                                                value={name}
                                                                onChange={(e) => {
                                                                    setName(e.target.value)
                                                                }}
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                placeholder="dept .."
                                                                name="dept"
                                                                value={dept}
                                                                onChange={(e) => {
                                                                    setDept(e.target.value)
                                                                }}
                                                            />
                                                            <input
                                                                type="number"
                                                                className="form-control mb-3"
                                                                placeholder="Roll"
                                                                name="roll"
                                                                value={roll}
                                                                onChange={(e) => {
                                                                    setRoll(e.target.value)
                                                                }}
                                                            />
                                                            <button type="button" className="btn btn-primary" onClick={updateStudent}>Update
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteStudent(s.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div style={{float: "right"}}>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
