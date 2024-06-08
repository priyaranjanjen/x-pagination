import { useEffect, useState } from "react";

import style from './pagination.module.css';

export default function PaginationData(){
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentData = tableData.slice(firstPostIndex,lastPostIndex);


    const fetchData = async() => {

        try {
            const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            const finalData = await response.json();

            console.log(finalData);
            setTableData(finalData);
        } catch (error) {
            alert("failed to fetch data");
        }

        
    }

    useEffect(() => {

        fetchData();

    },[])

    const handleNext = () => {
        if (currentPage < Math.ceil(tableData.length / postPerPage)) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    return(
        <div className={style.table}>
            <h1>Employee Data Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.length > 0 && (
                        currentData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.role}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className={style.pagination}>
                <button onClick={handlePrev}>Previous</button>
                <span>{currentPage}</span>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}