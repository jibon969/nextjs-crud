import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({all_student}) {
    // console.log("all student :", all_student);
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
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form action="#">
                                            <input type="text" className="form-control mb-3" placeholder="Name"/>
                                            <input type="text" className="form-control mb-3" placeholder="Dept"/>
                                            <input type="text" className="form-control mb-3" placeholder="Roll"/>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary">Save changes</button>
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
                            {all_student.map((student, index) => (

                                <tr className="text-center" key={index}>
                                    <th scope="row">{student.id}</th>
                                    <td>{student.name}</td>
                                    <td>{student.dept}</td>
                                    <td>{student.roll}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary mx-2">Edit</button>
                                        <button type="button" className="btn btn-danger">Delete</button>
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


export const getStaticProps = async () => {

    // Fetching data from jsonplaceholder.
    const res = await fetch(
        'http://127.0.0.1:8000/student-list/');
    let student = await res.json();

    // Sending fetched data to the page component via props.
    return {
        props: {
            'all_student': student
        }
    }
};